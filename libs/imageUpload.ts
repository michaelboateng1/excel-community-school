import supabase from "@/services/supabaseClient";

interface UploadOptions {
  bucket?: string;
  folder?: string;
  onUploadStart?: () => void;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
  onUploadComplete?: () => void;
}

/**
 * Upload an image file to Supabase storage
 * @param file - The image file to upload
 * @param options - Configuration options for the upload
 * @returns The public URL of the uploaded image, or null if upload failed
 */
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
    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filePath);

    const imageUrl = publicUrl.publicUrl;
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
