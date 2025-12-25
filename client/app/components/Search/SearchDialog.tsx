"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onSuggestionSelect?: (query: string) => void;
}

export default function SearchDialog({
  isOpen,
  onClose,
  searchQuery,
  onQueryChange,
  onSearch,
  onSuggestionSelect,
}: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="
            w-full max-w-2xl
            rounded-2xl
            bg-[var(--surface)]
            shadow-[0_20px_80px_rgba(0,0,0,0.6)]
            ring-1 ring-white/5
            transition-all duration-200 ease-out
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5">
            <p className="text-sm text-[var(--text-muted)]">
              Search parts, brands, or vehicles
            </p>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Input */}
          <div className="px-6 py-4">
            <SearchInput
              ref={inputRef}
              value={searchQuery}
              onChange={onQueryChange}
              onClear={() => onQueryChange("")}
              showHint={!searchQuery}
            />
          </div>

          {/* Content */}
          <div className="border-t border-[var(--border)]">
            {!searchQuery ? (
              <SearchSuggestions
                onSelect={(query) => {
                  onQueryChange(query);
                  onSuggestionSelect?.(query);
                }}
              />
            ) : (
              <div className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => onSearch(searchQuery)}
                  className="
                    w-full rounded-xl py-3
                    bg-[var(--accent)]
                    text-white font-semibold
                    transition
                    hover:bg-[var(--accent-hover)]
                    active:scale-[0.98]
                  "
                >
                  Search for “{searchQuery}”
                </button>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="flex justify-end px-6 pb-4 text-xs text-[var(--text-muted)]">
            Press <span className="mx-1 rounded bg-black/30 px-1">ESC</span> to close
          </div>
        </div>
      </div>
    </>
  );
}
