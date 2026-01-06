"use client";

import { useState } from "react";
import ProductSpecs from "./ProductSpecs";
import ProductOverview from "./ProductOverview";
import { ProductDetail } from "@/app/types/product";
import { Info, Settings } from "lucide-react";
interface ProductInfoTabsProps {
  product: ProductDetail;
}

export default function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");

  return (
    <div className="space-y-8">
      {/* Sliding Tab Switcher - Centered for better aesthetics */}
      <div className="flex justify-center w-full mb-8">
        <div className="flex w-full md:w-[60%] border-b border-gray-200 relative">
          {/* The Sliding Line */}
          <div
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300 ease-in-out"
            style={{
              width: "50%",
              left: activeTab === "overview" ? "0%" : "50%",
            }}
          />

          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${
              activeTab === "overview"
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Product Overview
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${
              activeTab === "specs"
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Technical Details
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === "overview" ? (
          <ProductOverview title={product.title} />
        ) : (
          <ProductSpecs
            attributes={product.attributes || {}}
            partNumber={product.part_number}
            categoryName={product.category_name}
          />
        )}
      </div>
    </div>
  );
}
