// =============================================================================
// PROFILE LOADING SKELETON
// Matches the Bento Grid layout exactly for seamless loading
// =============================================================================

export default function ProfileLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-zinc-50/30 p-4 lg:p-6 rounded-xl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header Skeleton */}
        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar Skeleton */}
            <div className="h-20 w-20 rounded-2xl bg-zinc-200 animate-pulse" />

            {/* Info Skeleton */}
            <div className="flex-1 space-y-3">
              <div className="h-7 w-48 bg-zinc-200 rounded-lg animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 w-32 bg-zinc-100 rounded animate-pulse" />
                <div className="h-4 w-40 bg-zinc-100 rounded animate-pulse" />
              </div>
            </div>

            {/* Status Skeleton */}
            <div className="hidden lg:block space-y-2">
              <div className="h-3 w-20 bg-zinc-100 rounded animate-pulse ml-auto" />
              <div className="h-8 w-24 bg-zinc-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stats Bento Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200/60 bg-white p-5 lg:p-6"
            >
              {/* Icon Skeleton */}
              <div className="h-11 w-11 rounded-xl bg-zinc-100 animate-pulse mb-4" />

              {/* Title Skeleton */}
              <div className="h-3 w-16 bg-zinc-100 rounded animate-pulse mb-2" />

              {/* Value Skeleton */}
              <div className="h-9 w-12 bg-zinc-200 rounded-lg animate-pulse mb-2" />

              {/* Subtitle Skeleton */}
              <div className="h-3 w-20 bg-zinc-100 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Orders Preview Skeleton */}
          <div className="rounded-2xl border border-zinc-200/60 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <div className="space-y-2">
                <div className="h-5 w-28 bg-zinc-200 rounded animate-pulse" />
                <div className="h-3 w-36 bg-zinc-100 rounded animate-pulse" />
              </div>
              <div className="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
            </div>

            {/* Order Items Skeleton */}
            <div className="p-3 space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50/50"
                >
                  {/* Icon */}
                  <div className="h-11 w-11 rounded-xl bg-zinc-200/80 animate-pulse" />

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-zinc-200 rounded animate-pulse" />
                      <div className="h-5 w-16 bg-zinc-100 rounded-full animate-pulse" />
                    </div>
                    <div className="h-3 w-32 bg-zinc-100 rounded animate-pulse" />
                  </div>

                  {/* Amount */}
                  <div className="h-5 w-16 bg-zinc-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Skeleton */}
          <div className="rounded-2xl border border-zinc-200/60 bg-white overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100">
              <div className="h-5 w-28 bg-zinc-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-40 bg-zinc-100 rounded animate-pulse" />
            </div>

            {/* Actions Skeleton */}
            <div className="p-2 space-y-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-zinc-200 rounded animate-pulse" />
                    <div className="h-3 w-36 bg-zinc-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-100">
              <div className="h-4 w-40 bg-zinc-100 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>

        {/* Bottom Section Skeleton (Garage) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Vehicle Card */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-200/60 bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-zinc-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse" />
                <div className="h-3 w-48 bg-zinc-100 rounded animate-pulse" />
              </div>
              <div className="h-9 w-24 bg-zinc-100 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Add Vehicle */}
          <div className="rounded-2xl border-2 border-dashed border-zinc-200/80 bg-zinc-50/50 p-6 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
