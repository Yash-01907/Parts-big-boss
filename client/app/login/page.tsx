"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react"; // Added Loader2
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LoginStyle from "./LoginStyle";
import { useAuthStore, authStore } from "../store/useAuthStore";
import { bootstrapAuth } from "../store/bootstrapAuth";
import Loader from "../components/Loader";

// Dynamic Imports for code splitting
const CustomerLogin = dynamic(() => import("./CustomerLogin"), {
  loading: () => (
    <div className="h-48 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false,
});
const MerchantLogin = dynamic(() => import("./MerchantLogin"), {
  loading: () => (
    <div className="h-48 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false,
});

export default function LoginPage() {
  const { activeAuthTab, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    bootstrapAuth();
    setLoading(false);
  }, []);

  // New Effect: Automatically redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // ... imports
  // import FullPageLoader from "../components/FullPageLoader"; // (Moved to top via next step or manually)

  // Handlers
  const handleTabChange = (type: "customer" | "merchant") => {
    authStore.setAuthTab(type);
  };

  // Show loading spinner if initially loading OR if the user is authenticated (redirecting)
  if (loading || isAuthenticated) {
    return <Loader label="Authenticating..." />;
  }

  return (
    <div className="min-h-screen w-full flex bg-[var(--background)]">
      {/* Left Panel - Branding Section (Hidden on mobile) */}
      <LoginStyle />

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        <div className="w-full max-w-[420px] space-y-10">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="text-center lg:hidden mb-8">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl text-[var(--foreground)]">
                PartsBigBoss
              </span>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Login Type Toggle */}
            <div className="p-1.5 bg-[var(--surface-hover)] rounded-xl flex relative border border-[var(--border)]">
              <div
                className="absolute inset-y-1.5 bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)] transition-all duration-300 ease-out"
                style={{
                  width: "calc(50% - 6px)",
                  left: activeAuthTab === "customer" ? "6px" : "calc(50%)",
                }}
              />
              <div
                onClick={() => handleTabChange("customer")}
                className={`flex-1 relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 text-center ${
                  activeAuthTab === "customer"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Customer
              </div>
              <div
                onClick={() => handleTabChange("merchant")}
                className={`flex-1 relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 text-center ${
                  activeAuthTab === "merchant"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Merchant
              </div>
            </div>
          </div>

          {activeAuthTab === "customer" ? <CustomerLogin /> : <MerchantLogin />}
        </div>
      </div>
    </div>
  );
}
