import { HiOutlinePaperAirplane } from 'react-icons/hi'
import TourCard from './TourCard'

export default function TourGrid({ tours, emptyVariant = 'filter' }) {
  if (!tours.length) {
    if (emptyVariant === 'coming-soon') {
      return (
        <div className="rounded-3xl border border-white/30 bg-white/60 py-20 text-center backdrop-blur-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-voyra-sky text-voyra-orange">
            <HiOutlinePaperAirplane size={32} className="-rotate-45" />
          </div>
          <p className="mt-6 text-xl font-semibold text-voyra-navy">New adventures are coming soon</p>
          <p className="mt-2 text-sm text-voyra-muted">
            Check back later for amazing destinations.
          </p>
        </div>
      )
    }

    return (
      <div className="rounded-3xl border border-white/30 bg-white/60 py-16 text-center backdrop-blur-lg">
        <p className="text-lg font-semibold text-voyra-navy">No tours match your filters</p>
        <p className="mt-2 text-sm text-voyra-muted">Try a different category or search term.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
