"use client";

import { useCartItems } from "../store/useCartStore";
import CartProductCard from "../components/CartProductCard";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartItemsList() {
  const items = useCartItems();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-zinc-200">
        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag size={32} className="text-zinc-400" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-zinc-500 mb-6 text-center max-w-sm">
          Looks like you haven't added any parts to your cart yet.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      <ul role="list" className="divide-y divide-zinc-100">
        {items.map((item) => (
          <CartProductCard key={item.productId} item={item} />
        ))}
      </ul>
    </div>
  );
}
