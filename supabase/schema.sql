-- ============================================================
-- VOYRA - Full database schema (run in Supabase SQL Editor)
-- ============================================================

-- Drop old tables if you want a clean start (WARNING: deletes all data)
-- drop table if exists inquiries cascade;
-- drop table if exists tours cascade;

-- ------------------------------------------------------------
-- TOURS (all fields used on Home, Tours list, and Detail pages)
-- ------------------------------------------------------------
create table if not exists tours (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  image text not null,
  price numeric not null,
  location text not null,
  category text not null check (
    category in ('Beach', 'Adventure', 'Culture', 'Luxury', 'Cultural')
  ),
  rating numeric(2,1) default 4.8,
  badge text check (badge in ('trending', 'bestseller')),
  package_includes jsonb not null default '[]'::jsonb,
  not_included jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  gallery_images jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

create index if not exists tours_slug_idx on tours (slug);
create index if not exists tours_category_idx on tours (category);

-- ------------------------------------------------------------
-- INQUIRIES (home inquiry form + tour detail booking form)
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- CONTACT INFO (singleton row: email, phone, address, social links)
-- ------------------------------------------------------------
create table if not exists contact_info (
  id int primary key default 1 check (id = 1),
  email text not null,
  phone text not null,
  address text not null,
  social_links jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Row Level Security (public read tours + contact, public insert inquiries)
-- ------------------------------------------------------------
alter table tours enable row level security;
alter table inquiries enable row level security;
alter table contact_info enable row level security;

drop policy if exists "Public read tours" on tours;
create policy "Public read tours" on tours for select using (true);

drop policy if exists "Public insert inquiries" on inquiries;
create policy "Public insert inquiries" on inquiries for insert with check (true);

drop policy if exists "Public read contact_info" on contact_info;
create policy "Public read contact_info" on contact_info for select using (true);
