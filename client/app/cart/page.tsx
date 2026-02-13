"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import {
  useCartStore,
  useCartItems,
  useCartTotal,
  cartStore,
} from "../store/useCartStore";
import Navbar from "../components/Sections/Navbar";

export default function CartPage() {
  const items = useCartItems();
  const total = useCartTotal();
  const { isLoading } = useCartStore();
  const { fetchCart, updateQuantity, removeItem } = cartStore;

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm text-center">
            Looks like you haven't added any parts to your cart yet.
          </p>
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <ul role="list" className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li
                      key={item.productId}
                      className="p-6 flex flex-col sm:flex-row gap-6"
                    >
                      {/* Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        <Image
                          src={item.image || "/Product/p1.png"}
                          alt={item.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="relative flex justify-between gap-x-6 sm:pr-0">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                              <Link
                                href={`/product/${item.productId}`}
                                className="hover:underline"
                              >
                                {item.title}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Unit Price: ₹{(item.price / 100).toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{((item.price * item.quantity) / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:pr-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-lg border border-gray-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                )
                              }
                              className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center text-sm font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              className="p-2 text-gray-600 hover:text-black hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-32">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <dl className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      ₹{(total / 100).toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Shipping Estimate</dt>
                    <dd className="font-medium text-gray-900">
                      Calculated at checkout
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Tax Estimate</dt>
                    <dd className="font-medium text-gray-900">
                      Calculated at checkout
                    </dd>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <dt className="text-base font-bold text-gray-900">
                      Order Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900">
                      ₹{(total / 100).toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-transparent bg-black px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all active:scale-[0.98]"
                  >
                    Checkout <ArrowRight size={18} />
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
