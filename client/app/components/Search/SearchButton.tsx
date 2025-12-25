"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useSearchDialog } from "./useSearchDialog";

export default function SearchButton() {
  const { isOpen, open, close } = useSearchDialog();
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Replace with actual search logic (router.push, API call, etc.)
    close();
    setSearchQuery("");
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <>
      {/* Search Button */}
      <div className="relative group">
        <button
          onClick={open}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            color: "var(--primary-white)",
          }}
          className="p-2 hover:text-[color:var(--primary-red-light)] transition-colors duration-200"
          aria-label="Search"
        >
          <Search
            size={20}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs rounded-md pointer-events-none animate-in fade-in duration-200"
            style={{
              backgroundColor: "var(--primary-red)",
              color: "var(--primary-white)",
            }}
          >
            Search (⌘K)
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{
                borderTopColor: "var(--primary-red)",
              }}
            />
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isOpen}
        onClose={close}
        searchQuery={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </>
  );
}
