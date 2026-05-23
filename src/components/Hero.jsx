import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InquiryLink from './InquiryLink'
import { motion } from 'framer-motion'

const HERO_VIDEOS = [
  '/videos/hero-1.mp4',
  '/videos/hero-2.mp4',
  '/videos/hero-3.mp4',
]

const ROTATE_MS = 8000

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [failedVideos, setFailedVideos] = useState(() => new Set())
  const videoRefs = useRef([])

  const playableIndices = HERO_VIDEOS.map((_, i) => i).filter((i) => !failedVideos.has(i))

  const safeActiveIndex = playableIndices.includes(activeIndex)
    ? activeIndex
    : playableIndices[0] ?? 0

  const markFailed = useCallback((index) => {
    setFailedVideos((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  useEffect(() => {
    if (playableIndices.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const currentPos = playableIndices.indexOf(prev)
        const nextPos = currentPos === -1 ? 0 : (currentPos + 1) % playableIndices.length
        return playableIndices[nextPos]
      })
    }, ROTATE_MS)

    return () => clearInterval(interval)
  }, [playableIndices.join(',')])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video || failedVideos.has(index)) return

      if (index === safeActiveIndex) {
        video.currentTime = 0
        video.play().catch(() => markFailed(index))
      } else {
        video.pause()
      }
    })
  }, [safeActiveIndex, failedVideos, markFailed])

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-voyra-navy">
      <div className="absolute inset-0">
        {HERO_VIDEOS.map((src, index) => {
          if (failedVideos.has(index)) return null

          return (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              src={src}
              autoPlay={index === safeActiveIndex}
              muted
              playsInline
              loop
              preload={index === 0 ? 'auto' : 'metadata'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === safeActiveIndex ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={index !== safeActiveIndex}
              onError={() => markFailed(index)}
              onCanPlay={(e) => {
                if (index === safeActiveIndex) {
                  e.currentTarget.play().catch(() => markFailed(index))
                }
              }}
            />
          )
        })}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.25)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[85vh] items-center">
        <div className="section-container w-full py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl px-4 text-center"
          >
            <span className="inline-block rounded-full border border-white/30 bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-voyra-orange shadow-lg">
              Explore Beyond Limits
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.75)] sm:text-5xl lg:text-[3.25rem]">
              Discover your next journey with Voyra
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              From sun-kissed beaches to mountain peaks - find curated tours, verified destinations, and seamless booking inquiries.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/tours" className="btn-primary shadow-[0_8px_24px_rgba(255,122,0,0.45)]">
                Explore Tours
              </Link>
              <InquiryLink className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-6 py-3 text-sm font-bold text-voyra-navy shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all hover:bg-voyra-sky hover:shadow-lg">
                Send Inquiry
              </InquiryLink>
            </div>

            {playableIndices.length > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {HERO_VIDEOS.map((_, index) => {
                  if (failedVideos.has(index)) return null
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show video ${index + 1}`}
                      className={`rounded-full shadow-md ring-2 ring-black/30 transition-all duration-300 ${
                        index === safeActiveIndex
                          ? 'h-2.5 w-7 bg-voyra-orange'
                          : 'h-2.5 w-2.5 bg-white'
                      }`}
                    />
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
