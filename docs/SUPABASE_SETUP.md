# Voyra + Supabase – Complete setup guide

This guide connects your website to Supabase so **every tour detail** (package, itinerary, highlights, rating, etc.) comes from your database.

---

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New project**.
3. Choose a name, password, and region → **Create project**.

---

## 2. Get API keys

1. Open your project → **Settings** → **API**.
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_PUBLISHABLE_KEY`

3. In the Voyra folder, create `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

4. Restart the dev server: `npm run dev`

---

## 3. Run SQL in Supabase

Open **SQL Editor** → **New query**.

### Option A – New project (recommended)

Run these files **in order**:

1. [`supabase/schema.sql`](../supabase/schema.sql) – creates `tours`, `inquiries`, and `contact_info` tables
2. [`supabase/seed-full.sql`](../supabase/seed-full.sql) – inserts 6 tours with **all detail fields**
3. [`supabase/seed-contact.sql`](../supabase/seed-contact.sql) – inserts contact email, phone, address, and social links
4. [`supabase/seed-gallery.sql`](../supabase/seed-gallery.sql) – adds 5+ gallery images per tour for the detail page

### Option B – You already have an old `tours` table

1. Run [`supabase/migrate-existing.sql`](../supabase/migrate-existing.sql)
2. Run [`supabase/seed-full.sql`](../supabase/seed-full.sql)  
   (or edit rows in **Table Editor**)
3. Run [`supabase/migrate-contact.sql`](../supabase/migrate-contact.sql) then [`supabase/seed-contact.sql`](../supabase/seed-contact.sql)

Click **Run** after each script. You should see “Success”.

---

## 4. Database structure

### Table: `tours`

| Column | Type | Used on website |
|--------|------|-----------------|
| `id` | uuid | Internal ID (auto) |
| `slug` | text | URL: `/tour/kyoto-heritage` |
| `title` | text | Card + detail title |
| `description` | text | About this tour |
| `image` | text | Image URL or `/images/...` |
| `price` | number | From $XXX |
| `location` | text | Bali, Indonesia |
| `category` | text | Beach, Adventure, Luxury, Cultural |
| `rating` | number | 4.8 stars |
| `badge` | text | `trending` or `bestseller` |
| `package_includes` | jsonb | Package Includes list |
| `not_included` | jsonb | Not Included list |
| `itinerary` | jsonb | Day-by-day plan |
| `highlights` | jsonb | Highlight tags |
| `gallery_images` | jsonb | Photo gallery on tour detail page (5+ URLs) |

### Table: `inquiries`

| Column | Type |
|--------|------|
| `name`, `email`, `phone` | text |
| `tour_name` | text |
| `date` | date |
| `people` | int |
| `message` | text (optional) |
| `created_at` | timestamp |

### Table: `contact_info` (single row, `id = 1`)

| Column | Type | Used on website |
|--------|------|-----------------|
| `email` | text | Contact page + footer |
| `phone` | text | Contact page + footer |
| `address` | text | Contact page + footer |
| `social_links` | jsonb | Follow Us icons (facebook, instagram, twitter) |

Edit this row in **Table Editor** to update contact details site-wide.

---

## 5. JSON examples (for Table Editor)

**package_includes** (array of strings):

```json
["5 Days / 4 Nights stay", "Daily breakfast", "Airport pickup"]
```

**not_included**:

```json
["Flight tickets", "Travel insurance"]
```

**itinerary**:

```json
[
  {"day": "Day 1", "title": "Arrival + beach relaxation"},
  {"day": "Day 2", "title": "Ubud tour + rice terraces"}
]
```

**highlights**:

```json
["Bali swing experience", "Sunset beach dinner"]
```

**gallery_images** (array of image URLs, at least 5):

```json
[
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
  "https://images.unsplash.com/photo-1570077186670-a3852c4ebc7b?w=800&q=80"
]
```

Optional: set `VITE_GOOGLE_CSE_API_KEY` and `VITE_GOOGLE_CSE_CX` in `.env` to fetch extra photos from Google when the DB gallery has fewer than 5 images.

---

## 6. How the website links to the DB

```text
Home / Tours page
    → fetchTours() → SELECT * FROM tours
    → Tour cards link to /tour/{slug}

Tour detail page /tour/kyoto-heritage
    → fetchTourById('kyoto-heritage')
    → SELECT * FROM tours WHERE slug = 'kyoto-heritage'
    → Shows image, gallery, description, package, itinerary, highlights
    → Inquiry form → INSERT INTO inquiries
```

Code files:

- [`src/supabase/client.js`](../src/supabase/client.js) – connection
- [`src/supabase/tourMapper.js`](../src/supabase/tourMapper.js) – DB → app format
- [`src/supabase/inquiryService.js`](../src/supabase/inquiryService.js) – fetch & insert

---

## 7. Add a new tour in Supabase

**Table Editor** → `tours` → **Insert row**:

| Field | Example |
|-------|---------|
| slug | `paris-romance` |
| title | `Paris Romance` |
| description | Full paragraph... |
| image | `https://...` or `/images/paris.jpg` |
| price | `1199` |
| location | `Paris, France` |
| category | `Cultural` |
| rating | `4.9` |
| badge | `trending` or leave empty |
| package_includes | JSON array |
| not_included | JSON array |
| itinerary | JSON array of `{day, title}` |
| highlights | JSON array |

Open: `http://localhost:5173/tour/paris-romance`

---

## 8. Verify inquiries

**Home page inquiry** (`/#inquiry`):

1. Fill First name, Last name, Email, Phone, Travel date, People, Message.
2. Click **Submit Inquiry**.
3. Supabase → **Table Editor** → `inquiries` → new row with `tour_name` = your tour or `General Inquiry`.

**Tour detail page:**

1. Open any tour → submit the booking form.
2. Same `inquiries` table - check `tour_name` matches the tour title.

---

## 9. Troubleshooting

| Problem | Fix |
|---------|-----|
| Yellow “Supabase not configured” banner | Add `.env` and restart `npm run dev` |
| Tours list empty | Run `seed-full.sql` |
| Detail page empty / loading forever | Hard refresh; check `slug` matches URL |
| “Tour not found” | Ensure row exists with that `slug` |
| Inquiry submit fails | Check RLS policy on `inquiries` (insert allowed) |

---

## 10. SQL quick reference

**List all tours:**

```sql
select slug, title, price, category from tours order by title;
```

**Get one tour (same as the website):**

```sql
select * from tours where slug = 'kyoto-heritage';
```

**View recent inquiries:**

```sql
select * from inquiries order by created_at desc limit 20;
```
