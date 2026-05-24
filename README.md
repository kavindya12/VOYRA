# Voyra - Explore Beyond Limits

A modern travel inquiry platform built with React, Tailwind CSS, and Supabase.

## Features

- Browse featured and full tour listings
- Search and filter tours by category
- View detailed tour pages
- Submit travel inquiries (no login required)
- Responsive, animated UI with Framer Motion

## Tech Stack

- React (Vite)
- Tailwind CSS v4
- React Router DOM
- Supabase
- React Icons
- Framer Motion
- React Hot Toast

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

See the full guide: **[docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)**

Quick steps:

1. Create a project at [supabase.com](https://supabase.com)
2. Run [`supabase/schema.sql`](supabase/schema.sql) then [`supabase/seed-full.sql`](supabase/seed-full.sql) in the SQL Editor
3. Copy your **Project URL** and **anon public key** from Settings → API

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials (from **Settings → API** in the Supabase dashboard):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

### 4. Run the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/         # shadcn-style UI primitives (contact-form, contact-sections)
├── lib/            # Shared utilities (cn helper)
├── pages/          # Route pages
├── supabase/       # Supabase client and services
└── routes/         # React Router configuration
```

See [docs/SHADCN_SETUP.md](docs/SHADCN_SETUP.md) for adding more shadcn components or migrating to TypeScript.

## Database Tables

**tours** - `slug`, `title`, `description`, `image`, `price`, `location`, `category`, `rating`, `badge`, `package_includes`, `not_included`, `itinerary`, `highlights`

**inquiries** - `name`, `email`, `phone`, `tour_name`, `date`, `people`, `message`, `created_at`

## Deploy on Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com).
2. Framework preset: **Vite** (or use the included `vercel.json`).
3. **Environment variables** (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Deploy. If the page is blank or assets 404, use **Deployments → … → Redeploy → Clear build cache**.

The site is a SPA: `vercel.json` serves static files from `dist/assets/` first, then falls back to `index.html` for routes like `/tours` and `/tour/kyoto-heritage`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run upload:hero-videos` | Upload hero MP4s to Supabase Storage |
