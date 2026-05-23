-- ============================================================
-- CONTACT INFO seed (run after schema.sql)
-- ============================================================

insert into contact_info (id, email, phone, address, social_links)
values (
  1,
  'hello@voyra.com',
  '+1 (555) 123-4567',
  '123 Travel Street, Adventure City',
  '[
    {"platform": "facebook", "url": "https://facebook.com", "label": "Facebook"},
    {"platform": "instagram", "url": "https://instagram.com", "label": "Instagram"},
    {"platform": "twitter", "url": "https://twitter.com", "label": "Twitter"}
  ]'::jsonb
)
on conflict (id) do update set
  email = excluded.email,
  phone = excluded.phone,
  address = excluded.address,
  social_links = excluded.social_links,
  updated_at = now();
