-- ============================================================
-- MIGRATION: Add contact_info for existing projects
-- ============================================================

create table if not exists contact_info (
  id int primary key default 1 check (id = 1),
  email text not null,
  phone text not null,
  address text not null,
  social_links jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table contact_info enable row level security;

drop policy if exists "Public read contact_info" on contact_info;
create policy "Public read contact_info" on contact_info for select using (true);

-- Then run seed-contact.sql
