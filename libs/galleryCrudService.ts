import { galleryService, GalleryItem } from "../services/databaseService";
import { uploadImageToSupabase, deleteImageByUrl, replaceImage } from "./imageUpload";

export interface GalleryFormData {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface CrudResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Create a new gallery item with image upload
 */
export async function createGalleryItem(formData: GalleryFormData): Promise<CrudResponse<GalleryItem>> {
  try {
    if (!formData.title.trim() || !formData.imageUrl) {
      return {
        success: false,
        error: "Title and image are required",
      };
    }

    const newGalleryItem = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      thumbnail: formData.imageUrl,
      upload_date: new Date().toISOString().split("T")[0],
      views: 0,
    };

    const result = await galleryService.create(newGalleryItem);

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    console.error("Exception creating gallery item:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Update an existing gallery item with optional image replacement
 */
export async function updateGalleryItem(id: string, formData: GalleryFormData, previousImageUrl?: string): Promise<CrudResponse<GalleryItem>> {
  try {
    if (!formData.title.trim() || !formData.imageUrl) {
      return {
        success: false,
        error: "Title and image are required",
      };
    }

    // If image changed, replace it
    let finalImageUrl = formData.imageUrl;
    if (previousImageUrl && previousImageUrl !== formData.imageUrl) {
      const replaceResult = await replaceImage(previousImageUrl, formData.imageUrl as any, {
        bucket: "news-images",
        folder: "gallery",
      });

      if (!replaceResult.success) {
        console.warn("Image replacement warning:", replaceResult.error);
        // Continue with update even if image replacement fails partially
        finalImageUrl = replaceResult.imageUrl || formData.imageUrl;
      } else {
        finalImageUrl = replaceResult.imageUrl || formData.imageUrl;
      }
    }

    const updatedData = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      thumbnail: finalImageUrl,
    };

    const result = await galleryService.update(id, updatedData);

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    console.error("Exception updating gallery item:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Delete a gallery item and its associated image
 */
export async function deleteGalleryItem(id: string, imageUrl?: string): Promise<CrudResponse<void>> {
  try {
    // Delete image from storage if URL provided
    if (imageUrl) {
      console.log(`Deleting image URL: ${imageUrl}`);
      const deleteResult = await deleteImageByUrl(imageUrl, {
        bucket: "news-images",
      });
      if (!deleteResult) {
        console.warn("Image deletion warning - image may not have been deleted");
        // Continue with item deletion even if image deletion fails
      }
    }

    // Delete gallery item from database
    await galleryService.delete(id);

    return {
      success: true,
    };
  } catch (err: any) {
    console.error("Exception deleting gallery item:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Fetch all gallery items
 */
export async function fetchAllGalleryItems(): Promise<CrudResponse<GalleryItem[]>> {
  try {
    const data = await galleryService.getAll();

    return {
      success: true,
      data: data || [],
    };
  } catch (err: any) {
    console.error("Exception fetching gallery items:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Fetch a single gallery item by ID
 */
export async function fetchGalleryItemById(id: string): Promise<CrudResponse<GalleryItem>> {
  try {
    const data = await galleryService.getById(id);

    if (!data) {
      return {
        success: false,
        error: "Gallery item not found",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error("Exception fetching gallery item:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Fetch gallery items by category
 */
export async function fetchGalleryItemsByCategory(category: string): Promise<CrudResponse<GalleryItem[]>> {
  try {
    const data = await galleryService.getByCategory(category);

    return {
      success: true,
      data: data || [],
    };
  } catch (err: any) {
    console.error("Exception fetching gallery items by category:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Search gallery items by title, category, or description
 */
export async function searchGalleryItems(query: string): Promise<CrudResponse<GalleryItem[]>> {
  try {
    if (!query.trim()) {
      return fetchAllGalleryItems();
    }

    const data = await galleryService.search(query);

    return {
      success: true,
      data: data || [],
    };
  } catch (err: any) {
    console.error("Exception searching gallery items:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}

/**
 * Bulk delete gallery items
 */
export async function bulkDeleteGalleryItems(ids: string[], items?: GalleryItem[]): Promise<CrudResponse<void>> {
  try {
    if (ids.length === 0) {
      return {
        success: false,
        error: "No items selected for deletion",
      };
    }

    // Delete images from storage if items provided
    if (items && items.length > 0) {
      for (const item of items) {
        if (item.thumbnail) {
          const deleteResult = await deleteImageByUrl(item.thumbnail, {
            bucket: "news-images",
          });
          if (!deleteResult) {
            console.warn(`Warning deleting image for item ${item.id}`);
          }
        }
      }
    }

    // Delete gallery items from database
    for (const id of ids) {
      await galleryService.delete(id);
    }

    return {
      success: true,
    };
  } catch (err: any) {
    console.error("Exception deleting gallery items:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
}
