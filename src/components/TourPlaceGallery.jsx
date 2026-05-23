import { useEffect, useMemo, useState } from 'react'
import { HiX } from 'react-icons/hi'

export default function TourPlaceGallery({ images = [], location, loading }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [brokenUrls, setBrokenUrls] = useState(() => new Set())

  useEffect(() => {
    setBrokenUrls(new Set())
  }, [images])

  const visibleImages = useMemo(
    () => images.filter((src) => !brokenUrls.has(src)),
    [images, brokenUrls]
  )

  const handleImageError = (src) => {
    setBrokenUrls((prev) => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }

  if (loading) {
    return (
      <div className="mt-6">
        <div className="h-6 w-48 animate-pulse rounded bg-voyra-sky" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-voyra-sky" />
          ))}
        </div>
      </div>
    )
  }

  if (!visibleImages.length) return null

  const activeImage = lightboxIndex != null ? visibleImages[lightboxIndex] : null

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-voyra-navy">
        Places you&apos;ll explore
        {location ? (
          <span className="ml-1 font-normal text-voyra-muted">· {location}</span>
        ) : null}
      </h2>
      <p className="mt-1 text-sm text-voyra-muted">
        {visibleImages.length} photos from this destination
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {visibleImages.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-voyra-sky bg-voyra-sky shadow-sm transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-voyra-orange"
          >
            <img
              src={src}
              alt={`${location || 'Tour'} view ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => handleImageError(src)}
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <HiX size={24} />
          </button>
          <img
            src={activeImage}
            alt="Enlarged tour view"
            className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
