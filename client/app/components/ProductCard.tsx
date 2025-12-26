"use client";

import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price / 100); // price in cents

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      
      {/* Image */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url || "https://placehold.co/400x300?text=No+Image"}
          alt={product.title}
          className="object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Part #: <span className="font-medium">{product.part_number}</span>
        </p>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formattedPrice}
          </span>

          <button
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
