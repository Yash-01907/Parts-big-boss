"use client";

import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Car,
  Package,
  MapPin,
  ChevronRight,
  LayoutDashboard,
  Heart,
  Settings,
} from "lucide-react";

interface RecentOrder {
  id: string;
  date: string;
  items: string;
  status: string;
  amount: string;
}

const menuItems = [
  {
    title: "My Orders",
    href: "/profile/orders",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "My Garage",
    href: "/profile/garage",
    icon: Car,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Saved Parts",
    href: "/profile/saved",
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "Messages",
    href: "/profile/messages",
    icon: LayoutDashboard, // Placeholder icon
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Addresses",
    href: "/profile/addresses",
    icon: MapPin,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Settings",
    href: "/profile/settings",
    icon: Settings,
    color: "text-zinc-600",
    bg: "bg-zinc-100",
  },
];

export default function ProfileOverview({
  orders = [],
}: {
  orders: RecentOrder[];
}) {
  const { user, activeVehicle } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Welcome back, {user?.first_name || "Driver"}
        </h1>
        <p className="text-zinc-500 mt-1">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Vehicle Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium mb-4">
                <Car size={16} />
                <span>Active Vehicle</span>
              </div>

              {activeVehicle ? (
                <>
                  <h3 className="text-2xl font-bold mb-1">
                    {activeVehicle.nickname ||
                      `${activeVehicle.year} ${activeVehicle.make_name || ""} ${
                        activeVehicle.model_name || ""
                      }`}
                  </h3>
                  <p className="text-zinc-400">{activeVehicle.variant_name}</p>
                </>
              ) : (
                <div className="py-4">
                  <h3 className="text-xl font-semibold opacity-90">
                    No Active Vehicle selected
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    Select a vehicle to find compatible parts.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Link
                href="/profile/garage"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/5"
              >
                {activeVehicle ? "Manage Garage" : "Add Vehicle"}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Grid (Visible only on Mobile) */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border boundary-zinc-200 p-4 rounded-xl hover:border-zinc-300 transition-all flex flex-col items-center justify-center text-center gap-2 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}
              >
                <item.icon size={20} />
              </div>
              <span className="text-sm font-medium text-zinc-700">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Stats Grid (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          <Link
            href="/profile/orders"
            className="bg-white border boundary-zinc-200 p-5 rounded-2xl hover:border-zinc-300 transition-colors flex flex-col justify-between group"
          >
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
              <Package size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">
                {orders.length}
              </p>
              <p className="text-sm text-zinc-500 font-medium">Recent Orders</p>
            </div>
          </Link>

          <Link
            href="/profile/addresses"
            className="bg-white border boundary-zinc-200 p-5 rounded-2xl hover:border-zinc-300 transition-colors flex flex-col justify-between group"
          >
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">-</p>
              <p className="text-sm text-zinc-500 font-medium">
                Saved Addresses
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Secondary Navigation List (The rest of the items) */}
      <div className="md:hidden space-y-2">
        {menuItems.slice(4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl active:bg-zinc-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}
              >
                <item.icon size={16} />
              </div>
              <span className="font-medium text-zinc-900">{item.title}</span>
            </div>
            <ChevronRight size={16} className="text-zinc-400" />
          </Link>
        ))}
      </div>

      {/* Recent Orders List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-900">Recent Orders</h2>
          <Link
            href="/profile/orders"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          {orders.length > 0 ? (
            <div className="divide-y divide-zinc-100">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 text-sm">
                        {order.items}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {order.date} • {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-zinc-900">
                      {order.amount.replace("$", "₹")}
                    </p>
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="text-xs text-indigo-600 font-medium hover:underline md:hidden"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500">
              <Package className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
              <p>No recent orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
