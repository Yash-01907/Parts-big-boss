import Link from "next/link";
import { Package } from "lucide-react";

interface Order {
  id: string;
  date: string;
  items: string;
  status: string;
  amount: string;
}

export default function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="h-40 lg:flex-1 border border-[var(--border)] rounded-3xl p-5 bg-[var(--surface)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-serif text-[var(--foreground)]">
          Recent Orders
        </h2>
        <Link
          href="/profile/orders"
          className="text-xs font-medium text-[var(--info)] hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
            >
              <div className="p-2 rounded-full bg-[var(--surface-hover)] text-[var(--accent)] shrink-0">
                <Package size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  {order.items}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{order.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold">{order.amount}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-[var(--text-muted)]">
            No recent orders found.
          </div>
        )}
      </div>
    </div>
  );
}
