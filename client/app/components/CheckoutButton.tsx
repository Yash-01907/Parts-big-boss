"use client";

import { useState } from "react";
import Script from "next/script";
import { Loader2, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { api } from "../axios/axiosConfig";
import { useCartTotal } from "../store/useCartStore";

interface CheckoutButtonProps {
  addressId: string | null;
  disabled?: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutButton({
  addressId,
  disabled,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const totalAmount = useCartTotal(); // Total in paise

  const handlePayment = async () => {
    if (!addressId) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Order
      const { data: orderData } = await api.post("/api/payment/create-order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use env variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Parts Big Boss",
        description: "Automotive Parts Checkout",
        image: "/logo.png", // Add your logo path here
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // 2. Verify Payment
            const verifyRes = await api.post("/api/payment/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              addressId, // Pass the address ID to finalize the order
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful! Order placed.");
              // Redirect to success page or clear cart
              window.location.href = "/orders";
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name", // User data could be passed here
          contact: "9999999999", // User phone
        },
        theme: {
          color: "#000000", // Black theme
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast("Payment cancelled");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initiate payment",
      );
      setLoading(false);
    }
  };

  if (totalAmount === 0) return null;

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* Sticky Bottom Bar - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none z-50">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Total Amount Display */}
          <div className="flex flex-col md:hidden">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
              Total to Pay
            </span>
            <span className="text-lg font-bold text-zinc-900">
              ₹{(totalAmount / 100).toFixed(2)}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handlePayment}
            disabled={loading || disabled || !addressId}
            className={`
              relative flex-1 md:w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 
              text-base font-bold text-white shadow-lg transition-all active:scale-[0.98]
              ${
                loading || disabled
                  ? "bg-zinc-400 cursor-not-allowed"
                  : "bg-black hover:bg-zinc-800 shadow-zinc-200"
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="hidden md:inline">
                  Pay ₹{(totalAmount / 100).toFixed(2)}
                </span>
                <span className="md:hidden">Proceed to Pay</span>
                <ShieldCheck size={18} className="opacity-80" />
              </>
            )}

            {/* Glossy Effect Overlay */}
            {!loading && !disabled && (
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
            )}
          </button>
        </div>

        {/* Trust Badge - Mobile Only */}
        <div className="flex justify-center mt-3 md:hidden">
          <p className="text-[10px] text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck size={12} />
            100% Secure Payments via Razorpay
          </p>
        </div>
      </div>
    </>
  );
}
