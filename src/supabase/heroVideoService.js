import { isSupabaseConfigured, supabase } from './client'

/** Public bucket – upload files with these exact names in Supabase Dashboard */
export const HERO_VIDEO_BUCKET = 'hero-videos'

export const HERO_VIDEO_FILES = ['hero-1.mp4', 'hero-2.mp4', 'hero-3.mp4']

/** Only this file is included in the Git/Vercel deploy (others are gitignored as too large) */
const BUNDLED_HERO_VIDEOS = new Set(['hero-3.mp4'])

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

function canServeLocalFile(fileName) {
  return !import.meta.env.PROD || BUNDLED_HERO_VIDEOS.has(fileName)
}

function localSlide(name) {
  const local = `/videos/${name}`
  return { id: name, src: local, fallback: null }
}

async function listStorageHeroVideos() {
  const available = new Set()

  if (!isSupabaseConfigured || !supabase) return available

  const { data: files, error } = await supabase.storage.from(HERO_VIDEO_BUCKET).list('', {
    limit: 20,
    sortBy: { column: 'name', order: 'asc' },
  })

  if (!error) {
    for (const f of files ?? []) {
      if (f.name && f.name.endsWith('.mp4') && !f.name.startsWith('.')) {
        available.add(f.name)
      }
    }
  }

  return available
}

/**
 * Each slide: { id, src, fallback }
 * - Production (Vercel): hero-1/hero-2 must be in Supabase Storage (not in git).
 * - Development: local public/videos/ works for all files.
 */
export async function resolveHeroSlides() {
  const fromEnv = parseEnvHeroVideos()
  if (fromEnv) {
    return fromEnv.map((src, i) => ({ id: `env-${i}`, src, fallback: null }))
  }

  const storageAvailable = await listStorageHeroVideos()

  const slides = HERO_VIDEO_FILES.map((name) => {
    const local = `/videos/${name}`
    const storageUrl = getHeroVideoPublicUrl(name)
    const inStorage = storageAvailable.has(name)

    if (inStorage && storageUrl) {
      return {
        id: name,
        src: storageUrl,
        fallback: canServeLocalFile(name) ? local : null,
      }
    }

    if (canServeLocalFile(name)) {
      return { id: name, src: local, fallback: null }
    }

    return null
  }).filter(Boolean)

  if (slides.length > 0) return slides

  return getLocalHeroSlides().filter((s) => canServeLocalFile(s.id))
}

/** @deprecated Use resolveHeroSlides */
export async function resolveHeroVideoUrls() {
  const slides = await resolveHeroSlides()
  return slides.map((s) => s.src)
}

export function getLocalHeroSlides() {
  return HERO_VIDEO_FILES.map((name) => localSlide(name))
}
