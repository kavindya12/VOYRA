import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiArrowLeft, HiStar } from 'react-icons/hi'
import InquiryForm from '../components/InquiryForm'
import TourDetailContent from '../components/TourDetailContent'
import TourPlaceGallery from '../components/TourPlaceGallery'
import { fetchTourById } from '../supabase/inquiryService'
import { resolveTourGallery } from '../supabase/googleImageService'
import {
  getDemoTourById,
  mergeWithDemoDetails,
  normalizeTourId,
  withDefaultRating,
} from '../data/demoTours'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function TourDetails() {
  const { id: rawId } = useParams()
  const id = normalizeTourId(rawId)
  const needsRedirect = Boolean(rawId && id && rawId !== id)

  const [tour, setTour] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (needsRedirect || !id) return

    let cancelled = false

    async function loadTour() {
      setLoading(true)
      setNotFound(false)

      try {
        const { data } = await fetchTourById(id)
        if (cancelled) return

        if (data) {
          setTour(withDefaultRating(data))
          setNotFound(false)
        } else {
          const demo = getDemoTourById(id)
          if (demo) {
            setTour(mergeWithDemoDetails(demo))
            setNotFound(false)
          } else {
            setTour(null)
            setNotFound(true)
          }
        }
      } catch {
        if (!cancelled) {
          const demo = getDemoTourById(id)
          if (demo) {
            setTour(mergeWithDemoDetails(demo))
            setNotFound(false)
          } else {
            setTour(null)
            setNotFound(true)
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }

      window.scrollTo(0, 0)
    }

    loadTour()

    return () => {
      cancelled = true
    }
  }, [id, needsRedirect])

  useEffect(() => {
    if (!tour) {
      setGalleryImages([])
      setGalleryLoading(false)
      return
    }

    let cancelled = false
    setGalleryLoading(true)

    resolveTourGallery(tour).then((images) => {
      if (!cancelled) {
        setGalleryImages(images)
        setGalleryLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [tour])

  if (needsRedirect) {
    return <Navigate to={`/tour/${id}`} replace />
  }

  if (!id) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="text-2xl font-bold text-voyra-navy">Tour not found</h1>
        <p className="mt-2 text-voyra-muted">Invalid tour link.</p>
        <Link to="/tours" className="btn-primary mt-6">
          Back to Tours
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="section-container py-12">
        <div className="animate-pulse space-y-6">
          <div className="aspect-[21/9] rounded-[1.25rem] bg-voyra-sky" />
          <div className="h-8 w-2/3 rounded-lg bg-voyra-sky" />
          <div className="h-4 w-1/3 rounded-lg bg-voyra-sky" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-voyra-sky" />
            <div className="h-4 w-full rounded bg-voyra-sky" />
            <div className="h-4 w-3/4 rounded bg-voyra-sky" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !tour) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="text-2xl font-bold text-voyra-navy">Tour not found</h1>
        <p className="mt-2 text-voyra-muted">This tour may have been removed or the link is incorrect.</p>
        <Link to="/tours" className="btn-primary mt-6">
          Back to Tours
        </Link>
      </div>
    )
  }

  return (
    <div className="page-shell pb-20">
      <div className="section-container pt-6 lg:pt-8">
        <Link
          to="/tours"
          className="inline-flex items-center gap-1.5 rounded-lg border border-voyra-sky bg-white px-3 py-2 text-sm font-semibold text-voyra-muted shadow-sm transition-colors hover:border-voyra-orange/30 hover:text-voyra-orange"
        >
          <HiArrowLeft size={18} />
          Back to Tours
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="section-container mt-6"
      >
        <div className="overflow-hidden rounded-3xl border border-voyra-sky/80 shadow-soft-lg">
          <img
            src={tour.image}
            alt={tour.title}
            className="aspect-[21/9] w-full object-cover"
          />
        </div>

        <TourPlaceGallery
          images={galleryImages}
          location={tour.location}
          loading={galleryLoading}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {tour.category && (
                    <span className="inline-block rounded-lg bg-voyra-sky px-3 py-1 text-xs font-semibold text-voyra-navy">
                      {tour.category}
                    </span>
                  )}
                  {tour.rating && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-voyra-navy">
                      <HiStar className="text-amber-400" size={14} />
                      {tour.rating} rating
                    </span>
                  )}
                  {tour.badge === 'trending' && (
                    <span className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-bold text-white">
                      🔥 Trending
                    </span>
                  )}
                  {tour.badge === 'bestseller' && (
                    <span className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                      ⭐ Best Seller
                    </span>
                  )}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-voyra-navy sm:text-4xl">{tour.title}</h1>
                <p className="mt-2 flex items-center gap-1 text-voyra-muted">
                  <HiLocationMarker className="text-voyra-orange" />
                  {tour.location}
                </p>
              </div>
              <div className="rounded-xl bg-voyra-orange px-5 py-3 text-white shadow-soft">
                <p className="text-xs font-medium opacity-90">From</p>
                <p className="text-2xl font-bold">{formatPrice(tour.price)}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-voyra-navy">About this tour</h2>
              <p className="mt-3 leading-relaxed text-voyra-muted">{tour.description}</p>
            </div>

            <TourDetailContent tour={tour} />
          </div>

          <div className="lg:col-span-2">
            <div className="card-glass sticky top-24 p-6 lg:p-7">
              <h2 className="text-xl font-bold text-voyra-navy">Book Your Inquiry</h2>
              <p className="mt-1 text-sm text-voyra-muted">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="mt-6">
                <InquiryForm tourName={tour.title} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
