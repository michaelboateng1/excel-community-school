# Database Integration Setup Instructions

## 1. Install Supabase Client

Run the following command to install the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

or

```bash
pnpm add @supabase/supabase-js
```

## 2. Environment Configuration

1. Create a `.env.local` file in your project root (copy from `.env.example`):

   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Get these values from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

## 3. Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create the three tables using the SQL scripts in `SUPABASE_SETUP.md`

Copy and paste each SQL script:

- **News Table** - For news articles
- **Events Table** - For event management
- **Gallery Table** - For image gallery

## 4. Create Storage Buckets (Optional - For Image Uploads)

If you want to enable image uploads, create these storage buckets:

- `news-images`
- `event-images`
- `gallery-images`

Make them public by updating bucket policies.

## 5. Test the Integration

After setup, test that data loads:

1. Add some test data directly in Supabase
2. Visit the News & Events page to see published articles
3. Check the dashboard to verify all data loads correctly

## File Structure

```
services/
├── supabaseClient.ts       # Supabase client initialization
├── databaseService.ts      # CRUD operations for all entities
hooks/
├── useDatabase.ts          # Custom React hooks for data fetching
pages/
├── NewsAndEvents.tsx       # Updated to use Supabase hooks
Dashboard/
├── DashboardOverview.tsx   # Can be updated to use hooks
├── NewsManagement.tsx      # Can be updated to use database service
├── EventsManagement.tsx    # Can be updated to use database service
├── GalleryManagement.tsx   # Can be updated to use database service
```

## Next Steps

1. Update dashboard components to use the database service
2. Implement real image upload functionality
3. Add error handling and user feedback
4. Set up Row Level Security (RLS) policies for production

## Troubleshooting

**"Cannot find module '@supabase/supabase-js'"**

- Run: `npm install @supabase/supabase-js`

**"VITE_SUPABASE_URL is empty"**

- Check that `.env.local` exists and has correct credentials
- Restart dev server after adding env variables

**"Failed to fetch news"**

- Check Supabase tables exist with correct structure
- Verify anon key has read permissions
- Check browser console for detailed error messages
