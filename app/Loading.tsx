export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl p-4" aria-busy="true">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}