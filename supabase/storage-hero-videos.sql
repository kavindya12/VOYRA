-- ============================================================
-- Hero videos – public Supabase Storage bucket
-- Run in SQL Editor after schema.sql
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hero-videos',
  'hero-videos',
  true,
  524288000,
  array['video/mp4', 'video/webm']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read hero videos" on storage.objects;
create policy "Public read hero videos"
  on storage.objects for select
  using (bucket_id = 'hero-videos');
