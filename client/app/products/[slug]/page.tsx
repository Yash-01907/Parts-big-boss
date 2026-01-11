import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/app/components/Sections/Navbar";
import Footer from "@/app/components/Sections/Footer";
import { ProductDetail } from "@/app/types/product";
import ProductGallery from "@/app/components/product-components/ProductGallery";
import ProductSummary from "@/app/components/product-components/ProductSummary";
import CompatibilityTable from "@/app/components/product-components/CompatibilityTable";
import RelatedProducts from "@/app/components/product-components/RelatedProducts";
import ProductInfoTabs from "@/app/components/product-components/ProductInfoTabs";
import Breadcrumbs from "@/app/components/product-components/Breadcrumbs";

// Server-side data fetching
async function getProduct(slug: string): Promise<ProductDetail | null> {
  console.log(slug);
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${API_URL}/api/products/${slug}`, {
      cache: "no-store",
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    console.log(response);
    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  console.log(product);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const formattedPrice = (product.price / 100).toFixed(2);
  const inStock = product.stock_count > 0;

  // Build compatible vehicles string for title
  const vehicleInfo = product.compatible_vehicles?.[0]
    ? ` | ${product.compatible_vehicles[0].make_name} ${product.compatible_vehicles[0].model_name}`
    : "";

  return {
    title: `${product.title} – Part #${product.part_number}${vehicleInfo} | PartsBigBoss`,
    description: `Buy ${product.title} (${
      product.part_number
    }) at ₹${formattedPrice}. ${
      product.attributes?.brand ? `Brand: ${product.attributes.brand}.` : ""
    } ${inStock ? "In stock" : "Currently unavailable"} and ready to ship.`,
    openGraph: {
      title: product.title,
      description: `${product.part_number} - ₹${formattedPrice}`,
      images: product.image_url ? [product.image_url] : [],
      type: "product",
    },
    other: {
      "product:price:amount": formattedPrice,
      "product:price:currency": "INR",
      "product:availability": inStock ? "in stock" : "out of stock",
      "product:condition": "new",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const something = await params;
  console.log(something.slug);
  const product = await getProduct(something.slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stock_count > 0;
  const formattedPrice = (product.price / 100).toFixed(2);

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image_url,
    description: `${product.title} (Part Number: ${product.part_number})`,
    sku: product.part_number,
    mpn: product.part_number,
    brand: {
      "@type": "Brand",
      name: product.attributes?.brand || "Generic",
    },
    offers: {
      "@type": "Offer",
      url: `https://partsbigboss.com/products/${product.slug}`,
      priceCurrency: "INR",
      price: formattedPrice,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    category: product.category_name,
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-7 pt-20 pb-20">
        {/* Breadcrumb - Clean & Minimal */}
        <Breadcrumbs
          className="mb-12"
          items={[
            ...(product.category_name
              ? [
                  {
                    label: product.category_name,
                    href: `/search?category_slug=${product.category_slug}`,
                  },
                ]
              : []),
            { label: product.title },
          ]}
        />

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center xl:gap-24 mb-12 py-2 bg-[var(--surface)] px-4 rounded-xl">
          {/* Gallery Area */}
          <div className="w-full md:w-[60%]">
            <ProductGallery
              images={product.image_url ? [product.image_url] : []}
              productName={product.title}
            />
          </div>

          {/* Summary Area */}
          <div className="w-full md:w-[40%]">
            <ProductSummary
              product={product}
              inStock={inStock}
              formattedPrice={formattedPrice}
            />
          </div>
        </div>

        {/* Content Sections Area */}
        <div className="space-y-24">
          {/* Product Tabs: Overview & Technical Details */}
          <ProductInfoTabs product={product} />

          {/* Fitment Matrix */}
          {product.compatible_vehicles &&
            product.compatible_vehicles.length > 0 && (
              <CompatibilityTable vehicles={product.compatible_vehicles} />
            )}
        </div>

        {/* Related Section */}
        <section className="mt-40 border-t border-gray-100 pt-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Recommended for You
            </h2>
            <Link
              href="/search"
              className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Search All Parts
            </Link>
          </div>
          <RelatedProducts
            categorySlug={product.category_slug}
            currentProductId={product.id}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
