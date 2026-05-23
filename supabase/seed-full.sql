-- ============================================================
-- VOYRA - Seed all tours with FULL detail page data
-- Run AFTER schema.sql
-- ============================================================

-- Clear existing tours (optional - comment out if you want to keep old rows)
delete from tours;

insert into tours (
  slug, title, description, image, price, location, category,
  rating, badge, package_includes, not_included, itinerary, highlights
) values

-- 1. Bali Escape
(
  'bali-escape',
  'Bali Escape',
  'Experience the tropical beauty of Bali with stunning beaches, waterfalls, luxury resorts, and unforgettable sunsets.',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
  499,
  'Bali, Indonesia',
  'Beach',
  4.8,
  'trending',
  '["5 Days / 4 Nights stay","4-star beachfront hotel","Daily breakfast","Airport pickup & drop","Bali island tour","Ubud cultural visit","Tanah Lot sunset tour","English-speaking guide"]'::jsonb,
  '["Flight tickets","Personal expenses","Travel insurance","Lunch & dinner"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival + beach relaxation"},{"day":"Day 2","title":"Ubud tour + rice terraces"},{"day":"Day 3","title":"Waterfalls + temple visits"},{"day":"Day 4","title":"Beach activities + shopping"},{"day":"Day 5","title":"Checkout + airport transfer"}]'::jsonb,
  '["Bali swing experience","Sunset beach dinner","Infinity pool resort","Traditional Balinese culture"]'::jsonb
),

-- 2. Maldives Luxury
(
  'maldives-luxury',
  'Maldives Luxury',
  'Enjoy an ultra-luxury tropical escape in the Maldives with overwater villas, crystal-clear lagoons, and premium experiences.',
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
  1899,
  'Maldives',
  'Luxury',
  4.9,
  'bestseller',
  '["6 Days / 5 Nights","Private water villa","All-inclusive meals","Speedboat transfers","Snorkeling experience","Sunset cruise","Spa session","Candlelight dinner"]'::jsonb,
  '["International flights","Visa fees","Personal shopping"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival + resort welcome"},{"day":"Day 2","title":"Snorkeling & water sports"},{"day":"Day 3","title":"Island hopping"},{"day":"Day 4","title":"Spa & relaxation"},{"day":"Day 5","title":"Luxury cruise dinner"},{"day":"Day 6","title":"Departure"}]'::jsonb,
  '["Water villa stay","Private beach","Coral reef snorkeling","Luxury spa treatment"]'::jsonb
),

-- 3. Ella Adventure
(
  'ella-adventure',
  'Ella Adventure',
  'Explore the scenic mountains of Ella with hiking trails, waterfalls, tea plantations, and train rides.',
  '/images/ella-adventure.png',
  649,
  'Ella, Sri Lanka',
  'Adventure',
  4.7,
  'trending',
  '["4 Days / 3 Nights","Boutique mountain hotel","Breakfast & dinner","Ella Rock hike","Nine Arches Bridge tour","Tea factory visit","Train ride experience"]'::jsonb,
  '["Airfare","Adventure gear","Personal expenses"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival + city exploration"},{"day":"Day 2","title":"Ella Rock hiking adventure"},{"day":"Day 3","title":"Train ride + tea plantations"},{"day":"Day 4","title":"Waterfalls + departure"}]'::jsonb,
  '["Scenic train journey","Mountain sunrise","Tea plantation tours","Adventure hiking"]'::jsonb
),

-- 4. Swiss Alps Journey
(
  'swiss-alps-journey',
  'Swiss Alps Journey',
  'Discover breathtaking Alpine landscapes, snowy mountains, luxury trains, and adventure activities in Switzerland.',
  '/images/swiss-alps-journey.png',
  1299,
  'Interlaken, Switzerland',
  'Adventure',
  4.9,
  'bestseller',
  '["7 Days / 6 Nights","Alpine hotel accommodation","Swiss rail pass","Jungfraujoch tour","Mountain excursions","Breakfast included"]'::jsonb,
  '["Visa processing","International airfare","Ski equipment rental"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival in Interlaken"},{"day":"Day 2","title":"Mountain train experience"},{"day":"Day 3","title":"Jungfraujoch excursion"},{"day":"Day 4","title":"Adventure activities"},{"day":"Day 5","title":"Lake cruise"},{"day":"Day 6","title":"City shopping"},{"day":"Day 7","title":"Departure"}]'::jsonb,
  '["Snow mountain views","Luxury train rides","Swiss chocolate tasting","Alpine villages"]'::jsonb
),

-- 5. Kyoto Heritage
(
  'kyoto-heritage',
  'Kyoto Heritage',
  'Immerse yourself in traditional Japanese culture with temples, shrines, bamboo forests, and authentic cuisine.',
  '/images/kyoto-heritage.png',
  899,
  'Kyoto, Japan',
  'Cultural',
  4.8,
  'trending',
  '["5 Days / 4 Nights","Traditional Ryokan stay","Japanese breakfast","Temple tours","Bamboo forest visit","Tea ceremony experience","Cultural guide"]'::jsonb,
  '["Flight tickets","Shopping expenses","Travel insurance"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival + Kyoto city walk"},{"day":"Day 2","title":"Temple & shrine visits"},{"day":"Day 3","title":"Bamboo forest exploration"},{"day":"Day 4","title":"Tea ceremony + shopping"},{"day":"Day 5","title":"Departure"}]'::jsonb,
  '["Traditional Japanese stay","Historic temples","Sakura garden visits","Authentic Japanese cuisine"]'::jsonb
),

-- 6. Santorini Sunset
(
  'santorini-sunset',
  'Santorini Sunset',
  'Experience iconic white-blue architecture, breathtaking sunsets, luxury cliffside hotels, and Mediterranean vibes.',
  'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80',
  1099,
  'Santorini, Greece',
  'Luxury',
  4.9,
  'trending',
  '["5 Days / 4 Nights","Luxury cliffside hotel","Breakfast included","Sunset cruise","Wine tasting tour","Beach excursions","Airport transfers"]'::jsonb,
  '["International flights","Lunch & dinner","Personal shopping"]'::jsonb,
  '[{"day":"Day 1","title":"Arrival + sunset viewing"},{"day":"Day 2","title":"Island exploration"},{"day":"Day 3","title":"Cruise experience"},{"day":"Day 4","title":"Beach & wine tasting"},{"day":"Day 5","title":"Departure"}]'::jsonb,
  '["Caldera sunset views","Cliffside infinity pools","Mediterranean wine tasting","Oia village exploration"]'::jsonb
);
