import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSearch } from 'react-icons/hi'
import TourGrid from '../components/TourGrid'
import { TourGridSkeleton } from '../components/TourCardSkeleton'
import CategoryPills from '../components/CategoryPills'
import TourStats from '../components/TourStats'
import SectionHeader from '../components/ui/SectionHeader'
import { DEMO_TOURS, matchesTourCategory, withDefaultRating } from '../data/demoTours'
import { fetchTours } from '../supabase/inquiryService'

export default function Tours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingDemo, setUsingDemo] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await fetchTours()
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
    return tours.filter((tour) => {
      const matchesSearch = tour.title.toLowerCase().includes(search.toLowerCase())
      const matchesCat = matchesTourCategory(tour, category)
      return matchesSearch && matchesCat
    })
  }, [tours, search, category])

  return (
    <div className="page-shell section-padding-sm pb-20 lg:pb-24">
      <div className="section-container">
        <SectionHeader
          badge="Destinations"
          title="Explore Our Tours"
          description="Find your perfect getaway from beaches to mountains and cultural wonders."
        />

        <div className="mt-10">
          <TourStats />
        </div>

        <div className="mt-10 card-surface p-4 sm:p-5">
          <div className="relative">
            <HiSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-voyra-muted"
              size={20}
            />
            <input
              type="search"
              placeholder="Search tours by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <div className="mt-4 border-t border-voyra-sky pt-4">
            <CategoryPills active={category} onChange={setCategory} />
          </div>
        </div>

        {usingDemo && !loading && (
          <p className="mt-4 text-center text-xs text-voyra-muted">
            Showing featured destinations - connect Supabase to load live tours.
          </p>
        )}

        <div className="mt-10">
          {loading ? (
            <TourGridSkeleton count={6} />
          ) : (
            <TourGrid tours={filtered} emptyVariant="filter" />
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
