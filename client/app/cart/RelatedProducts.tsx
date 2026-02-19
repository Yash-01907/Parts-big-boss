"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";
import { Product } from "../types/product";
import { fetchFeaturedProducts } from "../Data/productInfo";

export default function RelatedProducts() {
  const { items } = useCartStore();
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRelated() {
      // In a real application, you would pass the item IDs to the server to get recommendations.
      // For now, we will fetch featured products and filter out the ones already in the cart.
      setLoading(true);
      const allFeatured = await fetchFeaturedProducts();

      const cartIds = new Set(items.map((i) => i.productId));
      const filtered = allFeatured
        .filter((p) => !cartIds.has(p.id))
        .slice(0, 4); // Limit to 4

      setRelated(filtered);
      setLoading(false);
    }

    if (items.length > 0) {
      getRelated();
    } else {
      // If cart is empty, show general popular items
      getRelated();
    }
  }, [items.length]); // Dependency on length changes (add/remove) - deeper dependency might cause loops if not careful

  if (loading)
    return (
      <div className="animate-pulse h-64 bg-zinc-100 rounded-xl mt-12 w-full"></div>
    );
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">
      <h3 className="text-xl font-bold text-zinc-900 mb-6">
        You might also like
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-zinc-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-zinc-50 rounded-lg overflow-hidden mb-4 relative">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                  No Image
                </div>
              )}
            </div>
            <h4 className="font-medium text-zinc-900 line-clamp-1 mb-1">
              <Link href={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">{product.part_number}</p>
              <p className="font-bold text-zinc-900">
                ₹{(product.price / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
