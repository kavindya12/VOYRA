import { useEffect, useState } from 'react'
import { getLocalHeroSlides, resolveHeroSlides } from '../supabase/heroVideoService'

export function useHeroVideos() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    resolveHeroSlides()
      .then((resolved) => {
        if (!cancelled) {
          setSlides(resolved.length ? resolved : getLocalHeroSlides())
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSlides(getLocalHeroSlides())
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { slides, loading }
}
