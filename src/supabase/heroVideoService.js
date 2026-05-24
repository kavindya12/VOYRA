import { isSupabaseConfigured, supabase } from './client'

/** Public bucket – upload files with these exact names in Supabase Dashboard */
export const HERO_VIDEO_BUCKET = 'hero-videos'

export const HERO_VIDEO_FILES = ['hero-1.mp4', 'hero-2.mp4', 'hero-3.mp4']

const LOCAL_HERO_VIDEOS = HERO_VIDEO_FILES.map((name) => `/videos/${name}`)

function parseEnvHeroVideos() {
  const raw = import.meta.env.VITE_HERO_VIDEOS
  if (!raw?.trim()) return null
  const urls = raw.split(',').map((s) => s.trim()).filter(Boolean)
  return urls.length ? urls : null
}

export function getHeroVideoPublicUrl(fileName) {
  if (!isSupabaseConfigured || !supabase) return null
  const { data } = supabase.storage.from(HERO_VIDEO_BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

function localSlide(name) {
  const local = `/videos/${name}`
  return { id: name, src: local, fallback: null }
}

/**
 * Each slide: { id, src, fallback } — tries Supabase only when file exists in bucket;
 * otherwise local /videos/*. On playback error, Hero swaps to fallback.
 */
export async function resolveHeroSlides() {
  const fromEnv = parseEnvHeroVideos()
  if (fromEnv) {
    return fromEnv.map((src, i) => ({ id: `env-${i}`, src, fallback: null }))
  }

  let storageAvailable = new Set()

  if (isSupabaseConfigured && supabase) {
    const { data: files, error } = await supabase.storage.from(HERO_VIDEO_BUCKET).list('', {
      limit: 20,
      sortBy: { column: 'name', order: 'asc' },
    })

    if (!error) {
      for (const f of files ?? []) {
        if (f.name && f.name.endsWith('.mp4') && !f.name.startsWith('.')) {
          storageAvailable.add(f.name)
        }
      }
    }
  }

  return HERO_VIDEO_FILES.map((name) => {
    const local = `/videos/${name}`
    const storage = storageAvailable.has(name) ? getHeroVideoPublicUrl(name) : null

    if (storage) {
      return { id: name, src: storage, fallback: local }
    }

    return { id: name, src: local, fallback: null }
  })
}

/** @deprecated Use resolveHeroSlides */
export async function resolveHeroVideoUrls() {
  const slides = await resolveHeroSlides()
  return slides.map((s) => s.src)
}

export function getLocalHeroSlides() {
  return HERO_VIDEO_FILES.map((name) => localSlide(name))
}
