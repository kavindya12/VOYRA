function parseJsonArray(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

/** Maps a Supabase `tours` row (snake_case) to the app tour shape (camelCase). */
export function mapTourFromDb(row) {
  if (!row) return null

  return {
    id: row.slug || row.id,
    dbId: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    price: Number(row.price),
    location: row.location,
    category: row.category,
    rating: row.rating != null ? Number(row.rating) : 4.8,
    badge: row.badge || null,
    packageIncludes: parseJsonArray(row.package_includes),
    notIncluded: parseJsonArray(row.not_included),
    itinerary: parseJsonArray(row.itinerary),
    highlights: parseJsonArray(row.highlights),
    galleryImages: parseJsonArray(row.gallery_images),
  }
}

export function getTourDetailPath(tour) {
  return `/tour/${tour.slug || tour.id}`
}
