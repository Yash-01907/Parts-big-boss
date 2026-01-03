"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If auth is done initializing, and user is NOT authenticated, redirect.
    if (isInitialized) {
      if (!isAuthenticated) {
        router.push("/login"); // or /login?redirect=/profile
      } else {
        setIsReady(true);
      }
    }
  }, [isInitialized, isAuthenticated, router]);

  // Show loader while initializing or checking auth
  if (!isInitialized || !isReady) {
    if (isInitialized && !isAuthenticated) return null; // Redirecting...
    return <Loader label="Authenticating..." />;
  }

  return <>{children}</>;
}
