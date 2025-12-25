"use client";

import { Clock, TrendingUp, Tag } from "lucide-react";

interface SearchSuggestionsProps {
  onSelect: (query: string) => void;
}

export default function SearchSuggestions({
  onSelect,
}: SearchSuggestionsProps) {
  const popularSearches = [
    "Honda parts",
    "Brake pads",
    "Oil filter",
    "Battery replacement",
  ];

  const recentSearches = [
    "Toyota Camry suspension",
    "Fuel pump assembly",
    "Air filter",
  ];

  const quickCategories = [
    { icon: "Engine", label: "Engine" },
    { icon: "Brakes", label: "Brakes" },
    { icon: "Wheels", label: "Wheels" },
    { icon: "Suspension", label: "Suspension" },
    { icon: "Transmission", label: "Transmission" },
    { icon: "Lighting", label: "Lighting" },
  ];

  return (
    <div
      className="px-5 py-4 text-sm max-h-96 overflow-y-auto space-y-6"
      style={{ color: "var(--text-secondary)" }}
    >
      <style jsx>{`
        .search-button {
          color: var(--foreground-light);
          transition: all 150ms ease-in-out;
        }
        .search-button:hover {
          background-color: var(--surface-hover);
          color: var(--primary-white);
        }
        .category-button {
          color: var(--foreground-light);
          background-color: var(--surface-hover);
          transition: all 150ms ease-in-out;
        }
        .category-button:hover {
          background-color: var(--surface);
          color: var(--primary-white);
        }
      `}</style>

      {/* Popular Searches */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} style={{ color: "var(--text-muted)" }} />
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Popular Searches
          </p>
        </div>
        <div className="space-y-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSelect(search)}
              className="search-button w-full text-left px-3 py-2 rounded-lg"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Recent Searches */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} style={{ color: "var(--text-muted)" }} />
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Recent Searches
          </p>
        </div>
        <div className="space-y-2">
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSelect(search)}
              className="search-button w-full text-left px-3 py-2 rounded-lg"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* Quick Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Tag size={14} style={{ color: "var(--text-muted)" }} />
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Browse Categories
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quickCategories.map((category) => (
            <button
              key={category.label}
              onClick={() => onSelect(category.label)}
              className="category-button px-3 py-2.5 rounded-lg font-medium text-sm"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
