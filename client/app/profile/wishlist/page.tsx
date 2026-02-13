"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Tag } from "lucide-react";
// Import the specific Wishlist Card
import WishlistProductCard from "./wishlistCard";
import { Product } from "../../types/product";
import { useCartStore } from "@/app/store/useCartStore";

const SUGGESTED_CATEGORIES = [
  "Engine Oil",
  "Wiper Blades",
  "Car Mats",
  "LED Bulbs",
];

export default function WishlistPage() {
  const { items, removeItem } = useCartStore();
  const hasItems = items.length > 0;

  // Handler to sync removal with backend
  const handleRemoveItem = (id: string | number) => {
    removeItem(Number(id));
  };

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-[var(--background)] p-4 lg:p-8 rounded-xl flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          My Cart Items
        </h1>
        <p className="text-[var(--text-secondary)]">
          Items currently in your cart
        </p>
      </div>

      {hasItems ? (
        <div className="space-y-4">
          <div className="grid grid-rows-1 lg:grid-cols-1 gap-4">
            {items.map((item) => (
              <WishlistProductCard
                key={item.productId}
                product={{
                  id: item.productId,
                  title: item.title,
                  price: item.price,
                  part_number: "N/A", // Not available in cart item
                  image_url: item.image,
                  category: "Cart Item",
                  slug: "", // Not available
                  rating: 0,
                  rating_count: 0,
                }}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[var(--border)] rounded-3xl bg-[var(--surface)]"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-muted)] mb-6">
            <Heart size={40} />
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Your cart is empty
          </h3>
          <p className="text-[var(--text-secondary)] max-w-xs mb-8">
            Start adding parts to your cart. Here are some popular categories:
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {SUGGESTED_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/search?q=${cat}`}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
