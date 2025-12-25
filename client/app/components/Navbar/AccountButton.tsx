"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check authentication status (replace with actual auth check)
  useEffect(() => {
    // TODO: Replace with actual authentication check (e.g., checking token/session)
    setIsAuthenticated(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logout clicked");
    setIsOpen(false);
    setIsAuthenticated(false);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={handleLoginClick}
        className="hidden lg:flex items-center justify-center p-2 rounded-lg transition-colors duration-200 group"
        style={{
          color: "var(--primary-white)",
        }}
        aria-label="Sign in"
      >
        <User
          size={20}
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center justify-center p-2 rounded-lg transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          color: "var(--primary-white)",
          focusRingColor: "var(--primary-red)",
        }}
        aria-label="Account menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User
          size={20}
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-40 animate-in fade-in duration-200"
          style={{
            backgroundColor: "var(--primary-white)",
          }}
        >
          {/* Dropdown Header */}
          <div
            className="px-4 py-3 border-b"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--foreground-light)",
              }}
            >
              Account
            </p>
          </div>

          {/* Dropdown Items */}
          <div className="py-1">
            {/* Profile */}
            <Link
              href="/profile"
              className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-3"
              style={{
                color: "var(--foreground-light)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--surface-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => setIsOpen(false)}
            >
              <User size={16} style={{ color: "var(--text-muted)" }} />
              Profile
            </Link>

            {/* Orders */}
            <Link
              href="/orders"
              className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-3"
              style={{
                color: "var(--foreground-light)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--surface-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => setIsOpen(false)}
            >
              <svg
                size={16}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--text-muted)" }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Orders
            </Link>

            {/* Divider */}
            <div
              className="my-1 h-px"
              style={{
                backgroundColor: "var(--border)",
              }}
            />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-3"
              style={{
                color: "var(--foreground-light)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--surface-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <LogOut size={16} style={{ color: "var(--text-muted)" }} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
