export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-line bg-white overflow-hidden animate-pulse">
      <div className="bg-line aspect-3/4 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-line rounded w-20" />
        <div className="h-4 bg-line rounded w-full" />
        <div className="h-4 bg-line rounded w-2/3" />
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-line rounded w-16" />
          <div className="h-3 bg-line rounded w-12" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonProductGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 animate-pulse">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <div className="h-3 bg-line rounded w-32" />
          <div className="space-y-3">
            <div className="h-8 bg-line rounded w-full" />
            <div className="h-8 bg-line rounded w-5/6" />
            <div className="h-8 bg-line rounded w-4/5" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-line rounded w-full" />
            <div className="h-4 bg-line rounded w-5/6" />
          </div>
          <div className="flex gap-3 pt-4">
            <div className="h-10 bg-line rounded w-32" />
            <div className="h-10 bg-line rounded w-32" />
          </div>
        </div>
        <div className="bg-line aspect-[4/5] max-h-[28rem] w-full rounded-lg" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-line rounded w-full" />
      ))}
    </div>
  )
}
