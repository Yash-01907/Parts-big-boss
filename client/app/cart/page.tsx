import Link from "next/link";
import Navbar from "../components/Sections/Navbar";
import Footer from "../components/Sections/Footer";
import Breadcrumbs from "../components/product-components/Breadcrumbs";
import CartItemsList from "./CartItemsList";
import CartOrderSummary from "./CartOrderSummary";
import RelatedProducts from "./RelatedProducts";
import CheckoutSection from "./components/CheckoutSection";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* SSR Layout Wrapper */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-3">
          <Breadcrumbs items={[{ label: "Cart" }]} />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Cart Area */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl font-bold text-zinc-900 mb-8 font-display">
              Shopping Cart
            </h1>
            <CartItemsList />

            <div className="mt-8 pt-8">
              <CheckoutSection />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <CartOrderSummary />
          </div>
        </div>

        {/* Related Products Area */}
        <div className="mt-16">
          <RelatedProducts />
        </div>
      </main>

      <Footer />
    </div>
  );
}
