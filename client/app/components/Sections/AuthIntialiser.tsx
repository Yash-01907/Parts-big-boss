"use client";

import { useEffect } from "react";
import { bootstrapAuth } from "../../store/bootstrapAuth";
import { cartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthInitializer() {
  const { isAuthenticated } = useAuthStore();

  // 1. Bootstrap auth on mount
  useEffect(() => {
    bootstrapAuth();
  }, []);

  // 2. Sync cart with auth state
  useEffect(() => {
    if (isAuthenticated) {
      cartStore.fetchCart();
    } else {
      cartStore.clearCart();
    }
  }, [isAuthenticated]);

  return null;
}
