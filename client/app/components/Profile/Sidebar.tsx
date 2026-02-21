"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Car,
  User,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";
import { useRef, useEffect } from "react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/profile",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    href: "/profile/orders",
    icon: Package,
  },
  {
    title: "My Garage",
    href: "/profile/garage",
    icon: Car,
  },
  {
    title: "Saved Parts",
    href: "/profile/saved",
    icon: Heart,
  },
  {
    title: "Addresses",
    href: "/profile/addresses",
    icon: MapPin,
  },
  {
    title: "Account Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active item on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const activeLink = scrollRef.current.querySelector(
        '[data-active="true"]',
      );
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [pathname]);

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 md:block hidden">
      <div className="sticky top-24 space-y-8">
        {/* User Brief */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
            <User className="h-6 w-6 text-zinc-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">Hello,</p>
            <p className="text-base font-bold text-zinc-900">
              {user?.first_name || "Driver"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-black text-white shadow-md shadow-zinc-900/10"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-zinc-900",
                    )}
                  />
                  {item.title}
                </div>
                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* Separator */}
        <div className="h-px bg-zinc-200 mx-2" />

        {/* Logout */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
