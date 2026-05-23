import { HiCheck, HiX } from 'react-icons/hi'

function ListSection({ title, icon: Icon, iconClass, items, variant = 'included' }) {
  if (!items?.length) return null

  return (
    <div className="card-surface p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-voyra-navy">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon size={18} />
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-voyra-muted">
            <Icon
              size={18}
              className={`mt-0.5 shrink-0 ${variant === 'included' ? 'text-emerald-500' : 'text-red-400'}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TourDetailContent({ tour }) {
  return (
    <div className="mt-10 space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <ListSection
          title="Package Includes"
          icon={HiCheck}
          iconClass="bg-emerald-50 text-emerald-600"
          items={tour.packageIncludes}
          variant="included"
        />
        <ListSection
          title="Not Included"
          icon={HiX}
          iconClass="bg-red-50 text-red-500"
          items={tour.notIncluded}
          variant="excluded"
        />
      </div>

      {tour.itinerary?.length > 0 && (
        <div className="card-surface p-6">
          <h3 className="text-lg font-semibold text-voyra-navy">Itinerary</h3>
          <div className="mt-6 space-y-0">
            {tour.itinerary.map((item, index) => (
              <div
                key={item.day}
                className={`relative flex gap-4 pb-8 ${
                  index < tour.itinerary.length - 1
                    ? 'border-l-2 border-voyra-orange/30 pl-6 ml-3'
                    : 'pl-6 ml-3'
                }`}
              >
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-voyra-orange shadow-sm" />
                <div>
                  <p className="text-sm font-bold text-voyra-orange">{item.day}</p>
                  <p className="mt-0.5 font-medium text-voyra-navy">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tour.highlights?.length > 0 && (
        <div className="card-surface bg-gradient-to-br from-voyra-sky/80 to-white p-6">
          <h3 className="text-lg font-semibold text-voyra-navy">Highlights</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {tour.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-medium text-voyra-navy shadow-sm backdrop-blur-sm"
              >
                ✦ {highlight}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
