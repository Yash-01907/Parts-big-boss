// app/settings/_components/SettingsShell.tsx
"use client";

import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { User, MapPin, Shield, Bell, Loader2 } from "lucide-react"; // Added Loader2
import { motion, AnimatePresence } from "framer-motion";
import ProfileForm from "./ProfileForm";

// Dynamic Imports with Suspense/Loading fallbacks
const AddressManager = dynamic(() => import("./AddressManager"), {
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false, // Client-side interact heavy
});
const SecuritySettings = dynamic(() => import("./SecuritySettings"), {
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false,
});
const NotificationSettings = dynamic(() => import("./NotificationSettings"), {
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false,
});

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "address", label: "Addresses", icon: MapPin },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

export default function SettingsShell({ initialData }: { initialData: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read state from URL, default to 'profile'
  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabId);
    // Updates URL without refreshing page
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 last:mb-0
                ${
                  activeTab === tab.id
                    ? "bg-[var(--surface-hover)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-gray-50"
                }
              `}
            >
              <tab.icon
                size={18}
                strokeWidth={activeTab === tab.id ? 2.5 : 2}
                className={
                  activeTab === tab.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)]"
                }
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "profile" && <ProfileForm data={initialData} />}
            {activeTab === "address" && <AddressManager />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
