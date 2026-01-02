"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProfileSidebar from "./Sidebar/page"; 
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/Loader";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    // If auth is done initializing, and user is NOT authenticated, redirect.
    if (isInitialized && !isAuthenticated) {
      router.push("/login"); // or /login?redirect=/profile
    }
  }, [isInitialized, isAuthenticated, router]);

  // 1. Show nothing (or a spinner) while waiting for auth to initialize
  if (!isInitialized) {
    return <Loader label="Authenticating..." />;
  }

  // 2. If initialized but not authenticated, return null (redirecting...)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFDFD]">
      
      {/* NEW SIDEBAR */}
      <ProfileSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           // Padding adjustments to align nicely with the vertical sidebar
          
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
}