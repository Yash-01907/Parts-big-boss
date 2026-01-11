"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, User, ChevronRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";
import {
  partsMegaMenu,
  categoriesMegaMenu,
  brandsMegaMenu,
} from "../../Data/megaMenus";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Combine these for easier mapping
const NAV_ITEMS = [
  { label: "Parts", data: partsMegaMenu },
  { label: "Categories", data: categoriesMegaMenu },
  { label: "Brands", data: brandsMegaMenu },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user } = useAuthStore();
  // State to track which top-level item is expanded
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedLabel((prev) => (prev === label ? null : label));
  };

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount or when closed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Menu Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--background)] z-50 shadow-xl flex flex-col border-l border-[var(--border)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)] shrink-0">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Navigation */}
              <div className="px-4 py-6 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isExpanded = expandedLabel === item.label;
                  return (
                    <div key={item.label} className="overflow-hidden">
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={`
                          w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200
                          ${
                            isExpanded
                              ? "bg-[var(--surface-hover)] text-[var(--accent)]"
                              : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                          }
                        `}
                      >
                        <span className="text-lg font-semibold">
                          {item.label}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-4 pl-4 space-y-6">
                              {item.data.sections.map((section, idx) => (
                                <div key={idx}>
                                  <h3 className="px-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                                    {section.title}
                                  </h3>
                                  <div className="space-y-1">
                                    {section.items.map((subItem, sIdx) => (
                                      <Link
                                        key={sIdx}
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block px-4 py-2 text-sm text-[var(--text-secondary)] font-medium hover:text-[var(--accent)] transition-colors"
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Separator */}
              <div className="px-6">
                <div className="h-px bg-[var(--border)]" />
              </div>

              {/* Account Section */}
              <div className="px-4 py-6">
                {isAuthenticated && user ? (
                  // LOGGED IN STATE
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[var(--surface)] transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center transition-colors border border-[var(--accent)] text-white shadow-sm">
                      <span className="text-lg font-bold">
                        {user.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {user.first_name || "My Account"}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        View Profile
                      </p>
                    </div>
                  </Link>
                ) : (
                  // GUEST STATE
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[var(--surface)] transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-[var(--surface)] group-hover:bg-[var(--surface-hover)] rounded-full flex items-center justify-center transition-colors border border-[var(--border)]">
                      <User
                        size={20}
                        className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        Sign In
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Log in or Register
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[var(--border)] bg-[var(--surface)] space-y-3 shrink-0">
              <button className="w-full py-3.5 px-4 bg-[var(--foreground)] text-[var(--background)] font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Download App
              </button>
              <button className="w-full py-3.5 px-4 border border-[var(--border)] text-[var(--foreground)] font-bold rounded-xl hover:bg-[var(--surface-hover)] transition-colors">
                Contact Support
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
