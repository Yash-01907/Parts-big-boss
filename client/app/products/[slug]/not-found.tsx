import Link from "next/link";
import { PackageX, Search, Home } from "lucide-react";
import Navbar from "@/app/components/Sections/Navbar";
import Footer from "@/app/components/Sections/Footer";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[var(--surface-hover)] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <PackageX className="text-gray-400" size={48} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Product Not Found
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or may have been
            removed. Please check the URL or browse our catalog.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Search size={20} />
              Browse Products
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              <Home size={20} />
              Go Home
            </Link>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-gray-500">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-[var(--accent)] hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
