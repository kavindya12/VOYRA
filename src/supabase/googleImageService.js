import { getDefaultGalleryForTour } from '../data/tourGalleries'
import { uniqueGalleryUrls } from '../utils/galleryUrls'

export const MIN_GALLERY_IMAGES = 5

function isGoogleImagesConfigured() {
  return Boolean(
    import.meta.env.VITE_GOOGLE_CSE_API_KEY && import.meta.env.VITE_GOOGLE_CSE_CX
  )
}

export async function fetchGooglePlaceImages(query, count = MIN_GALLERY_IMAGES) {
  const apiKey = import.meta.env.VITE_GOOGLE_CSE_API_KEY
  const cx = import.meta.env.VITE_GOOGLE_CSE_CX
  if (!apiKey || !cx || !query) return []

  try {
    const params = new URLSearchParams({
      key: apiKey,
      cx,
      q: query,
      searchType: 'image',
      num: String(Math.min(Math.max(count, 1), 10)),
      safe: 'active',
    })

    const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`)
    if (!res.ok) return []

    const json = await res.json()
    return (json.items ?? [])
      .map((item) => item.link)
      .filter(Boolean)
      .slice(0, count)
  } catch {
    return []
  }
}

/** DB gallery → defaults; Google CSE only fills gaps (optional). */
export async function resolveTourGallery(tour) {
  if (!tour) return []

  const fromDb = Array.isArray(tour.galleryImages) ? tour.galleryImages : []
  const defaults = getDefaultGalleryForTour(tour)

  // Prefer curated defaults; merge DB extras without duplicating the hero image
  let images = uniqueGalleryUrls([...defaults, ...fromDb])

  if (images.length < MIN_GALLERY_IMAGES && isGoogleImagesConfigured()) {
    const query = `${tour.title} ${tour.location} travel`
    const googleUrls = await fetchGooglePlaceImages(query, MIN_GALLERY_IMAGES)
    images = uniqueGalleryUrls([...images, ...googleUrls])
  }

  if (images.length < MIN_GALLERY_IMAGES) {
    images = uniqueGalleryUrls([...images, tour.image, ...defaults])
  }

  return images.slice(0, Math.max(MIN_GALLERY_IMAGES, images.length))
}
