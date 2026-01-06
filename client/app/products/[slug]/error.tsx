"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--surface-hover)] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500" size={64} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          {error.message ||
            "The product you're looking for doesn't exist or has been removed."}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/search"
            className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
