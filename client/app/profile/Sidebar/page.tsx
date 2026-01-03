// app/profile/Sidebar/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  Package,
  Heart,
  Settings,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import { logoutUser } from "@/app/Data/authLoginInfo";
import { authStore } from "@/app/store/useAuthStore";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      authStore.logout();
      router.push("/"); // or "/login"
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      // Force logout on client even if server fails
      authStore.logout();
      router.push("/");
    }
  };

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/profile", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile/garage", label: "Garage", icon: Car },
    { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
    { href: "/profile/orders", label: "Orders", icon: Package },
    { href: "/profile/settings", label: "Settings", icon: Settings },
  ];

  // Determine current section label for mobile header
  const activeItem = menuItems.find((item) => item.href === pathname) || {
    label: "Menu",
  };

  return (
    <>
      {/* ================= MOBILE VIEW (< md) ================= */}
      <div className="md:hidden sticky top-0 z-30 w-full bg-black text-white p-4 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* LEFT: Back to Home */}
          <Link
            href="/"
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
          >
            <ArrowLeft size={24} />
          </Link>

          {/* CENTER: Active Section Label */}
          <span className="font-bold text-lg tracking-wide uppercase text-white">
            {activeItem.label}
          </span>

          {/* RIGHT: Hamburger/Close Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Toggle profile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Options */}
        {isMobileMenuOpen && (
          <nav className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-[var(--accent)] text-white font-bold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/5 transition-all w-full text-left mt-2"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>
        )}
      </div>

      {/* ================= DESKTOP VIEW (>= md) ================= */}
      <aside
        className="
        hidden md:flex
        w-64 lg:w-72 
        flex-col
        sticky top-24 z-30
      "
      >
        <nav
          className="
          w-full flex flex-col 
          gap-2 
          bg-white text-[var(--text-primary)] border border-[var(--border)] rounded-2xl p-4
        "
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                          relative flex items-center gap-3 px-4 py-3 rounded-r-xl transition-all duration-200 group
                          ${
                            isActive
                              ? "text-[var(--accent)] font-bold bg-transparent"
                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] rounded-xl"
                          }
                      `}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--accent)] rounded-r-full"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                )}

                <item.icon
                  size={20}
                  className={`z-10 transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="text-base z-10">{item.label}</span>
              </Link>
            );
          })}

          <div className="h-px bg-[var(--border)] my-2" />

          <button
            onClick={handleLogout}
            className="
               flex items-center gap-3 px-4 py-3 rounded-xl 
              text-red-500 hover:bg-red-50 transition-all duration-200 w-full text-left
          "
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
