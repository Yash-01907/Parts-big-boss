"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { cartStore } from "../store/useCartStore";
import { CartItem } from "../types/cart";

interface CartProductCardProps {
  item: CartItem;
}

export default function CartProductCard({ item }: CartProductCardProps) {
  const { updateQuantity, removeItem } = cartStore;

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      removeItem(item.productId);
    } else {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  return (
    <li className="p-3 flex flex-row gap-6 items-center border-b border-zinc-100 last:border-0">
      {/* Image */}
      <div className="relative h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
        <Image
          src={item.image || "/Product/p1.png"}
          alt={item.title}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start gap-x-4">
          {/* Product Title & Meta */}
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="text-sm md:text-base font-semibold text-zinc-950 line-clamp-2">
              <Link
                href={`/product/${item.productId}`}
                className="hover:opacity-70 transition-opacity"
              >
                {item.title}
              </Link>
            </h3>
            <p className="text-xs text-zinc-500 font-medium">
              Unit Price: ₹{(item.price / 100).toFixed(2)}
            </p>
          </div>

          {/* Price & Controls Stack */}
          <div className="flex flex-col items-end gap-y-3">
            <p className="text-lg font-bold text-zinc-950 leading-none">
              ₹{((item.price * item.quantity) / 100).toFixed(2)}
            </p>

            <div className="flex items-center rounded-md border border-zinc-200 bg-white shadow-sm h-8">
              <button
                type="button"
                onClick={handleDecrease}
                className="h-full px-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-colors flex items-center justify-center border-r border-zinc-100"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-zinc-900">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="h-full px-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 transition-colors flex items-center justify-center border-l border-zinc-100"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
