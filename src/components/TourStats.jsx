import { HiStar } from 'react-icons/hi'

const stats = [
  { value: '10K+', label: 'Happy travelers' },
  { value: '120+', label: 'Destinations' },
  {
    value: (
      <span className="inline-flex items-center gap-1">
        4.9 <HiStar className="text-amber-400" size={20} />
      </span>
    ),
    label: 'Average rating',
  },
]

export default function TourStats({ className = '' }) {
  return (
    <div
      className={`card-surface grid grid-cols-1 divide-y divide-voyra-sky sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${className}`}
    >
      {stats.map(({ value, label }) => (
        <div key={label} className="px-6 py-5 text-center">
          <p className="text-2xl font-extrabold text-voyra-navy sm:text-3xl">{value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-voyra-muted">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
