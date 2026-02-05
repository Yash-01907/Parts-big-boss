// =============================================================================
// PROFILE TYPES - PartsBigBoss User Profile Section
// =============================================================================

// -----------------------------------------------------------------------------
// USER TYPES
// -----------------------------------------------------------------------------
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string; // Optional - not always returned by API
  role?: "customer" | "dealer" | "admin"; // Optional - not always returned by API
  created_at?: string; // Optional - not always returned by API
  updated_at?: string;
}

export interface DealerProfile {
  user_id: string;
  company_name: string;
  vat_number: string;
  company_address: string | null;
  company_city: string | null;
  is_verified: boolean;
}

export interface UserWithDealer extends User {
  dealer_profile?: DealerProfile | null;
}

// -----------------------------------------------------------------------------
// ADDRESS TYPES
// -----------------------------------------------------------------------------
export interface UserAddress {
  id: string;
  user_id: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

// -----------------------------------------------------------------------------
// ORDER TYPES
// -----------------------------------------------------------------------------
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "cancelled"
  | "delivered";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  // Joined from products table
  product_title?: string;
  product_image?: string;
}

export interface Order {
  id: string;
  user_id: string;
  address_id: string | null;
  total_amount: number; // In smallest currency unit (paise)
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  // Populated fields
  items?: OrderItem[];
  item_count?: number;
}

// -----------------------------------------------------------------------------
// PROFILE STATS (Aggregated Data)
// -----------------------------------------------------------------------------
export interface ProfileStats {
  totalOrders: number;
  pendingOrders: number;
  wishlistCount: number;
  addressCount: number;
  vehicleCount: number;
}

// -----------------------------------------------------------------------------
// PROFILE DATA (Server Fetched)
// -----------------------------------------------------------------------------
export interface ProfileData {
  user: UserWithDealer | null;
  stats: ProfileStats;
  recentOrders: Order[];
  addresses: UserAddress[];
}

// -----------------------------------------------------------------------------
// STATUS BADGE CONFIG
// -----------------------------------------------------------------------------
export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Processing",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  paid: {
    label: "Confirmed",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  shipped: {
    label: "Shipped",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-zinc-500",
    bgColor: "bg-zinc-100",
  },
};

// -----------------------------------------------------------------------------
// ACCOUNT STATUS
// -----------------------------------------------------------------------------
export type AccountStatus = "active" | "pending_verification" | "suspended";

export const ACCOUNT_STATUS_CONFIG: Record<
  AccountStatus,
  { label: string; color: string; dotColor: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  pending_verification: {
    label: "Pending Verification",
    color: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  suspended: {
    label: "Suspended",
    color: "text-red-700",
    dotColor: "bg-red-500",
  },
};
