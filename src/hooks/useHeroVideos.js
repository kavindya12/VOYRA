import { useEffect, useState } from 'react'
import {
  getLocalHeroSlides,
  getProductionHeroSlides,
  resolveHeroSlides,
} from '../supabase/heroVideoService'

function defaultSlides() {
  return import.meta.env.PROD ? getProductionHeroSlides() : getLocalHeroSlides()
}

export function useHeroVideos() {
  const [slides, setSlides] = useState(() => (import.meta.env.PROD ? getProductionHeroSlides() : []))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    resolveHeroSlides()
      .then((resolved) => {
        if (!cancelled) {
          setSlides(resolved.length >= 3 ? resolved : defaultSlides())
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSlides(defaultSlides())
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { slides, loading }
}
