export default function TourCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-lg">
      <div className="h-64 bg-voyra-sky/80" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded-lg bg-voyra-sky" />
        <div className="h-4 w-1/2 rounded-lg bg-voyra-sky" />
        <div className="flex justify-between pt-2">
          <div className="h-9 w-24 rounded-lg bg-voyra-sky" />
          <div className="h-10 w-28 rounded-xl bg-voyra-sky" />
        </div>
      </div>
    </div>
  )
}

export function TourGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  )
}
