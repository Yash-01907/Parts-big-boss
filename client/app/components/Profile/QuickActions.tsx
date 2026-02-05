// =============================================================================
// QUICK ACTIONS - Client Component
// Quick action buttons for common profile tasks
// =============================================================================
"use client";

import Link from "next/link";
import {
  Settings,
  Shield,
  MapPin,
  Bell,
  HelpCircle,
  ChevronRight,
  Plus,
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "profile",
    label: "Edit Profile",
    description: "Update your personal information",
    icon: Settings,
    href: "/profile/settings?tab=profile",
  },
  {
    id: "security",
    label: "Security",
    description: "Change password and 2FA",
    icon: Shield,
    href: "/profile/settings?tab=security",
  },
  {
    id: "addresses",
    label: "Addresses",
    description: "Manage delivery locations",
    icon: MapPin,
    href: "/profile/settings?tab=address",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Email and push preferences",
    icon: Bell,
    href: "/profile/settings?tab=notifications",
  },
];

function QuickActionItem({ action }: { action: QuickAction }) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-all duration-200"
    >
      {/* Icon */}
      <div className="shrink-0 h-10 w-10 rounded-xl bg-zinc-100 group-hover:bg-zinc-200/80 flex items-center justify-center transition-colors duration-200">
        <Icon size={18} className="text-zinc-600" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-zinc-950">
            {action.label}
          </span>
          {action.badge && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">
              {action.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{action.description}</p>
      </div>

      {/* Arrow */}
      <ChevronRight
        size={16}
        className="shrink-0 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all duration-200"
      />
    </Link>
  );
}

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-100">
        <h3 className="font-semibold text-zinc-950">Quick Actions</h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          Manage your account settings
        </p>
      </div>

      {/* Actions List */}
      <div className="p-2 divide-y divide-zinc-100/50">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionItem key={action.id} action={action} />
        ))}
      </div>

      {/* Footer - Help Link */}
      <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-100">
        <Link
          href="/help"
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <HelpCircle size={14} />
          Need help? Contact support
        </Link>
      </div>
    </div>
  );
}
