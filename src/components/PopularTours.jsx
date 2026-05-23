import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TourGrid from './TourGrid'
import { TourGridSkeleton } from './TourCardSkeleton'
import CategoryPills from './CategoryPills'
import TourStats from './TourStats'
import SectionHeader from './ui/SectionHeader'
import { DEMO_TOURS, matchesTourCategory, withDefaultRating } from '../data/demoTours'
import { fetchTours } from '../supabase/inquiryService'

export default function PopularTours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await fetchTours({ limit: 12 })
      if (!error && data?.length > 0) {
        setTours(data.map((t, i) => withDefaultRating(t, i)))
        setUsingDemo(false)
      } else {
        setTours(DEMO_TOURS)
        setUsingDemo(true)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return tours.filter((tour) => matchesTourCategory(tour, category))
  }, [tours, category])

  return (
    <section className="section-block bg-gradient-to-b from-white via-voyra-sky/50 to-white pt-24 lg:pt-32">
      <div className="section-container">
        <TourStats />

        <div className="section-content-gap flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="Featured"
            title="Popular Tours"
            description="Handpicked adventures loved by travelers worldwide."
            align="left"
            className="!mt-0"
          />
          <Link to="/tours" className="text-link shrink-0">
            View all tours →
          </Link>
        </div>

        <div className="mt-8">
          <CategoryPills active={category} onChange={setCategory} />
        </div>

        {usingDemo && !loading && (
          <p className="mt-4 rounded-xl bg-white/80 px-4 py-2 text-center text-xs text-voyra-muted">
            Showing featured destinations - connect Supabase to load live tours.
          </p>
        )}

        <div className="mt-10">
          {loading ? (
            <TourGridSkeleton count={6} />
          ) : (
            <TourGrid tours={filtered} emptyVariant={usingDemo ? 'filter' : 'coming-soon'} />
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/tours" className="btn-primary">
            Explore More Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}
