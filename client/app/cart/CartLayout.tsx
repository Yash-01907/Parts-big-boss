import { ReactNode } from "react";

interface CartLayoutProps {
  children: ReactNode;
  summary: ReactNode;
  related: ReactNode;
}

export default function CartLayout({
  children,
  summary,
  related,
}: CartLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>
          {children}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">{summary}</div>
      </div>

      {/* Related Products */}
      {related}
    </div>
  );
}
