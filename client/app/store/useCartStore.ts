import { useSyncExternalStore } from "react";
import { api } from "../axios/axiosConfig";
import { CartItem, CartState } from "../types/cart";
import { toast } from "sonner";

// Use a relative URL for the API endpoint, assuming the proxy or base URL handles the host.
// If your axios config has a baseURL, this will append to it.
const CART_API_URL = "/api/cart"; // Based on server routes

let cartState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const cartStore = {
  get: () => cartState,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  fetchCart: async () => {
    cartState = { ...cartState, isLoading: true, error: null };
    emitChange();

    try {
      const response = await api.get(CART_API_URL);
      // Ensure we always have an array
      const rawItems = Array.isArray(response.data) ? response.data : [];

      // Deduplicate items to prevent key collisions
      const uniqueItemsMap = new Map<number, CartItem>();

      rawItems.forEach((item: any) => {
        const pId = Number(item.productId);
        if (!pId) return; // Skip if no valid ID

        if (uniqueItemsMap.has(pId)) {
          const existing = uniqueItemsMap.get(pId)!;
          // Merge quantities
          existing.quantity += Number(item.quantity || 0);
        } else {
          uniqueItemsMap.set(pId, {
            ...item,
            productId: pId,
            quantity: Number(item.quantity || 0),
          });
        }
      });

      const items = Array.from(uniqueItemsMap.values());
      cartState = { ...cartState, items, isLoading: false };
    } catch (error: any) {
      console.error("Failed to fetch cart:", error);
      cartState = {
        ...cartState,
        isLoading: false,
        error: error.response?.data?.message || "Failed to load cart",
      };
    }
    emitChange();
  },

  addItem: async (item: CartItem) => {
    // Optimistic update
    const previousItems = [...cartState.items];
    const existingItemIndex = cartState.items.findIndex(
      (i) => i.productId === item.productId,
    );

    let newItems = [...cartState.items];
    if (existingItemIndex > -1) {
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + item.quantity,
      };
    } else {
      newItems.push(item);
    }

    cartState = { ...cartState, items: newItems };
    emitChange();

    try {
      await api.post(CART_API_URL, item);
      toast.success("Added to cart");
      // Re-fetch to ensure sync with server logic (e.g. stock checks)
      await cartStore.fetchCart();
    } catch (error: any) {
      // Revert on error
      cartState = { ...cartState, items: previousItems };
      emitChange();
      const msg = error.response?.data?.message || "Failed to add item";
      toast.error(msg);
      console.error("Add to cart error:", error);
    }
  },

  updateQuantity: async (productId: number, quantity: number) => {
    if (quantity <= 0) return;

    // Optimistic update
    const previousItems = [...cartState.items];
    const itemIndex = cartState.items.findIndex(
      (i) => i.productId === productId,
    );

    if (itemIndex === -1) return;

    const newItems = [...cartState.items];
    newItems[itemIndex] = { ...newItems[itemIndex], quantity };

    cartState = { ...cartState, items: newItems };
    emitChange();

    try {
      await api.put(CART_API_URL, { productId, quantity });
    } catch (error: any) {
      cartState = { ...cartState, items: previousItems };
      emitChange();
      const msg = error.response?.data?.message || "Failed to update quantity";
      toast.error(msg);
    }
  },

  removeItem: async (productId: number) => {
    // Optimistic update
    const previousItems = [...cartState.items];
    const newItems = cartState.items.filter((i) => i.productId !== productId);

    cartState = { ...cartState, items: newItems };
    emitChange();

    try {
      // axios delete config requires 'data' property for body
      await api.delete(CART_API_URL, { data: { productId } });
      toast.success("Removed from cart");
    } catch (error: any) {
      cartState = { ...cartState, items: previousItems };
      emitChange();
      const msg = error.response?.data?.message || "Failed to remove item";
      toast.error(msg);
    }
  },

  clearCart: () => {
    cartState = { ...cartState, items: [] };
    emitChange();
  },
};

const serverSnapshot: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export function useCartStore() {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.get,
    () => serverSnapshot,
  );
}

// Selector hooks for convenience
export function useCartItems() {
  const state = useCartStore();
  return state.items;
}

export function useCartTotal() {
  const state = useCartStore();
  return state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

export function useCartCount() {
  const state = useCartStore();
  return state.items.length;
}
