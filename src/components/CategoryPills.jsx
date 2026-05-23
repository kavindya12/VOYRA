import { TOUR_CATEGORIES } from '../data/demoTours'

export default function CategoryPills({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TOUR_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            active === cat
              ? 'bg-voyra-orange text-white shadow-md shadow-voyra-orange/25'
              : 'border border-voyra-sky bg-white text-voyra-navy hover:border-voyra-orange/40 hover:text-voyra-orange'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
