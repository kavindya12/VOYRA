-- ============================================================
-- MIGRATION: Upgrade an existing `tours` table (keep inquiries)
-- Run this if you already ran the old seed.sql
-- ============================================================

alter table tours add column if not exists slug text;
alter table tours add column if not exists rating numeric(2,1) default 4.8;
alter table tours add column if not exists badge text;
alter table tours add column if not exists package_includes jsonb not null default '[]'::jsonb;
alter table tours add column if not exists not_included jsonb not null default '[]'::jsonb;
alter table tours add column if not exists itinerary jsonb not null default '[]'::jsonb;
alter table tours add column if not exists highlights jsonb not null default '[]'::jsonb;
alter table tours add column if not exists gallery_images jsonb not null default '[]'::jsonb;
alter table tours add column if not exists created_at timestamptz default now();

-- Allow Luxury and Cultural categories
alter table tours drop constraint if exists tours_category_check;
alter table tours add constraint tours_category_check check (
  category in ('Beach', 'Adventure', 'Culture', 'Luxury', 'Cultural')
);

alter table tours drop constraint if exists tours_badge_check;
alter table tours add constraint tours_badge_check check (
  badge is null or badge in ('trending', 'bestseller')
);

-- After migration, run seed-full.sql OR update rows manually in Table Editor
