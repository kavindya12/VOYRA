-- Voyra database setup
-- Run this in your Supabase SQL Editor

-- Tours table
create table if not exists tours (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image text not null,
  price numeric not null,
  location text not null,
  category text not null check (category in ('Beach', 'Adventure', 'Culture'))
);

-- Inquiries table
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  tour_name text not null,
  date date not null,
  people int not null,
  message text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table tours enable row level security;
alter table inquiries enable row level security;

drop policy if exists "Public read tours" on tours;
create policy "Public read tours" on tours for select using (true);

drop policy if exists "Public insert inquiries" on inquiries;
create policy "Public insert inquiries" on inquiries for insert with check (true);

-- Seed sample tours (run once; skip if you already have data)
insert into tours (title, description, image, price, location, category) values
(
  'Bali Paradise Escape',
  'Unwind on pristine beaches, explore ancient temples, and enjoy world-class spa retreats across the Island of the Gods.',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  1299,
  'Bali, Indonesia',
  'Beach'
),
(
  'Maldives Lagoon Retreat',
  'Stay in overwater villas, snorkel crystal-clear lagoons, and dine under the stars on a private island getaway.',
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
  2499,
  'Maldives',
  'Beach'
),
(
  'Swiss Alps Adventure',
  'Hike breathtaking mountain trails, ride scenic cable cars, and experience charming alpine villages.',
  'https://images.unsplash.com/photo-1531366938847-26414eaa9f0d?w=800&q=80',
  1899,
  'Interlaken, Switzerland',
  'Adventure'
),
(
  'Patagonia Wilderness Trek',
  'Trek through dramatic glaciers and rugged peaks in one of the world''s last great wilderness frontiers.',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
  2199,
  'Patagonia, Chile',
  'Adventure'
),
(
  'Kyoto Cultural Journey',
  'Discover centuries of tradition with temple visits, tea ceremonies, and strolls through historic geisha districts.',
  'https://images.unsplash.com/photo-1493976040374-85c8e912f636?w=800&q=80',
  1599,
  'Kyoto, Japan',
  'Culture'
),
(
  'Rome Heritage Tour',
  'Walk through ancient history at the Colosseum, Vatican City, and the cobblestone streets of Trastevere.',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  1399,
  'Rome, Italy',
  'Culture'
);
