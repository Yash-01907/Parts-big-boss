"use client";

import { forwardRef } from "react";
import { X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showHint?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "Search parts, brands, or vehicle…",
      showHint = true,
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}

          {/* Input */}
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="
      w-full
      pl-5 pr-11
      py-3
      text-lg font-light
      bg-transparent
      outline-none
      border-0
      border-b border-transparent
      transition-colors duration-200
      placeholder:text-[var(--text-muted)]
      focus:border-[var(--foreground)]
    "
          />

          {/* Right Action */}
          {value && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-[var(--text-muted)]
        transition-colors
        hover:text-[var(--foreground)]
      "
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : (
            showHint && (
              <div
                className="
          absolute right-4 top-1/2 -translate-y-1/2
          hidden sm:flex items-center gap-1
          text-xs font-medium
          text-[var(--text-muted)]
        "
              >
                <kbd
                  className="
            px-2 py-0.5 rounded
            bg-[var(--surface-hover)]
            text-[var(--text-secondary)]
          "
                >
                  ESC
                </kbd>
              </div>
            )
          )}
        </div>

        {/* Subtle Underline (for visual feedback) */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
