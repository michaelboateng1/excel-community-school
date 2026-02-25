import supabase from "./supabaseClient";

// ===== TYPE DEFINITIONS =====
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  views: number;
  status: "published" | "draft";
  category: string;
  image_url?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "past" | "cancelled";
  category: string;
  image_url?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  upload_date: string;
  views: number;
  thumbnail: string;
  description?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// ===== NEWS FUNCTIONS =====
export const newsService = {
  // Fetch all news articles
  async getAll(): Promise<NewsArticle[]> {
    try {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },

  // Fetch published news only
  async getPublished(): Promise<NewsArticle[]> {
    try {
      const { data, error } = await supabase.from("news").select("*").eq("status", "published").order("date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching published news:", error);
      return [];
    }
  },

  // Fetch single news article
  async getById(id: string): Promise<NewsArticle | null> {
    try {
      const { data, error } = await supabase.from("news").select("*").eq("id", id).single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching news by ID:", error);
      return null;
    }
  },

  // Create news article
  async create(article: Omit<NewsArticle, "id" | "created_at" | "updated_at">) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const articleData = {
        ...article,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("news").insert([articleData]).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  },

  // Update news article
  async update(id: string, updates: Partial<NewsArticle>) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updateData = {
        ...updates,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("news").update(updateData).eq("id", id).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  },

  // Delete news article
  async delete(id: string) {
    try {
      const { error } = await supabase.from("news").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting news:", error);
      throw error;
    }
  },

  // Search news by title or author
  async search(query: string): Promise<NewsArticle[]> {
    try {
      const { data, error } = await supabase.from("news").select("*").or(`title.ilike.%${query}%,author.ilike.%${query}%,excerpt.ilike.%${query}%`);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching news:", error);
      return [];
    }
  },
};

// ===== EVENTS FUNCTIONS =====
export const eventService = {
  // Fetch all events
  async getAll(): Promise<Event[]> {
    try {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },

  // Fetch upcoming events only
  async getUpcoming(): Promise<Event[]> {
    try {
      const { data, error } = await supabase.from("events").select("*").eq("status", "upcoming").order("date", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      return [];
    }
  },

  // Fetch single event
  async getById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase.from("events").select("*").eq("id", id).single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      return null;
    }
  },

  // Create event
  async create(event: Omit<Event, "id" | "created_at" | "updated_at">) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const eventData = {
        ...event,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("events").insert([eventData]).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  // Update event
  async update(id: string, updates: Partial<Event>) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updateData = {
        ...updates,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("events").update(updateData).eq("id", id).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  },

  // Delete event
  async delete(id: string) {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  },

  // Search events by title or location
  async search(query: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase.from("events").select("*").or(`title.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching events:", error);
      return [];
    }
  },

  // Update registration count
  async updateRegistration(id: string, newCount: number) {
    try {
      const { data, error } = await supabase.from("events").update({ registered: newCount }).eq("id", id).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating registration:", error);
      throw error;
    }
  },
};

// ===== GALLERY FUNCTIONS =====
export const galleryService = {
  // Fetch all gallery items
  async getAll(): Promise<GalleryItem[]> {
    try {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      return [];
    }
  },

  // Fetch gallery items by category
  async getByCategory(category: string): Promise<GalleryItem[]> {
    try {
      const { data, error } = await supabase.from("gallery").select("*").eq("category", category).order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching gallery by category:", error);
      return [];
    }
  },

  // Fetch single gallery item
  async getById(id: string): Promise<GalleryItem | null> {
    try {
      const { data, error } = await supabase.from("gallery").select("*").eq("id", id).single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching gallery item by ID:", error);
      return null;
    }
  },

  // Create gallery item
  async create(item: Omit<GalleryItem, "id" | "created_at" | "updated_at">) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const itemData = {
        ...item,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("gallery").insert([itemData]).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating gallery item:", error);
      throw error;
    }
  },

  // Update gallery item
  async update(id: string, updates: Partial<GalleryItem>) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const updateData = {
        ...updates,
        user_id: user?.id || null,
      };

      const { data, error } = await supabase.from("gallery").update(updateData).eq("id", id).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }
  },

  // Delete gallery item
  async delete(id: string) {
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      throw error;
    }
  },

  // Search gallery items by title or category
  async search(query: string): Promise<GalleryItem[]> {
    try {
      const { data, error } = await supabase.from("gallery").select("*").or(`title.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching gallery:", error);
      return [];
    }
  },

  // Update view count
  async incrementViews(id: string) {
    try {
      const item = await galleryService.getById(id);
      if (!item) throw new Error("Gallery item not found");

      const { data, error } = await supabase
        .from("gallery")
        .update({ views: item.views + 1 })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error incrementing views:", error);
      throw error;
    }
  },

  // Get categories list
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase.from("gallery").select("category");

      if (error) throw error;

      // Get unique categories
      const uniqueCategories = Array.from(new Set(data?.map((item) => item.category) || []));
      return uniqueCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
};

// ===== FILE UPLOAD FUNCTIONS =====
export const fileService = {
  // Upload image to Supabase Storage
  async uploadImage(bucket: string, file: File, path: string) {
    try {
      const { data, error } = await supabase.storage.from(bucket).upload(path, file);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Get public URL for uploaded image
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete image from storage
  async deleteImage(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};

let newsLoading = false;
let eventsLoading = false;

export const newsHighlightData = async () => {
  newsLoading = true;

  const { data, error } = await supabase
    .from("news")
    .select()
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  if (data) newsLoading = false;

  return [data, error, newsLoading];
};

export const eventsHighlightData = async () => {
  eventsLoading = true;

  const { data, error } = await supabase
    .from("events")
    .select()
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  if (data) eventsLoading = false;

  return [data, error, eventsLoading];
};

export const getAllNews = async () => {
  newsLoading = true;

  const { data, error } = await supabase.from("news").select().order("created_at", {
    ascending: false,
  });

  if (data) newsLoading = false;

  return [data, error, newsLoading];
};
