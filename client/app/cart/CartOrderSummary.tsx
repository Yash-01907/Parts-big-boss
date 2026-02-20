"use client";
import { useState, useEffect } from "react";
import { useCartStore, useCartTotal } from "../store/useCartStore";
import CheckoutButton from "../components/CheckoutButton";

interface CartOrderSummaryProps {
  selectedAddressId: string | null;
  canCheckout: boolean;
}

export default function CartOrderSummary({
  selectedAddressId,
  canCheckout,
}: CartOrderSummaryProps) {
  const total = useCartTotal();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) {
    return null;
  }

  // Example shipping logic (could be more complex)
  const shipping = total > 50000 ? 0 : 500;
  const tax = total * 0.18; // 18% GST Example

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 lg:sticky lg:top-32">
      <h2 className="text-lg font-bold text-zinc-900 mb-6 font-display">
        Order Summary
      </h2>

      <dl className="space-y-4 text-sm mb-6">
        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">Subtotal</dt>
          <dd className="font-medium text-zinc-900">
            ₹{(total / 100).toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">Shipping Estimate</dt>
          <dd className="font-medium text-zinc-900">
            {shipping === 0 ? "Free" : `₹${(shipping / 100).toFixed(2)}`}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">Tax Estimate (18%)</dt>
          <dd className="font-medium text-zinc-900">Wait for checkout</dd>
        </div>

        <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
          <dt className="text-base font-bold text-zinc-900">Order Total</dt>
          <dd className="text-base font-bold text-zinc-900">
            ₹{((total + shipping) / 100).toFixed(2)}
          </dd>
        </div>
      </dl>

      <CheckoutButton addressId={selectedAddressId} disabled={!canCheckout} />

      <p className="mt-4 text-center text-xs text-zinc-500">
        Shipping & taxes calculated at checkout
      </p>
    </div>
  );
}
