import { isSupabaseConfigured, supabase } from './client'

/** Public bucket – upload files with these exact names in Supabase Dashboard */
export const HERO_VIDEO_BUCKET = 'hero-videos'

export const HERO_VIDEO_FILES = ['hero-1.mp4', 'hero-2.mp4', 'hero-3.mp4']

/** Only this file is included in the Git/Vercel deploy (others are gitignored as too large) */
const BUNDLED_HERO_VIDEOS = new Set(['hero-3.mp4'])

/**
 * Reliable CDN fallbacks for production (Mixkit blocks hotlinking with 403).
 * Override anytime by uploading your MP4s to Supabase Storage.
 */
const PRODUCTION_FALLBACK_SRC = {
  'hero-1.mp4':
    'https://cdn.coverr.co/videos/coverr-aerial-drone-shot-of-a-beautiful-coastline-5047/1080p.mp4',
  'hero-2.mp4':
    'https://cdn.coverr.co/videos/coverr-drone-footage-of-a-cascading-waterfall-4645/1080p.mp4',
  'hero-3.mp4':
    'https://cdn.coverr.co/videos/coverr-waves-coming-to-the-shore-1564/1080p.mp4',
}

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

/** Respects Vite `base` (e.g. GitHub Pages /VOYRA/). */
export function getLocalVideoPath(fileName) {
  const base = import.meta.env.BASE_URL || '/'
  const path = `${base}videos/${fileName}`.replace(/\/{2,}/g, '/')
  return path.startsWith('/') ? path : `/${path}`
}

function localSlide(name) {
  return { id: name, src: getLocalVideoPath(name), fallback: null }
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

async function storageFileExists(fileName, storageAvailable) {
  if (storageAvailable.has(fileName)) return true

  const url = getHeroVideoPublicUrl(fileName)
  if (!url) return false

  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

async function buildProductionSlide(name, storageAvailable) {
  const local = canServeLocalFile(name) ? getLocalVideoPath(name) : null
  const storageUrl = getHeroVideoPublicUrl(name)
  const remote = PRODUCTION_FALLBACK_SRC[name] ?? null
  const inStorage = await storageFileExists(name, storageAvailable)

  if (inStorage && storageUrl) {
    return {
      id: name,
      src: storageUrl,
      fallback: local || remote,
    }
  }

  if (local) {
    return {
      id: name,
      src: local,
      fallback: remote,
    }
  }

  if (remote) {
    return { id: name, src: remote, fallback: null }
  }

  return null
}

function buildDevelopmentSlide(name, storageAvailable) {
  const local = getLocalVideoPath(name)
  const storageUrl = getHeroVideoPublicUrl(name)
  const inStorage = storageAvailable.has(name)

  if (inStorage && storageUrl) {
    return { id: name, src: storageUrl, fallback: local }
  }

  return { id: name, src: local, fallback: storageUrl }
}

/**
 * Each slide: { id, src, fallback }
 * Production always returns 3 slides (bundled hero-3 + Coverr CDN for hero-1/2 until Storage upload).
 */
export async function resolveHeroSlides() {
  const fromEnv = parseEnvHeroVideos()
  if (fromEnv) {
    return fromEnv.map((src, i) => ({ id: `env-${i}`, src, fallback: null }))
  }

  const storageAvailable = await listStorageHeroVideos()
  const isProd = import.meta.env.PROD

  if (isProd) {
    const slides = await Promise.all(
      HERO_VIDEO_FILES.map((name) => buildProductionSlide(name, storageAvailable))
    )
    return slides.filter(Boolean)
  }

  return HERO_VIDEO_FILES.map((name) => buildDevelopmentSlide(name, storageAvailable))
}

/** @deprecated Use resolveHeroSlides */
export async function resolveHeroVideoUrls() {
  const slides = await resolveHeroSlides()
  return slides.map((s) => s.src)
}

export function getLocalHeroSlides() {
  return HERO_VIDEO_FILES.map((name) => localSlide(name))
}

/** Production-safe slides when async resolve fails */
export function getProductionHeroSlides() {
  return HERO_VIDEO_FILES.map((name) => {
    const local = canServeLocalFile(name) ? getLocalVideoPath(name) : null
    const remote = PRODUCTION_FALLBACK_SRC[name]
    return {
      id: name,
      src: local || remote,
      fallback: local && remote ? remote : null,
    }
  }).filter((s) => s.src)
}
