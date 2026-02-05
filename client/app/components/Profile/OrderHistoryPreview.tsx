// =============================================================================
// ORDER HISTORY PREVIEW - RSC Component
// Recent orders with status badges and timeline
// =============================================================================

import Link from "next/link";
import {
  Package,
  ChevronRight,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Order, OrderStatus, ORDER_STATUS_CONFIG } from "@/app/types/profile";

interface OrderHistoryPreviewProps {
  orders: Order[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  // Amount is in smallest unit (paise), convert to rupees
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

function getStatusIcon(status: OrderStatus) {
  const iconClass = "h-3.5 w-3.5";

  switch (status) {
    case "pending":
      return <Clock className={iconClass} />;
    case "paid":
      return <CheckCircle2 className={iconClass} />;
    case "shipped":
      return <Truck className={iconClass} />;
    case "delivered":
      return <CheckCircle2 className={iconClass} />;
    case "cancelled":
      return <XCircle className={iconClass} />;
    default:
      return <Clock className={iconClass} />;
  }
}

function OrderCard({ order }: { order: Order }) {
  const config = ORDER_STATUS_CONFIG[order.status];
  const orderId = `#${order.id.toString().padStart(5, "0")}`;

  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl bg-zinc-50/50 border border-transparent hover:border-zinc-200 hover:bg-white transition-all duration-200">
      {/* Order Icon */}
      <div className="shrink-0 h-11 w-11 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
        <Package size={18} className="text-zinc-600" />
      </div>

      {/* Order Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-950 text-sm">
            Order {orderId}
          </span>
          {/* Status Badge */}
          <span
            className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide
              ${config.bgColor} ${config.color}
            `}
          >
            {getStatusIcon(order.status)}
            {config.label}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-zinc-500">
          {formatDate(order.created_at)}
          {order.item_count && <span className="mx-1.5">·</span>}
          {order.item_count &&
            `${order.item_count} item${order.item_count > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right">
        <span className="font-bold text-zinc-950">
          {formatCurrency(order.total_amount)}
        </span>
      </div>

      {/* Hover Arrow */}
      <ChevronRight
        size={16}
        className="shrink-0 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all duration-200"
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-16 w-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
        <Package size={28} className="text-zinc-400" />
      </div>
      <h4 className="font-semibold text-zinc-950 mb-1">No orders yet</h4>
      <p className="text-sm text-zinc-500 max-w-52">
        When you place your first order, it will appear here
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
      >
        Start Shopping
        <ChevronRight size={14} />
      </Link>
    </div>
  );
}

export default function OrderHistoryPreview({
  orders,
}: OrderHistoryPreviewProps) {
  const hasOrders = orders.length > 0;
  const displayOrders = orders.slice(0, 4); // Show max 4 orders

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
        <div>
          <h3 className="font-semibold text-zinc-950">Recent Orders</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Your latest transactions
          </p>
        </div>
        {hasOrders && (
          <Link
            href="/profile/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            View All
            <ChevronRight size={14} />
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {hasOrders ? (
          <div className="space-y-2">
            {displayOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer - Show only if more orders exist */}
      {orders.length > 4 && (
        <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-100">
          <Link
            href="/profile/orders"
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            View {orders.length - 4} more orders
            <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
