import Navbar from "@/app/components/Sections/Navbar";
import Footer from "@/app/components/Sections/Footer";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface-hover)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Main Grid: Gallery + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Gallery skeleton - 7 columns */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Summary skeleton - 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Stock */}
            <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />

            {/* Quantity */}
            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-14 w-48 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <div className="h-14 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Specifications skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
