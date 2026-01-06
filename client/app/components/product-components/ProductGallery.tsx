import Image from "next/image";
import { Package } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const hasImages = images.length > 0 && images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 border-2 rounded-xl p-4 border-black shadow-lg">
      {/* High-Fidelity Vertical Thumbnail Strip */}
      <div className="flex w-full md:w-auto md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto hide-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-16 w-16 md:h-24 md:w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
              index === 0
                ? "border-gray-900 shadow-sm"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
        {/* Placeholder thumbnails to ensure a 'full' UI appearance */}
        {images.length < 4 &&
          Array.from({ length: 4 - images.length }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="h-16 w-16 md:h-24 md:w-24 shrink-0 rounded-xl bg-gray-50 border border-dashed border-black flex items-center justify-center opacity-40"
            >
              <Package size={24} className="text-gray-300" />
            </div>
          ))}
      </div>

      {/* Main Art Showcase Container */}
      <div className="w-full md:flex-1">
        <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] group/gallery">
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-14">
            {hasImages ? (
              <div className="relative w-full h-full transition-transform duration-700">
                <Image
                  src={images[0]}
                  alt={productName}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ) : (
              <div className="text-gray-200 flex flex-col items-center">
                <Package size={100} strokeWidth={1} />
                <p className="text-[10px] font-black tracking-widest uppercase mt-4 text-gray-400">
                  Inventory Missing Image
                </p>
              </div>
            )}
          </div>

          <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
              Premium Quality
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
