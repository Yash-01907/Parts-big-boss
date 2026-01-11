"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Heart, Share2 } from "lucide-react";

interface AddToCartPanelProps {
  productId: number;
  productTitle: string;
  price: number;
  stockCount: number;
  inStock: boolean;
}

export default function AddToCartPanel({
  productId,
  productTitle,
  price,
  stockCount,
  inStock,
}: AddToCartPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return Math.max(1, Math.min(stockCount, newQty));
    });
  };

  const handleAddToCart = async () => {
    if (!inStock) return;

    setIsAdding(true);
    try {
      // TODO: Implement actual cart API call
      console.log(`Adding ${quantity} of product ${productId} to cart`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success feedback
      alert(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Check out ${productTitle}`,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.log("Share failed:", err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
    console.log(
      `${isWishlisted ? "Removed from" : "Added to"} wishlist:`,
      productId
    );
  };

  return (
    <div className="space-y-6 ">
      {/* Dynamic Price Section */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              ₹{((price * quantity) / 100).toFixed(2)}
            </span>
            <span className="text-lg font-medium text-gray-400 line-through">
              ₹{((price * quantity * 1.2) / 100).toFixed(2)}
            </span>
          </div>
          {quantity > 1 && (
            <p className="text-sm font-medium text-gray-500 mt-1">
              ₹{(price / 100).toFixed(2)} each
            </p>
          )}
        </div>

        {inStock ? (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              In Stock
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 text-red-500 px-3 py-1.5 rounded-lg border border-red-100">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {inStock && (
          <div className="flex items-center gap-4">
            {/* Minimalist Quantity Stepper */}
            <div className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-white p-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="flex h-12 w-14 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-20"
              >
                <Minus size={20} strokeWidth={2.5} />
              </button>

              <span className="text-lg font-bold text-gray-900 w-12 text-center">
                {quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stockCount}
                className="flex h-12 w-14 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-black"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>

            <button
              onClick={handleShare}
              className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all"
              title="Share"
            >
              <Share2 size={24} />
            </button>
          </div>
        )}

        {/* Modern Primary CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
          className={`flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all ${
            inStock
              ? "bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          } ${isAdding ? "opacity-70 cursor-wait" : ""}`}
        >
          {isAdding ? (
            <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <ShoppingCart size={18} />
          )}
          <span>
            {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
          </span>
        </button>
      </div>

      {/* Subtle Bulk Indicator */}
    </div>
  );
}
