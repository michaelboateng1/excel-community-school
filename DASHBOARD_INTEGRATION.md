# Dashboard Component Integration Guide

## Dashboard Overview Component

Replace the hardcoded stats and data with real data from Supabase:

```typescript
import { useAllNews, useAllEvents, useAllGallery } from "@/hooks/useDatabase";

const DashboardOverview: React.FC = () => {
  const { news } = useAllNews();
  const { events } = useAllEvents();
  const { items: galleryItems } = useAllGallery();

  const stats = [
    {
      label: "Total News Articles",
      value: news.length,
      change: 12,
      icon: "news",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Upcoming Events",
      value: events.filter((e) => e.status === "upcoming").length,
      change: -5,
      icon: "calendar",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Gallery Items",
      value: galleryItems.length,
      change: 23,
      icon: "image",
      color: "from-green-500 to-emerald-500",
    },
  ];

  // ... rest of component
};
```

## News Management Component

Update to use the database service:

```typescript
import { useAllNews } from '@/hooks/useDatabase';
import { newsService } from '@/services/databaseService';

const NewsManagement: React.FC = () => {
  const { news: articles, setNews } = useAllNews();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddArticle = async () => {
    if (formData.title && formData.excerpt) {
      try {
        const newArticle = await newsService.create({
          title: formData.title,
          excerpt: formData.excerpt,
          author: formData.author,
          category: formData.category,
          date: new Date().toISOString().split("T")[0],
          views: 0,
          status: "draft",
          content: "",
        });
        setNews([newArticle, ...articles]);
        setFormData({ title: "", excerpt: "", author: "", category: "" });
        setShowForm(false);
      } catch (error) {
        console.error("Error creating article:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await newsService.delete(id);
      setNews(articles.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // ... component JSX using filteredArticles
  );
};
```

## Events Management Component

Update to use the database service:

```typescript
import { useAllEvents } from '@/hooks/useDatabase';
import { eventService } from '@/services/databaseService';

const EventsManagement: React.FC = () => {
  const { events, setEvents } = useAllEvents();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEvent = async () => {
    if (formData.title && formData.date && formData.time && formData.location && formData.capacity) {
      try {
        const newEvent = await eventService.create({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          capacity: parseInt(formData.capacity),
          registered: 0,
          status: "upcoming",
          category: formData.category,
        });
        setEvents([newEvent, ...events]);
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          capacity: "",
          category: "",
        });
        setShowForm(false);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await eventService.delete(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // ... component JSX using filteredEvents
  );
};
```

## Gallery Management Component

Update to use the database service:

```typescript
import { useAllGallery } from '@/hooks/useDatabase';
import { galleryService, fileService } from '@/services/databaseService';

const GalleryManagement: React.FC = () => {
  const { items, setItems } = useAllGallery();
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = async (file: File) => {
    if (uploadData.title && uploadData.category) {
      try {
        // Upload file to storage
        const uploadedFile = await fileService.uploadImage(
          "gallery-images",
          file,
          `${Date.now()}-${file.name}`
        );

        // Get public URL
        const imageUrl = fileService.getPublicUrl(
          "gallery-images",
          uploadedFile.path
        );

        // Save to database
        const newItem = await galleryService.create({
          title: uploadData.title,
          category: uploadData.category,
          thumbnail: imageUrl,
          upload_date: new Date().toISOString().split("T")[0],
          views: 0,
          description: uploadData.description,
        });

        setItems([newItem, ...items]);
        setUploadData({ title: "", category: "", description: "" });
        setShowUploadForm(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await galleryService.delete(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // ... component JSX using filteredItems
  );
};
```

## Main Page Integration

The NewsAndEvents page is already updated. For other pages:

### Gallery Page

```typescript
import { useGallery } from '@/hooks/useDatabase';

function GalleryPage() {
  const { items, loading, error } = useGallery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // Display gallery items
  );
}
```

### Home Page (Featured News)

```typescript
import { useNews } from '@/hooks/useDatabase';

function HomePage() {
  const { news, loading } = useNews();

  return (
    // Display first 3 news articles
  );
}
```

## Error Handling

Add proper error handling to all components:

```typescript
const handleDelete = async (id: string) => {
  try {
    await newsService.delete(id);
    setNews(news.filter((n) => n.id !== id));
    // Show success notification
  } catch (error) {
    console.error("Error:", error);
    // Show error notification
    alert("Failed to delete article. Please try again.");
  }
};
```

## Loading States

Show loading indicators while data is being fetched:

```typescript
if (loading) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );
}
```

## Refactoring Checklist

- [ ] Install @supabase/supabase-js
- [ ] Add environment variables to .env.local
- [ ] Create database tables in Supabase
- [ ] Update DashboardOverview to use hooks
- [ ] Update NewsManagement to use database service
- [ ] Update EventsManagement to use database service
- [ ] Update GalleryManagement to use database service
- [ ] Test all CRUD operations
- [ ] Add error handling throughout
- [ ] Add loading states
- [ ] Test on production Supabase URL
