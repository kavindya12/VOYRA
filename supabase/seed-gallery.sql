-- ============================================================
-- GALLERY IMAGES - 5+ photos per tour (Pexels CDN, reliable URLs)
-- Run after tours are seeded (re-run to fix broken Unsplash links)
-- ============================================================

update tours set gallery_images = '[
  "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/2387870/pexels-photo-2387870.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/325964/pexels-photo-325964.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'bali-escape';

update tours set gallery_images = '[
  "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/3752196/pexels-photo-3752196.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'maldives-luxury';

update tours set gallery_images = '[
  "/images/ella-adventure.png",
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/358358/pexels-photo-358358.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/4669224/pexels-photo-4669224.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1433059/pexels-photo-1433059.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1437604/pexels-photo-1437604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'ella-adventure';

update tours set gallery_images = '[
  "/images/swiss-alps-journey.png",
  "https://images.pexels.com/photos/2662096/pexels-photo-2662096.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1770803/pexels-photo-1770803.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1533708/pexels-photo-1533708.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/315566/pexels-photo-315566.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'swiss-alps-journey';

update tours set gallery_images = '[
  "/images/kyoto-heritage.png",
  "https://images.pexels.com/photos/4020284/pexels-photo-4020284.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/2504500/pexels-photo-2504500.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/349447/pexels-photo-349447.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1443890/pexels-photo-1443890.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1025392/pexels-photo-1025392.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'kyoto-heritage';

update tours set gallery_images = '[
  "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/3607263/pexels-photo-3607263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/1025392/pexels-photo-1025392.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
  "https://images.pexels.com/photos/315566/pexels-photo-315566.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
]'::jsonb where slug = 'santorini-sunset';
