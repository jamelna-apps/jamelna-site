# Photography Gallery Setup Guide

Your photography section now has a full CMS backend powered by Sanity.io! Here's how to set it up:

## Quick Setup (5 minutes)

### Step 1: Create a Sanity Account
1. Go to [https://sanity.io](https://sanity.io)
2. Sign up for a free account (perfect for personal portfolios)
3. Click "Create new project"

### Step 2: Get Your Project Credentials
1. In your Sanity dashboard, note your **Project ID**
2. Choose or create a **dataset** (use "production" for the main site)

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Sanity credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Step 4: Deploy Your Sanity Studio
Run this command to set up Sanity:
```bash
cd /Users/jmelendez/Projects/jamelna/jamelna-site
npx sanity init
```

Follow the prompts and use the same Project ID from Step 2.

### Step 5: Access Your Admin Panel
1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3002/studio`
3. Sign in with your Sanity account

## Using the CMS

### Creating a Gallery
1. Go to `/studio` in your browser
2. Click "Photography Gallery" in the sidebar
3. Click "Create new Photography Gallery"
4. Fill in:
   - **Title**: Name of your gallery (e.g., "Barcelona Streets")
   - **Slug**: Auto-generates from title (e.g., "barcelona-streets")
   - **Description**: Brief description of the gallery
   - **Cover Image**: Upload a cover photo for the gallery thumbnail
   - **Photos**: Add multiple photos with captions and alt text
   - **Featured**: Toggle to feature this gallery
5. Click "Publish"

### Managing Photos
For each photo in a gallery, you can add:
- **Image**: Upload the photo (Sanity optimizes it automatically)
- **Caption**: Optional caption shown on hover
- **Alt Text**: Required for accessibility

### Gallery Features
- ✅ Drag-and-drop photo uploads
- ✅ Automatic image optimization
- ✅ Hotspot/crop tool for cover images
- ✅ Reorder photos by dragging
- ✅ Featured galleries
- ✅ Published date tracking

## File Structure

```
sanity/
├── lib/
│   ├── client.ts        # Sanity client configuration
│   └── image.ts         # Image URL builder
└── schemas/
    ├── gallery.ts       # Gallery schema definition
    └── index.ts         # Schema exports

app/
├── photography/
│   ├── page.tsx         # Galleries list
│   └── [slug]/
│       └── page.tsx     # Individual gallery view
└── studio/
    └── [[...index]]/
        └── page.tsx     # Sanity Studio admin panel
```

## URLs

- **Photography Homepage**: `/photography`
- **Individual Gallery**: `/photography/[gallery-slug]`
- **Admin Studio**: `/studio`

## Tips

1. **Image Size**: Upload high-quality images - Sanity automatically creates optimized versions
2. **Alt Text**: Always add descriptive alt text for accessibility
3. **Organization**: Use meaningful gallery titles and slugs
4. **Featured**: Mark your best galleries as "featured" for special display
5. **Drafts**: Sanity supports draft mode - only published galleries appear on the site

## Deployment

When deploying to Vercel:
1. Add the environment variables in Vercel dashboard
2. Sanity works seamlessly with Vercel
3. Images are served via Sanity's CDN (free tier includes plenty of bandwidth)

## Cost

Sanity is **FREE** for personal projects:
- ✅ Unlimited API requests
- ✅ 3 team members
- ✅ 10GB assets/bandwidth per month
- ✅ Perfect for a photography portfolio!

## Need Help?

Check out the [Sanity Documentation](https://www.sanity.io/docs) for more advanced features like:
- Custom image crops
- Batch operations
- GROQ queries (already implemented in the photography pages)
- Webhooks for automatic rebuilds
