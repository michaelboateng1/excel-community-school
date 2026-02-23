# Supabase Database Setup Guide

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials from [app.supabase.com](https://app.supabase.com):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Database Tables Setup

Create the following tables in your Supabase project:

### 1. News Table

```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('published', 'draft')) DEFAULT 'draft',
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  registered INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('upcoming', 'past', 'cancelled')) DEFAULT 'upcoming',
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Gallery Table

```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  upload_date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  thumbnail TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage Setup (For Image Uploads)

Create storage buckets in Supabase:

1. `news-images` - For news article images
2. `event-images` - For event images
3. `gallery-images` - For gallery images

Make these buckets public for easier access.

## Usage Examples

### Fetch Published News for Main Page
```typescript
import { useNews } from '@/hooks/useDatabase';

function NewsSection() {
  const { news, loading, error } = useNews();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {news.map(article => (
        <article key={article.id}>{article.title}</article>
      ))}
    </div>
  );
}
```

### Fetch All News for Dashboard (Admin)
```typescript
import { useAllNews } from '@/hooks/useDatabase';

function NewsManagement() {
  const { news, setNews } = useAllNews();
  
  const handleDeleteArticle = async (id) => {
    await newsService.delete(id);
    setNews(news.filter(n => n.id !== id));
  };
  
  return (
    <div>
      {news.map(article => (
        <div key={article.id}>
          {article.title}
          <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Fetch Upcoming Events
```typescript
import { useEvents } from '@/hooks/useDatabase';

function EventsList() {
  const { events, loading } = useEvents();
  
  return (
    <div>
      {events.map(event => (
        <event.date>{event.title}</event.date>
      ))}
    </div>
  );
}
```

### Upload Gallery Image
```typescript
import { fileService, galleryService } from '@/services/databaseService';

async function uploadGalleryImage(file, title, category) {
  try {
    // Upload file to storage
    const uploadData = await fileService.uploadImage('gallery-images', file, `${Date.now()}-${file.name}`);
    
    // Get public URL
    const imageUrl = fileService.getPublicUrl('gallery-images', uploadData.path);
    
    // Save to database
    await galleryService.create({
      title,
      category,
      thumbnail: imageUrl,
      upload_date: new Date().toISOString().split('T')[0],
      views: 0,
    });
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

## Available Services

### News Service
- `newsService.getAll()` - All articles
- `newsService.getPublished()` - Published only
- `newsService.getById(id)` - Single article
- `newsService.create(article)` - Create
- `newsService.update(id, updates)` - Update
- `newsService.delete(id)` - Delete
- `newsService.search(query)` - Search

### Event Service
- `eventService.getAll()` - All events
- `eventService.getUpcoming()` - Upcoming only
- `eventService.getById(id)` - Single event
- `eventService.create(event)` - Create
- `eventService.update(id, updates)` - Update
- `eventService.delete(id)` - Delete
- `eventService.search(query)` - Search
- `eventService.updateRegistration(id, count)` - Update registrations

### Gallery Service
- `galleryService.getAll()` - All items
- `galleryService.getByCategory(category)` - By category
- `galleryService.getById(id)` - Single item
- `galleryService.create(item)` - Create
- `galleryService.update(id, updates)` - Update
- `galleryService.delete(id)` - Delete
- `galleryService.search(query)` - Search
- `galleryService.incrementViews(id)` - Increment views
- `galleryService.getCategories()` - Get all categories

### File Service
- `fileService.uploadImage(bucket, file, path)` - Upload
- `fileService.getPublicUrl(bucket, path)` - Get URL
- `fileService.deleteImage(bucket, path)` - Delete

## Hooks Available

- `useNews()` - Published news for main page
- `useAllNews()` - All news for admin dashboard
- `useEvents()` - Upcoming events for main page
- `useAllEvents()` - All events for admin dashboard
- `useGallery(category?)` - Gallery items (optional category filter)
- `useAllGallery()` - All gallery items for admin dashboard
