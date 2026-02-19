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
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { logoutUser } from "@/app/Data/authLoginInfo";
import { authStore } from "@/app/store/useAuthStore";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isHorizontalOpen, setIsHorizontalOpen] = useState(false);

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
    { href: "/profile", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile/garage", label: "Garage", icon: Car },
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
      <div className="md:hidden">
        {/* Top Bar - Sticky Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-lg border-b border-white/10 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: Back to Home */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/90 hover:text-white group"
              aria-label="Back to home"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Home</span>
            </button>

            {/* Center: Active Section with Dropdown Indicator */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-white font-semibold text-sm truncate max-w-[120px]">
                {activeItem.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
                  isHorizontalOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Right: Menu Toggle */}
            <button
              onClick={() => setIsHorizontalOpen(!isHorizontalOpen)}
              className="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/90 hover:text-white relative group"
              aria-label={isHorizontalOpen ? "Close menu" : "Open menu"}
              aria-expanded={isHorizontalOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isHorizontalOpen
                      ? "opacity-0 rotate-90 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isHorizontalOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-0"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Dropdown Menu with Smooth Animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isHorizontalOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 pt-2 space-y-1 bg-gradient-to-b from-transparent to-black/10">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setIsHorizontalOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-white text-blue-600 font-semibold shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/15 active:bg-white/20"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isHorizontalOpen
                        ? "slideIn 0.3s ease-out forwards"
                        : "none",
                    }}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </button>
                );
              })}

              {/* Sign Out Button */}
              <div className="pt-2 mt-2 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-100 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span className="flex-1 text-left font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <Link
          href="/"
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-4 pl-2"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Home</span>
        </Link>

        <nav
          className="
          w-full flex flex-col 
          gap-2 
          text-black p-4
          border border-black/50
          rounded-xl
          shadow-sm
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
                              : "text-black hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] rounded-xl"
                          }
                      `}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1 bottom-1 w-1 bg-black rounded-r-full"
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
