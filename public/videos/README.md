# Hero videos

The homepage hero loads videos from **Supabase Storage** when configured (recommended for large files). Local files here are a **fallback** for development.

## Recommended: Supabase Storage

1. Run [`supabase/storage-hero-videos.sql`](../../supabase/storage-hero-videos.sql) in the Supabase SQL Editor.
2. Open **Storage** → bucket **`hero-videos`** → **Upload** these files (exact names):

| File | Notes |
|------|--------|
| `hero-1.mp4` | Slide 1 (compress if over ~100MB) |
| `hero-2.mp4` | Slide 2 |
| `hero-3.mp4` | Slide 3 |

3. Ensure the bucket is **Public** (the SQL script sets this).
4. Restart `npm run dev` — the app builds URLs like:

   `https://YOUR_PROJECT.supabase.co/storage/v1/object/public/hero-videos/hero-1.mp4`

Full steps: [`docs/SUPABASE_SETUP.md`](../../docs/SUPABASE_SETUP.md) → Hero videos section.

## Local fallback

If Supabase is not set up, place MP4s in this folder with the names above. Only `hero-3.mp4` is in git (large files are gitignored).

## Video format

Use **H.264**, **1080p or lower**, and **faststart**:

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -pix_fmt yuv420p -vf scale=1920:-2 -preset fast -crf 28 -movflags +faststart hero-3.mp4
```

## Optional env override

Comma-separated URLs in `.env`:

```env
VITE_HERO_VIDEOS=https://example.com/a.mp4,https://example.com/b.mp4
```
