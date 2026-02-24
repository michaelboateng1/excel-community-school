import { newsService, eventService, galleryService, NewsArticle, Event, GalleryItem } from "@/services/databaseService";

export interface DashboardStats {
  totalNews: number;
  upcomingEvents: number;
  galleryItems: number;
  news: NewsArticle[];
  events: Event[];
  gallery: GalleryItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetch dashboard statistics including news, events, and gallery items
 * @returns Dashboard statistics and content
 */
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Fetch data in parallel
    const [newsData, eventsData, galleryData] = await Promise.all([newsService.getAll(), eventService.getAll(), galleryService.getAll()]);

    // Calculate upcoming events
    const upcomingEventsCount = eventsData.filter((e) => e.status === "upcoming").length;

    // console.log("fetchDashboardStats - Events data:", eventsData);
    // console.log("fetchDashboardStats - Upcoming count:", upcomingEventsCount);
    // console.log("fetchDashboardStats - Event statuses:", eventsData.map(e => ({ title: e.title, status: e.status })));

    return {
      totalNews: newsData.length,
      upcomingEvents: upcomingEventsCount,
      galleryItems: galleryData.length,
      news: newsData,
      events: eventsData,
      gallery: galleryData,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalNews: 0,
      upcomingEvents: 0,
      galleryItems: 0,
      news: [],
      events: [],
      gallery: [],
      loading: false,
      error: error instanceof Error ? error.message : "Failed to fetch dashboard statistics",
    };
  }
};

/**
 * Calculate the change percentage for stats (mock implementation)
 * In a real scenario, you would compare current stats with previous period
 * @param current Current count
 * @param previous Previous count
 * @returns Percentage change
 */
export const calculateChangePercentage = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};
