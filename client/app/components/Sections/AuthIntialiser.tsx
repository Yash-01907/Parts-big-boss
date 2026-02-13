"use client";

import { useEffect } from "react";
import { bootstrapAuth } from "../../store/bootstrapAuth";
import { cartStore } from "../../store/useCartStore";

export default function AuthInitializer() {
  useEffect(() => {
    bootstrapAuth();
    cartStore.fetchCart();
  }, []);

  return null; // This component renders nothing, just runs logic
}
