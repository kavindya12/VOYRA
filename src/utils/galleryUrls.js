/** Stable hotlink-friendly image URL (Pexels CDN). */
export function pexelsPhoto(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1`
}

/** Dedupe same photo when URL query strings differ (e.g. Unsplash w=800 vs w=1200). */
export function galleryImageKey(url) {
  if (!url) return ''
  if (url.startsWith('/')) return url

  try {
    const { hostname, pathname } = new URL(url)
    const unsplash = pathname.match(/\/photo-([^/]+)/)
    if (unsplash) return `unsplash:${unsplash[1]}`

    const pexels = pathname.match(/\/photos\/(\d+)\//)
    if (pexels) return `pexels:${pexels[1]}`

    return `${hostname}${pathname}`
  } catch {
    return url
  }
}

export function uniqueGalleryUrls(urls) {
  const seen = new Set()
  const out = []

  for (const url of urls) {
    if (!url) continue
    const key = galleryImageKey(url)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(url)
  }

  return out
}
