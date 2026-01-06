import { Suspense } from "react";
import ProductCard from "@/app/components/product-components/ProductCardVertical";
import { Product } from "@/app/types/product";

interface RelatedProductsProps {
  categorySlug?: string;
  currentProductId: number;
}

async function getRelatedProducts(
  categorySlug?: string,
  currentProductId?: number
): Promise<Product[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const params = new URLSearchParams();

    if (categorySlug) {
      params.append("category_slug", categorySlug);
    }
    params.append("limit", "8");

    const response = await fetch(
      `${API_URL}/api/products/search?${params.toString()}`,
      {
        cache: "no-store",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const products = data.results || [];

    // Filter out current product
    return products
      .filter((p: Product) => p.id !== currentProductId)
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function RelatedProductsContent({
  categorySlug,
  currentProductId,
}: RelatedProductsProps) {
  const products = await getRelatedProducts(categorySlug, currentProductId);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        You May Also Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            name={product.title}
            partNumber={product.part_number}
            price={product.price / 100} // Convert from paise to rupees
            image={product.image_url}
            rating={product.rating || 0}
            reviewCount={product.rating_count || 0}
            inStock={true}
            brand={product.category || "Generic"}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default function RelatedProducts(props: RelatedProductsProps) {
  return (
    <Suspense fallback={<RelatedProductsSkeleton />}>
      <RelatedProductsContent {...props} />
    </Suspense>
  );
}
