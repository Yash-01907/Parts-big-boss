"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/app/axios/axiosConfig";
import Navbar from "@/app/components/Sections/Navbar";
import Footer from "@/app/components/Sections/Footer";
import ProductCard from "@/app/components/Products/ProductCardVertical";
import { Product } from "@/app/types/product";
import Loader from "@/app/components/Loader";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // The user specified endpoint: api/products/search/q={query}
        // But the server route is /api/products/search with query param q
        // API_BASE_URL is likely http://localhost:5000 from axiosConfig
        // so we call /products/search
        const response = await api.get(`api/products/search`, {
          params: {
            q: query,
            // Add default limit if needed, or let server handle it
            limit: 50,
          },
        });

        // Response structure: { count, limit, offset, results, filters }
        if (response.data && response.data.results) {
          setProducts(response.data.results);
          setCount(response.data.count);
        } else {
          setProducts([]);
          setCount(0);
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      // If no query, maybe clear products or fetch all?
      // For now, let's just clear.
      setProducts([]);
      setCount(0);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[var(--surface-hover)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            {query ? `Search Results for "${query}"` : "Search Products"}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {loading ? "Searching..." : `${count} products found`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader fullScreen={false} />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--text-secondary)]">
              No products found for your search.
            </p>
            <p className="mt-2 text-[var(--text-secondary)]">
              Try searching with different keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  id={product.id.toString()}
                  name={product.title}
                  partNumber={product.part_number}
                  price={product.price}
                  image={product.image_url}
                  rating={product.rating || 0}
                  reviewCount={product.rating_count || 0}
                  inStock={true}
                  brand={product.category || "Generic"}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchContent />
    </Suspense>
  );
}
