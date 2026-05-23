import { Link } from 'react-router-dom'
import { HiLocationMarker, HiStar } from 'react-icons/hi'
import { withDefaultRating } from '../data/demoTours'
import { getTourDetailPath } from '../supabase/tourMapper'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function TourBadge({ badge }) {
  if (!badge) return null

  const isTrending = badge === 'trending'
  return (
    <span
      className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold shadow-lg ${
        isTrending
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
          : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
      }`}
    >
      {isTrending ? '🔥 Trending' : '⭐ Best Seller'}
    </span>
  )
}

export default function TourCard({ tour }) {
  const t = withDefaultRating(tour)
  const detailPath = getTourDetailPath(t)
  const tourForNav = { ...t, id: t.slug || t.id }

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-voyra-sky/80 bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg">
      <Link to={detailPath} state={{ tour: tourForNav }} className="relative block h-64 overflow-hidden">
        <img
          src={t.image}
          alt={t.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <TourBadge badge={t.badge} />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-voyra-navy backdrop-blur-sm">
            <HiStar className="text-amber-400" size={14} />
            {t.rating}
          </span>
          {t.category && (
            <span className="rounded-full bg-voyra-orange/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {t.category}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={detailPath} state={{ tour: tourForNav }}>
          <h3 className="text-lg font-bold text-voyra-navy line-clamp-1 transition-colors group-hover:text-voyra-orange">
            {t.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-voyra-muted">
          <HiLocationMarker className="shrink-0 text-voyra-orange" size={16} />
          <span className="line-clamp-1">{t.location}</span>
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-voyra-muted">From</p>
            <p className="text-2xl font-bold text-voyra-orange">{formatPrice(t.price)}</p>
          </div>
          <Link
            to={detailPath}
            state={{ tour: tourForNav }}
            className="btn-primary shrink-0 px-4 py-2.5 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
