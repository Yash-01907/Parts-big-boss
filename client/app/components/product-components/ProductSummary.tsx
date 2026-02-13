import { Shield, Star, Truck, Lock, Headphones } from "lucide-react";
import { ProductDetail } from "@/app/types/product";
import AddToCartPanel from "./AddToCartPanel";

interface ProductSummaryProps {
  product: ProductDetail;
  inStock: boolean;
  formattedPrice: string;
}

export default function ProductSummary({
  product,
  inStock,
  formattedPrice,
}: ProductSummaryProps) {
  return (
    <div className="lg:sticky lg:top-32 space-y-4 border-2 rounded-xl p-6 border-gray-100 ">
      {/* Subtle Meta Row */}
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {product.attributes?.brand && (
          <span className="text-gray-900 border-b-2 border-gray-900 pb-0.5">
            {product.attributes.brand}
          </span>
        )}
        {product.attributes?.brand && product.part_number && <span>•</span>}
        {product.part_number && (
          <span className="font-mono">P/N {product.part_number}</span>
        )}
      </div>

      {/* Clean Hero Title */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
          {product.title}
        </h1>

        {/* Rating Row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-amber-400">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} className="text-gray-200" fill="currentColor" />
          </div>
          <span className="text-xs font-bold text-gray-400">(128 reviews)</span>
        </div>
      </div>

      {/* Modern Price Section moved to AddToCartPanel */}

      {/* Add to Cart Panel */}
      <div className="pt-2">
        <AddToCartPanel
          productId={product.id}
          productTitle={product.title}
          price={product.price}
          stockCount={product.stock_count}
          inStock={inStock}
          image={product.image_url || "/placeholder.png"}
        />
      </div>

      {/* Trust Badges Row - Full Filling Look */}
      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-50">
        <div className="flex flex-col items-center text-center gap-1.5">
          <Truck size={18} className="text-gray-400" strokeWidth={1.5} />
          <span className="text-[9px] font-bold text-gray-500 uppercase leading-tight">
            Free Shipping
            <br />& Returns
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <Shield size={18} className="text-gray-400" strokeWidth={1.5} />
          <span className="text-[9px] font-bold text-gray-500 uppercase leading-tight">
            Lifetime
            <br />
            Warranty
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <Lock size={18} className="text-gray-400" strokeWidth={1.5} />
          <span className="text-[9px] font-bold text-gray-500 uppercase leading-tight">
            Secure
            <br />
            Checkout
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <Headphones size={18} className="text-gray-400" strokeWidth={1.5} />
          <span className="text-[9px] font-bold text-gray-500 uppercase leading-tight">
            Expert
            <br />
            Support
          </span>
        </div>
      </div>
    </div>
  );
}
