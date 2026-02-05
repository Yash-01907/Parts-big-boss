import { cookies } from "next/headers";
import { cache } from "react";
import {
  ProfileData,
  ProfileStats,
  Order,
  UserAddress,
  UserWithDealer,
} from "@/app/types/profile";
import { UserVehicle } from "@/app/types/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// =============================================================================
// HELPER: Create headers with cookies for authenticated requests
// =============================================================================
async function getAuthHeaders() {
  const cookieStore = await cookies();

  // Properly serialize cookies - cookieStore.toString() doesn't work correctly
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieString,
    "Content-Type": "application/json",
  };
}

// =============================================================================
// CACHED: Fetch User Profile
// =============================================================================
export const getUserProfile = cache(
  async (): Promise<UserWithDealer | null> => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers,
        next: { tags: ["user-profile"] },
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error("[Profile] User fetch error:", error);
      return null;
    }
  },
);

// =============================================================================
// CACHED: Fetch User Garage (Vehicles)
// =============================================================================
export const getUserGarage = cache(async (): Promise<UserVehicle[]> => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/user/vehicles`, {
      headers,
      next: { tags: ["garage"] },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("[Profile] Garage fetch error:", error);
    return [];
  }
});

// =============================================================================
// CACHED: Fetch User Orders
// =============================================================================
export const getUserOrders = cache(async (): Promise<Order[]> => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/orders/my-orders`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("[Profile] Orders fetch error:", error);
    return [];
  }
});

// =============================================================================
// CACHED: Fetch User Addresses
// =============================================================================
export const getUserAddresses = cache(async (): Promise<UserAddress[]> => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/users/addresses`, {
      headers,
      next: { tags: ["addresses"] },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("[Profile] Addresses fetch error:", error);
    return [];
  }
});

// =============================================================================
// CACHED: Fetch Wishlist Count
// =============================================================================
export const getWishlistCount = cache(async (): Promise<number> => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/user/wishlist/count`, {
      headers,
      next: { tags: ["wishlist"] },
    });

    if (!res.ok) return 0;
    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    console.error("[Profile] Wishlist count error:", error);
    return 0;
  }
});

// =============================================================================
// MAIN: Get Complete Profile Data (Parallel Fetching)
// =============================================================================
export async function getProfileData(): Promise<{
  garage: UserVehicle[];
  orders: Order[];
}> {
  const [garage, orders] = await Promise.all([
    getUserGarage(),
    getUserOrders(),
  ]);
  return { garage, orders };
}

// =============================================================================
// MAIN: Get Full Profile Dashboard Data
// =============================================================================
export async function getProfileDashboardData(): Promise<ProfileData> {
  // Parallel fetch all data
  const [user, garage, orders, addresses, wishlistCount] = await Promise.all([
    getUserProfile(),
    getUserGarage(),
    getUserOrders(),
    getUserAddresses(),
    getWishlistCount(),
  ]);

  // Calculate stats
  const stats: ProfileStats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (o) =>
        o.status === "pending" || o.status === "paid" || o.status === "shipped",
    ).length,
    wishlistCount,
    addressCount: addresses.length,
    vehicleCount: garage.length,
  };

  return {
    user,
    stats,
    recentOrders: orders.slice(0, 5), // Get 5 most recent
    addresses,
  };
}
