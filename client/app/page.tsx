"use client";

import { useState } from "react";
import VehicleSelector from "./components/VehicleSelector";
import ProductCard from "./components/ProductCard";
import { Product } from "./types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Find the Right Parts
          </h1>
          <p className="mt-3 text-xl text-blue-200">
            Select your vehicle to see compatible components.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <VehicleSelector
            onSearchResults={(results) => {
              setProducts(results);
              setHasSearched(true);
            }}
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {!hasSearched && (
          <div className="text-center text-gray-500 mt-10">
            <h3 className="text-lg font-medium">Ready to search?</h3>
            <p>Select your vehicle above to find parts.</p>
          </div>
        )}

        {hasSearched && products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-800">
              No parts found
            </h3>
            <p className="text-gray-600 mt-2">
              Try a different make, model, or year.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
