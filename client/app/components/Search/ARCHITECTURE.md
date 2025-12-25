/**
 * SEARCH FEATURE - COMPLETE INTEGRATION DIAGRAM
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │                      NAVBAR.TSX                              │
 * │  ┌──────────┐  ┌──────────────┐  ┌───────────┐             │
 * │  │   Logo   │  │   NavLinks   │  │ SearchBtn │ CartBtn     │
 * │  └──────────┘  └──────────────┘  └─────┬─────┘             │
 * │                                         │                   │
 * └─────────────────────────────────────────┼───────────────────┘
 *                                           │
 *                    ┌──────────────────────▼──────────────────┐
 *                    │        SEARCH BUTTON                    │
 *                    │  (imports SearchButton.tsx)            │
 *                    └──────────────────────┬──────────────────┘
 *                                           │
 *         ┌─────────────────────────────────┴──────────────────────┐
 *         │                                                          │
 *         ▼                                                          ▼
 *  ┌──────────────────┐                               ┌──────────────────────┐
 *  │ Search Icon      │                               │  SEARCH DIALOG       │
 *  │ + Tooltip        │                               │  (SearchDialog.tsx)  │
 *  │ (visible)        │                               │  (hidden by default) │
 *  └──────────────────┘                               └──────────────────────┘
 *         │                                                   │
 *         └── onClick: open() ──────────────────────────────┐ │
 *         │                                                 │ │
 *         └── Ctrl+K / Cmd+K ────────────────────────────┐ │ │
 *                                                        │ ▼ ▼
 *                                    ┌──────────────────────────────────────┐
 *                                    │    useSearchDialog Hook              │
 *                                    │  - Manages isOpen state              │
 *                                    │  - Keyboard shortcuts                │
 *                                    │  - Body scroll lock                  │
 *                                    └──────────────────────────────────────┘
 * 
 * ┌────────────────────────────────────────────────────────────────────┐
 * │               SEARCH DIALOG STRUCTURE (when open)                   │
 * │                                                                     │
 * │  ┌──────────────────────────────────────────────────────────────┐ │
 * │  │ BACKDROP: bg-black/40 + backdrop-blur-md                   │ │
 * │  │                                                              │ │
 * │  │  ┌────────────────────────────────────────────────────────┐ │ │
 * │  │  │                    DIALOG (centered)                  │ │ │
 * │  │  │           max-w-xl, shadow-2xl, rounded-xl            │ │ │
 * │  │  │                                                        │ │ │
 * │  │  │  ┌─ SEARCH INPUT ──────────────────────────────────┐ │ │ │
 * │  │  │  │ (SearchInput.tsx)                              │ │ │ │
 * │  │  │  │ - Search icon (left)                           │ │ │ │
 * │  │  │  │ - Large input field (text-lg)                  │ │ │ │
 * │  │  │  │ - Clear button OR ESC hint (right)             │ │ │ │
 * │  │  │  │ - Focus underline animation                    │ │ │ │
 * │  │  │  └────────────────────────────────────────────────┘ │ │ │
 * │  │  │                                                      │ │ │
 * │  │  │  ┌─ CONTENT AREA (conditional) ──────────────────┐ │ │ │
 * │  │  │  │                                               │ │ │ │
 * │  │  │  │ IF (query is empty):                         │ │ │ │
 * │  │  │  │ ┌─ SEARCH SUGGESTIONS ──────────────────┐   │ │ │ │
 * │  │  │  │ │ (SearchSuggestions.tsx)              │   │ │ │ │
 * │  │  │  │ │ - Popular Searches                   │   │ │ │ │
 * │  │  │  │ │   • Honda parts                      │   │ │ │ │
 * │  │  │  │ │   • Brake pads                       │   │ │ │ │
 * │  │  │  │ │   • etc.                             │   │ │ │ │
 * │  │  │  │ │ - Recent Searches                    │   │ │ │ │
 * │  │  │  │ │ - Browse Categories (grid)          │   │ │ │ │
 * │  │  │  │ │   • Engine • Brakes                 │   │ │ │ │
 * │  │  │  │ │   • Wheels • Suspension             │   │ │ │ │
 * │  │  │  │ │   • Transmission • Lighting         │   │ │ │ │
 * │  │  │  │ └────────────────────────────────────┘   │ │ │ │
 * │  │  │  │                                           │ │ │ │
 * │  │  │  │ ELSE (query has text):                   │ │ │ │
 * │  │  │  │ ┌─ Search Button ──────────────────────┐ │ │ │ │
 * │  │  │  │ │ Search for "user query"             │ │ │ │ │
 * │  │  │  │ │ (bg-gray-900 hover:bg-gray-800)    │ │ │ │ │
 * │  │  │  │ └───────────────────────────────────┘ │ │ │ │
 * │  │  │  └───────────────────────────────────────┘ │ │ │
 * │  │  │                                            │ │ │
 * │  │  └────────────────────────────────────────────┘ │ │
 * │  └──────────────────────────────────────────────────┘ │
 * └────────────────────────────────────────────────────────────────────┘
 * 
 * DATA FLOW:
 * ──────────
 * 
 * SearchButton (state manager)
 *   ├── searchQuery: string
 *   ├── showTooltip: boolean
 *   └── useSearchDialog hook → { isOpen, open, close }
 *       │
 *       ├─ Pass to SearchDialog:
 *       │  ├── isOpen
 *       │  ├── searchQuery
 *       │  ├── onQueryChange (update searchQuery)
 *       │  ├── onSearch (handle submission)
 *       │  ├── onClose (close dialog)
 *       │  └── onSuggestionSelect (set query from suggestion)
 *       │
 *       └─ SearchDialog renders:
 *          ├── SearchInput (child component)
 *          │  ├── value: searchQuery
 *          │  ├── onChange: onQueryChange
 *          │  ├── onClear: () => onQueryChange("")
 *          │  └── showHint: !searchQuery
 *          │
 *          └── SearchSuggestions OR Search Button
 *             └── onSelect: onSuggestionSelect
 * 
 * INTERACTION FLOW:
 * ─────────────────
 * 
 * User clicks icon
 *   ↓
 * SearchButton.onClick → open()
 *   ↓
 * useSearchDialog sets isOpen = true
 *   ↓
 * SearchDialog renders (with animation)
 *   ↓
 * SearchInput auto-focuses
 *   ↓
 * User types in input
 *   ↓
 * onQueryChange updates searchQuery state
 *   ↓
 * SearchDialog conditionally renders suggestions or search button
 *   ↓
 * User clicks suggestion OR types + hits Enter
 *   ↓
 * onSearch callback fires → close dialog → console.log search
 *   ↓
 * Dialog closes with animation
 *   ↓
 * Body scroll is unlocked
 * 
 * KEYBOARD SHORTCUTS:
 * ──────────────────
 * Ctrl+K (Windows/Linux) or Cmd+K (Mac)
 *   → useSearchDialog hook listens
 *   → Calls open() if not already open
 *   → SearchButton.onClick effect
 *
 * Escape key
 *   → useSearchDialog hook listens
 *   → Calls close() if dialog is open
 *   → Dialog closes
 * 
 * STYLING INHERITANCE:
 * ────────────────────
 * Premium/Luxury features:
 *   ✓ Soft shadows (shadow-2xl)
 *   ✓ Smooth animations (scale + fade, 300ms)
 *   ✓ Minimal borders (only subtle dividers)
 *   ✓ Large, light typography (text-lg font-light)
 *   ✓ Generous padding and spacing
 *   ✓ Backdrop blur (backdrop-blur-md)
 *   ✓ Dark overlay (bg-black/40)
 *   ✓ Hover states (subtle gray background)
 *   ✓ Focus states (underline animation)
 */
