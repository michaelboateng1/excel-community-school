import supabase from "@/services/supabaseClient";

interface UploadOptions {
  bucket?: string;
  folder?: string;
  onUploadStart?: () => void;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
  onUploadComplete?: () => void;
}

interface DeleteOptions {
  bucket?: string;
  onDeleteStart?: () => void;
  onDeleteSuccess?: () => void;
  onDeleteError?: (error: string) => void;
  onDeleteComplete?: () => void;
}

export const uploadImageToSupabase = async (file: File, options: UploadOptions = {}): Promise<string | null> => {
  const { bucket = "news-images", folder = "thumbnails", onUploadStart, onUploadSuccess, onUploadError, onUploadComplete } = options;

  try {
    onUploadStart?.();

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file.");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB.");
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    const imageUrl = data?.publicUrl || "";
    if (!imageUrl) {
      throw new Error("Failed to get public URL for uploaded image");
    }
    onUploadSuccess?.(imageUrl);

    return imageUrl;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to upload image";
    onUploadError?.(errorMsg);
    console.error("Error uploading image:", err);
    return null;
  } finally {
    onUploadComplete?.();
  }
};

/**
 * Extract file path from a Supabase public URL
 * @param publicUrl - The public URL of the image
 * @param bucket - The bucket name
 * @returns The file path within the bucket
 */
const extractFilePathFromUrl = (publicUrl: string, bucket: string): string | null => {
  try {
    // Extract path from URL like: https://...storage.supabase.co/object/public/news-images/thumbnails/filename.jpg
    const regex = new RegExp(`/object/public/${bucket}/(.+)$`);
    const match = publicUrl.match(regex);
    const filePath = match ? match[1] : null;

    if (!filePath) {
      console.warn(`Failed to extract file path from URL: ${publicUrl}`);
      // Try alternative parsing if standard parsing fails
      try {
        const urlObj = new URL(publicUrl);
        const pathParts = urlObj.pathname.split("/");
        const bucketIndex = pathParts.indexOf(bucket);
        if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
          const alternativePath = pathParts.slice(bucketIndex + 1).join("/");
          if (alternativePath) {
            console.log(`Using alternative path extraction: ${alternativePath}`);
            return alternativePath;
          }
        }
      } catch (e) {
        console.error("Error in alternative path extraction:", e);
      }
    }
    return filePath;
  } catch (err) {
    console.error("Error extracting file path from URL:", err);
    return null;
  }
};

/**
 * Delete an image from Supabase storage by file path
 * @param filePath - The file path in the bucket (e.g., "thumbnails/filename.jpg")
 * @param options - Configuration options for the delete operation
 * @returns True if deletion was successful, false otherwise
 */
export const deleteImageFromBucket = async (filePath: string, options: DeleteOptions = {}): Promise<boolean> => {
  const { bucket = "news-images", onDeleteStart, onDeleteSuccess, onDeleteError, onDeleteComplete } = options;

  try {
    if (!filePath || filePath.trim() === "") {
      throw new Error("Invalid file path provided");
    }

    onDeleteStart?.();

    const { error: deleteError } = await supabase.storage.from(bucket).remove([filePath]);

    if (deleteError) throw deleteError;

    onDeleteSuccess?.();
    return true;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete image";
    onDeleteError?.(errorMsg);
    console.error("Error deleting image from bucket:", err);
    return false;
  } finally {
    onDeleteComplete?.();
  }
};

/**
 * Delete an image from Supabase storage by public URL
 * @param publicUrl - The public URL of the image to delete
 * @param options - Configuration options for the delete operation
 * @returns True if deletion was successful, false otherwise
 */
export const deleteImageByUrl = async (publicUrl: string, options: DeleteOptions = {}): Promise<boolean> => {
  try {
    if (!publicUrl || publicUrl.trim() === "") {
      console.warn("Empty URL provided for deletion");
      return false;
    }

    const bucket = options.bucket || "news-images";
    const filePath = extractFilePathFromUrl(publicUrl, bucket);

    if (!filePath) {
      console.error(`Could not extract file path from URL: ${publicUrl}`);
      throw new Error("Could not extract file path from URL");
    }

    console.log(`Deleting image from path: ${filePath} in bucket: ${bucket}`);
    return await deleteImageFromBucket(filePath, options);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete image by URL";
    options.onDeleteError?.(errorMsg);
    console.error("Error deleting image by URL:", err);
    return false;
  }
};

/**
 * Delete previous image when uploading a new one
 * Utility function for handling image replacement in forms
 * @param previousImageUrl - The URL of the previous image to delete
 * @param newFile - The new image file to upload
 * @param options - Configuration options
 * @returns Object with deletion and upload results
 */
export const replaceImage = async (previousImageUrl: string | null | undefined, newFile: File, options: UploadOptions & DeleteOptions = {}) => {
  try {
    // Delete previous image if it exists
    if (previousImageUrl && previousImageUrl.trim() !== "") {
      await deleteImageByUrl(previousImageUrl, {
        bucket: options.bucket,
        onDeleteStart: options.onDeleteStart,
        onDeleteError: options.onDeleteError,
      });
    }

    // Upload new image
    const newImageUrl = await uploadImageToSupabase(newFile, {
      bucket: options.bucket,
      folder: options.folder,
      onUploadStart: options.onUploadStart,
      onUploadSuccess: options.onUploadSuccess,
      onUploadError: options.onUploadError,
      onUploadComplete: options.onUploadComplete,
    });

    return {
      success: newImageUrl !== null,
      imageUrl: newImageUrl,
      error: newImageUrl === null ? "Failed to upload new image" : null,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to replace image";
    console.error("Error replacing image:", err);
    return {
      success: false,
      imageUrl: null,
      error: errorMsg,
    };
  }
};
