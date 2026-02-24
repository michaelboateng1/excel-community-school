import { newsService, NewsArticle } from "@/services/databaseService";

/**
 * News data format from NewsManagement component
 */
export interface NewsFormData {
  title: string;
  excerpt: string;
  author?: string;
  category: string;
  body: string;
  imageUrl?: string;
  status?: "published" | "draft";
}

/**
 * Response object for CRUD operations
 */
export interface CrudResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Create a new news article in Supabase
 * @param formData Form data from NewsManagement component
 * @returns Success status and created article
 */
export const createNewsArticle = async (formData: NewsFormData): Promise<CrudResponse<NewsArticle>> => {
  try {
    if (!formData.title || !formData.excerpt) {
      return {
        success: false,
        error: "Title and excerpt are required",
      };
    }

    const articleData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.body || "",
      author: formData.author || "Admin",
      category: formData.category || "General",
      image_url: formData.imageUrl || null,
      status: formData.status || "draft",
      views: 0,
      date: new Date().toISOString().split("T")[0],
    };

    const result = await newsService.create(articleData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error creating news article:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create article",
    };
  }
};

/**
 * Update an existing news article in Supabase
 * @param articleId Article ID to update
 * @param formData Updated form data
 * @returns Success status and updated article
 */
export const updateNewsArticle = async (articleId: string, formData: NewsFormData): Promise<CrudResponse<NewsArticle>> => {
  try {
    if (!formData.title || !formData.excerpt) {
      return {
        success: false,
        error: "Title and excerpt are required",
      };
    }

    const articleData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.body || "",
      author: formData.author || "Admin",
      category: formData.category || "General",
      image_url: formData.imageUrl || null,
      status: formData.status || "draft",
    };

    const result = await newsService.update(articleId, articleData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating news article:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update article",
    };
  }
};

/**
 * Delete a news article from Supabase
 * @param articleId Article ID to delete
 * @param imageUrl Optional image URL to delete from storage
 * @returns Success status
 */
export const deleteNewsArticle = async (articleId: string, imageUrl?: string): Promise<CrudResponse<null>> => {
  try {
    // Delete image from storage if provided
    if (imageUrl && imageUrl.trim() !== "") {
      console.log(`Deleting image URL: ${imageUrl}`);
      const { deleteImageByUrl } = await import("@/libs/imageUpload");
      const deleteSuccess = await deleteImageByUrl(imageUrl, {
        bucket: "news-images",
        onDeleteError: (error) => console.error("Failed to delete image:", error),
      });
      console.log(`Image deletion result: ${deleteSuccess}`);
    } else {
      console.log(`No image URL provided for deletion. ImageUrl: ${imageUrl}`);
    }

    await newsService.delete(articleId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting news article:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete article",
    };
  }
};

/**
 * Fetch all news articles from Supabase
 * @returns Array of news articles
 */
export const fetchAllNewsArticles = async (): Promise<CrudResponse<NewsArticle[]>> => {
  try {
    const articles = await newsService.getAll();

    return {
      success: true,
      data: articles,
    };
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch articles",
    };
  }
};

/**
 * Fetch a single news article by ID
 * @param articleId Article ID to fetch
 * @returns Single news article
 */
export const fetchNewsArticleById = async (articleId: string): Promise<CrudResponse<NewsArticle>> => {
  try {
    const article = await newsService.getById(articleId);

    if (!article) {
      return {
        success: false,
        error: "Article not found",
      };
    }

    return {
      success: true,
      data: article,
    };
  } catch (error) {
    console.error("Error fetching news article by ID:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch article",
    };
  }
};

/**
 * Search news articles by query
 * @param query Search query string
 * @returns Array of matching news articles
 */
export const searchNewsArticles = async (query: string): Promise<CrudResponse<NewsArticle[]>> => {
  try {
    if (!query.trim()) {
      return {
        success: false,
        error: "Search query cannot be empty",
      };
    }

    const articles = await newsService.search(query);

    return {
      success: true,
      data: articles,
    };
  } catch (error) {
    console.error("Error searching news articles:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search articles",
    };
  }
};

/**
 * Bulk delete multiple news articles
 * @param articleIds Array of article IDs to delete
 * @returns Success status with count of deleted articles
 */
export const bulkDeleteNewsArticles = async (articleIds: string[]): Promise<CrudResponse<{ deletedCount: number }>> => {
  try {
    if (articleIds.length === 0) {
      return {
        success: false,
        error: "No articles selected for deletion",
      };
    }

    const deletePromises = articleIds.map((id) => newsService.delete(id));
    await Promise.all(deletePromises);

    return {
      success: true,
      data: { deletedCount: articleIds.length },
    };
  } catch (error) {
    console.error("Error bulk deleting news articles:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete articles",
    };
  }
};
