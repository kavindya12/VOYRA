import { TOUR_GALLERY_BY_SLUG } from './tourGalleries'

export const DEMO_TOURS = [
  {
    id: 'bali-escape',
    isDemo: true,
    title: 'Bali Escape',
    description:
      'Experience the tropical beauty of Bali with stunning beaches, waterfalls, luxury resorts, and unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
    price: 499,
    location: 'Bali, Indonesia',
    category: 'Beach',
    rating: 4.8,
    badge: 'trending',
    packageIncludes: [
      '5 Days / 4 Nights stay',
      '4-star beachfront hotel',
      'Daily breakfast',
      'Airport pickup & drop',
      'Bali island tour',
      'Ubud cultural visit',
      'Tanah Lot sunset tour',
      'English-speaking guide',
    ],
    notIncluded: [
      'Flight tickets',
      'Personal expenses',
      'Travel insurance',
      'Lunch & dinner',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival + beach relaxation' },
      { day: 'Day 2', title: 'Ubud tour + rice terraces' },
      { day: 'Day 3', title: 'Waterfalls + temple visits' },
      { day: 'Day 4', title: 'Beach activities + shopping' },
      { day: 'Day 5', title: 'Checkout + airport transfer' },
    ],
    highlights: [
      'Bali swing experience',
      'Sunset beach dinner',
      'Infinity pool resort',
      'Traditional Balinese culture',
    ],
  },
  {
    id: 'maldives-luxury',
    isDemo: true,
    title: 'Maldives Luxury',
    description:
      'Enjoy an ultra-luxury tropical escape in the Maldives with overwater villas, crystal-clear lagoons, and premium experiences.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    price: 1899,
    location: 'Maldives',
    category: 'Luxury',
    rating: 4.9,
    badge: 'bestseller',
    packageIncludes: [
      '6 Days / 5 Nights',
      'Private water villa',
      'All-inclusive meals',
      'Speedboat transfers',
      'Snorkeling experience',
      'Sunset cruise',
      'Spa session',
      'Candlelight dinner',
    ],
    notIncluded: ['International flights', 'Visa fees', 'Personal shopping'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival + resort welcome' },
      { day: 'Day 2', title: 'Snorkeling & water sports' },
      { day: 'Day 3', title: 'Island hopping' },
      { day: 'Day 4', title: 'Spa & relaxation' },
      { day: 'Day 5', title: 'Luxury cruise dinner' },
      { day: 'Day 6', title: 'Departure' },
    ],
    highlights: [
      'Water villa stay',
      'Private beach',
      'Coral reef snorkeling',
      'Luxury spa treatment',
    ],
  },
  {
    id: 'ella-adventure',
    isDemo: true,
    title: 'Ella Adventure',
    description:
      'Explore the scenic mountains of Ella with hiking trails, waterfalls, tea plantations, and train rides.',
    image: '/images/ella-adventure.png',
    price: 649,
    location: 'Ella, Sri Lanka',
    category: 'Adventure',
    rating: 4.7,
    badge: 'trending',
    packageIncludes: [
      '4 Days / 3 Nights',
      'Boutique mountain hotel',
      'Breakfast & dinner',
      'Ella Rock hike',
      'Nine Arches Bridge tour',
      'Tea factory visit',
      'Train ride experience',
    ],
    notIncluded: ['Airfare', 'Adventure gear', 'Personal expenses'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival + city exploration' },
      { day: 'Day 2', title: 'Ella Rock hiking adventure' },
      { day: 'Day 3', title: 'Train ride + tea plantations' },
      { day: 'Day 4', title: 'Waterfalls + departure' },
    ],
    highlights: [
      'Scenic train journey',
      'Mountain sunrise',
      'Tea plantation tours',
      'Adventure hiking',
    ],
  },
  {
    id: 'swiss-alps-journey',
    isDemo: true,
    title: 'Swiss Alps Journey',
    description:
      'Discover breathtaking Alpine landscapes, snowy mountains, luxury trains, and adventure activities in Switzerland.',
    image: '/images/swiss-alps-journey.png',
    price: 1299,
    location: 'Interlaken, Switzerland',
    category: 'Adventure',
    rating: 4.9,
    badge: 'bestseller',
    packageIncludes: [
      '7 Days / 6 Nights',
      'Alpine hotel accommodation',
      'Swiss rail pass',
      'Jungfraujoch tour',
      'Mountain excursions',
      'Breakfast included',
    ],
    notIncluded: ['Visa processing', 'International airfare', 'Ski equipment rental'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Interlaken' },
      { day: 'Day 2', title: 'Mountain train experience' },
      { day: 'Day 3', title: 'Jungfraujoch excursion' },
      { day: 'Day 4', title: 'Adventure activities' },
      { day: 'Day 5', title: 'Lake cruise' },
      { day: 'Day 6', title: 'City shopping' },
      { day: 'Day 7', title: 'Departure' },
    ],
    highlights: [
      'Snow mountain views',
      'Luxury train rides',
      'Swiss chocolate tasting',
      'Alpine villages',
    ],
  },
  {
    id: 'kyoto-heritage',
    isDemo: true,
    title: 'Kyoto Heritage',
    description:
      'Immerse yourself in traditional Japanese culture with temples, shrines, bamboo forests, and authentic cuisine.',
    image: '/images/kyoto-heritage.png',
    price: 899,
    location: 'Kyoto, Japan',
    category: 'Cultural',
    rating: 4.8,
    badge: 'trending',
    packageIncludes: [
      '5 Days / 4 Nights',
      'Traditional Ryokan stay',
      'Japanese breakfast',
      'Temple tours',
      'Bamboo forest visit',
      'Tea ceremony experience',
      'Cultural guide',
    ],
    notIncluded: ['Flight tickets', 'Shopping expenses', 'Travel insurance'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival + Kyoto city walk' },
      { day: 'Day 2', title: 'Temple & shrine visits' },
      { day: 'Day 3', title: 'Bamboo forest exploration' },
      { day: 'Day 4', title: 'Tea ceremony + shopping' },
      { day: 'Day 5', title: 'Departure' },
    ],
    highlights: [
      'Traditional Japanese stay',
      'Historic temples',
      'Sakura garden visits',
      'Authentic Japanese cuisine',
    ],
  },
  {
    id: 'santorini-sunset',
    isDemo: true,
    title: 'Santorini Sunset',
    description:
      'Experience iconic white-blue architecture, breathtaking sunsets, luxury cliffside hotels, and Mediterranean vibes.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80',
    price: 1099,
    location: 'Santorini, Greece',
    category: 'Luxury',
    rating: 4.9,
    badge: 'trending',
    packageIncludes: [
      '5 Days / 4 Nights',
      'Luxury cliffside hotel',
      'Breakfast included',
      'Sunset cruise',
      'Wine tasting tour',
      'Beach excursions',
      'Airport transfers',
    ],
    notIncluded: ['International flights', 'Lunch & dinner', 'Personal shopping'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival + sunset viewing' },
      { day: 'Day 2', title: 'Island exploration' },
      { day: 'Day 3', title: 'Cruise experience' },
      { day: 'Day 4', title: 'Beach & wine tasting' },
      { day: 'Day 5', title: 'Departure' },
    ],
    highlights: [
      'Caldera sunset views',
      'Cliffside infinity pools',
      'Mediterranean wine tasting',
      'Oia village exploration',
    ],
  },
]

export const TOUR_CATEGORIES = ['All', 'Beach', 'Adventure', 'Luxury', 'Cultural']

export function matchesTourCategory(tour, category) {
  if (category === 'All') return true
  if (category === 'Cultural') return tour.category === 'Cultural' || tour.category === 'Culture'
  return tour.category === category
}

const LEGACY_TOUR_IDS = {
  'demo-bali': 'bali-escape',
  'demo-maldives': 'maldives-luxury',
  'demo-ella': 'ella-adventure',
  'demo-swiss': 'swiss-alps-journey',
  'demo-kyoto': 'kyoto-heritage',
  'demo-santorini': 'santorini-sunset',
}

export function normalizeTourId(id) {
  if (!id) return id
  return LEGACY_TOUR_IDS[id] || id
}

export function getDemoTourById(id) {
  if (!id) return null
  const slug = normalizeTourId(id)
  const tour = DEMO_TOURS.find((t) => t.id === slug || String(t.id) === String(slug))
  return tour ? { ...t } : null
}

function findDemoByTitle(title) {
  if (!title) return null
  const key = title.toLowerCase()
  return (
    DEMO_TOURS.find((d) => key === d.title.toLowerCase()) ||
    DEMO_TOURS.find((d) => {
      const word = d.title.split(' ')[0].toLowerCase()
      return key.includes(word) || d.title.toLowerCase().includes(key.split(' ')[0])
    }) ||
    null
  )
}

function pickDetailField(tourValue, demoValue) {
  if (Array.isArray(tourValue) && tourValue.length > 0) return tourValue
  return demoValue ?? []
}

export function mergeWithDemoDetails(tour) {
  if (!tour) return null

  const demo = getDemoTourById(tour.id) || findDemoByTitle(tour.title)
  if (!demo) return withDefaultRating(tour)

  return withDefaultRating({
    ...demo,
    ...tour,
    id: tour.id,
    slug: tour.slug || demo.id,
    image: tour.image || demo.image,
    price: tour.price ?? demo.price,
    location: tour.location || demo.location,
    category: tour.category || demo.category,
    description: tour.description || demo.description,
    packageIncludes: pickDetailField(tour.packageIncludes, demo.packageIncludes),
    notIncluded: pickDetailField(tour.notIncluded, demo.notIncluded),
    itinerary: pickDetailField(tour.itinerary, demo.itinerary),
    highlights: pickDetailField(tour.highlights, demo.highlights),
    galleryImages: pickDetailField(
      tour.galleryImages,
      demo.galleryImages ?? TOUR_GALLERY_BY_SLUG[tour.slug || tour.id || demo.id]
    ),
    rating: tour.rating ?? demo.rating,
    badge: tour.badge ?? demo.badge,
  })
}

export function withDefaultRating(tour, index = 0) {
  return {
    ...tour,
    rating: tour.rating ?? 4.8,
    badge: tour.badge ?? (index === 0 ? 'trending' : index === 1 ? 'bestseller' : null),
  }
}
