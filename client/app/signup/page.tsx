"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CheckCircle2, Loader2 } from "lucide-react";

import SignupStyles from "./SignupStyles";
import { useAuthStore, authStore } from "../store/useAuthStore";
import { bootstrapAuth } from "../store/bootstrapAuth";
import Loader from "../components/Loader";

// Dynamic Imports with code splitting
const CustomerSignup = dynamic(() => import("./CustomerSignup"), {
  loading: () => (
    <div className="h-48 flex items-center justify-center">
      <Loader2 className="animate-spin text-[var(--text-secondary)]" />
    </div>
  ),
  ssr: false,
});
const MerchantSignup = dynamic(() => import("./MerchantSignup"), {
  loading: () => (
    <div className="h-48 flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-400" />
    </div>
  ),
  ssr: false,
});

export default function SignupPage() {
  const { activeAuthTab, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapAuth();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleTabChange = (type: "customer" | "merchant") => {
    authStore.setAuthTab(type);
  };

  if (loading || isAuthenticated) {
    return <Loader label="Authenticating..." />;
  }

  return (
    <div className="min-h-screen w-full flex bg-[var(--background)]">
      {/* Left Panel - Branding Section */}
      <SignupStyles />

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex justify-center p-3 lg:p-6 relative overflow-y-auto max-h-screen">
        <div className="w-full max-w-[420px] space-y-10 py-10">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="text-center lg:hidden mb-8">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl text-[var(--foreground)]">
                PartsBigBoss
              </span>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Signup Type Toggle */}
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
                className={`flex-1 relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 text-center cursor-pointer ${
                  activeAuthTab === "customer"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Customer
              </div>
              <div
                onClick={() => handleTabChange("merchant")}
                className={`flex-1 relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 text-center cursor-pointer ${
                  activeAuthTab === "merchant"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Merchant
              </div>
            </div>
          </div>

          {activeAuthTab === "customer" ? (
            <CustomerSignup />
          ) : (
            <MerchantSignup />
          )}
        </div>
      </div>
    </div>
  );
}
