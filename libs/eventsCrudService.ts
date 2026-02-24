import { eventService, Event } from "@/services/databaseService";

/**
 * Event data format from EventsManagement component
 */
export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category: string;
  imageUrl?: string;
  status?: "upcoming" | "past" | "cancelled";
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
 * Create a new event in Supabase
 * @param formData Form data from EventsManagement component
 * @returns Success status and created event
 */
export const createEvent = async (formData: EventFormData): Promise<CrudResponse<Event>> => {
  try {
    if (!formData.title || !formData.description) {
      return {
        success: false,
        error: "Title and description are required",
      };
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date || new Date().toISOString().split("T")[0],
      time: formData.time || "00:00",
      location: formData.location || "To be announced",
      capacity: formData.capacity || 0,
      registered: 0,
      category: formData.category || "General",
      image_url: formData.imageUrl || null,
      status: formData.status || "upcoming",
    };

    const result = await eventService.create(eventData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create event",
    };
  }
};

/**
 * Update an existing event in Supabase
 * @param eventId Event ID to update
 * @param formData Updated form data
 * @returns Success status and updated event
 */
export const updateEvent = async (eventId: string, formData: EventFormData): Promise<CrudResponse<Event>> => {
  try {
    if (!formData.title || !formData.description) {
      return {
        success: false,
        error: "Title and description are required",
      };
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      capacity: formData.capacity,
      category: formData.category,
      image_url: formData.imageUrl || null,
      status: formData.status || "upcoming",
    };

    const result = await eventService.update(eventId, eventData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update event",
    };
  }
};

/**
 * Delete an event from Supabase
 * @param eventId Event ID to delete
 * @param imageUrl Optional image URL to delete from storage
 * @returns Success status
 */
export const deleteEvent = async (eventId: string, imageUrl?: string): Promise<CrudResponse<null>> => {
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

    await eventService.delete(eventId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete event",
    };
  }
};

/**
 * Fetch all events from Supabase
 * @returns Array of events
 */
export const fetchAllEvents = async (): Promise<CrudResponse<Event[]>> => {
  try {
    const events = await eventService.getAll();

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch events",
    };
  }
};

/**
 * Fetch a single event by ID
 * @param eventId Event ID to fetch
 * @returns Single event
 */
export const fetchEventById = async (eventId: string): Promise<CrudResponse<Event>> => {
  try {
    const event = await eventService.getById(eventId);

    if (!event) {
      return {
        success: false,
        error: "Event not found",
      };
    }

    return {
      success: true,
      data: event,
    };
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch event",
    };
  }
};

/**
 * Fetch upcoming events only
 * @returns Array of upcoming events
 */
export const fetchUpcomingEvents = async (): Promise<CrudResponse<Event[]>> => {
  try {
    const events = await eventService.getUpcoming();

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch upcoming events",
    };
  }
};

/**
 * Bulk delete multiple events
 * @param eventIds Array of event IDs to delete
 * @returns Success status with count of deleted events
 */
export const bulkDeleteEvents = async (eventIds: string[]): Promise<CrudResponse<{ deletedCount: number }>> => {
  try {
    if (eventIds.length === 0) {
      return {
        success: false,
        error: "No events selected for deletion",
      };
    }

    const deletePromises = eventIds.map((id) => eventService.delete(id));
    await Promise.all(deletePromises);

    return {
      success: true,
      data: { deletedCount: eventIds.length },
    };
  } catch (error) {
    console.error("Error bulk deleting events:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete events",
    };
  }
};
