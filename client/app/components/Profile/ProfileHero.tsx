// =============================================================================
// PROFILE HERO - Unified Profile Header with Expandable Stats
// Combines user info + expandable stats in one cohesive component
// No duplicate sections, clean minimal design
// =============================================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronUp,
  Package,
  Heart,
  Car,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { UserWithDealer, ProfileStats, Order } from "@/app/types/profile";

// =============================================================================
// SPRING CONFIGURATION
// =============================================================================
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
};

// =============================================================================
// COMPONENT PROPS
// =============================================================================
interface ProfileHeroProps {
  user: UserWithDealer;
  stats: ProfileStats;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function formatJoinDate(dateString?: string): string {
  if (!dateString) return "Recently joined";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
}

// =============================================================================
// STATS MENU ITEM - Thin horizontal item
// =============================================================================
interface StatsMenuItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}

function StatsMenuItem({ icon, label, value, href }: StatsMenuItemProps) {
  return (
    <Link
      href={href}
      className="
        group flex items-center gap-3 
        px-4 py-2.5
        hover:bg-white/50
        transition-colors duration-200
        rounded-lg
      "
    >
      <div className="text-zinc-600 group-hover:text-zinc-950 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-semibold text-zinc-950 tabular-nums">
        {value}
      </span>
      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
        {label}
      </span>
    </Link>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function ProfileHero({ user, stats }: ProfileHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initials = getInitials(user.first_name, user.last_name);
  const joinDate = formatJoinDate(user.created_at);
  const isDealer = user.role === "dealer";

  const statsItems = [
    {
      icon: <Package size={16} strokeWidth={1.5} />,
      label: "Orders",
      value: stats.totalOrders,
      href: "/profile/orders",
    },
    {
      icon: <Heart size={16} strokeWidth={1.5} />,
      label: "Wishlist",
      value: stats.wishlistCount,
      href: "/profile/wishlist",
    },
    {
      icon: <Car size={16} strokeWidth={1.5} />,
      label: "Garage",
      value: stats.vehicleCount,
      href: "/profile/garage",
    },
    {
      icon: <MapPin size={16} strokeWidth={1.5} />,
      label: "Addresses",
      value: stats.addressCount,
      href: "/profile/settings?tab=address",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-950 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-950 to-black" />

      {/* Main Content */}
      <div className="relative">
        {/* Header Section */}
        <div className="px-6 py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="h-16 w-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl font-bold tracking-tight border border-white/10">
                {initials}
              </div>
              {/* Active dot */}
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-zinc-950 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              {/* Name & Badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold tracking-tight">
                  {user.first_name} {user.last_name}
                </h1>
                {isDealer && user.dealer_profile?.is_verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold uppercase tracking-wide">
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                )}
              </div>

              {/* Company Name (Dealers) */}
              {isDealer && user.dealer_profile?.company_name && (
                <div className="mt-1 flex items-center gap-1.5 text-white/50">
                  <Building2 size={12} />
                  <span className="text-xs font-medium">
                    {user.dealer_profile.company_name}
                  </span>
                </div>
              )}

              {/* Meta Info */}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="font-medium text-white/60">{user.email}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {joinDate}
                </span>
              </div>
            </div>

            {/* Expand Toggle */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                flex items-center gap-2
                px-4 py-2
                bg-white hover:bg-white/75
                rounded-full
                text-xs font-medium
                transition-colors duration-200
                cursor-pointer
              "
              whileTap={{ scale: 0.97 }}
            >
              <span>MORE</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={springTransition}
              >
                <ChevronDown size={14} />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Expandable Stats Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springTransition}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 lg:px-8">
                {/* Thin horizontal stats bar */}
                <div
                  className="
                  flex flex-wrap items-center
                  bg-white/5 backdrop-blur-sm
                  rounded-xl
                  border border-white/10
                  divide-x divide-white/10
                "
                >
                  {statsItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="
                        group relative flex items-center gap-2.5
                        px-5 py-3
                        hover:bg-white/5
                        transition-colors duration-200
                        flex-1 min-w-30
                        justify-center
                      "
                    >
                      <div className="text-white/40 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-lg font-bold text-white tabular-nums">
                        {item.value}
                      </span>
                      <span className="text-[10px] font-medium text-white uppercase tracking-wider">
                        {item.label}
                      </span>
                      {/* Link indicator - appears on hover */}
                      <ArrowUpRight
                        size={12}
                        className="
                          absolute top-2 right-2
                          text-white/0 group-hover:text-white/60
                          translate-x-1 -translate-y-1
                          group-hover:translate-x-0 group-hover:translate-y-0
                          transition-all duration-200
                        "
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
