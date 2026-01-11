# Product Components - Directory Structure

## 📁 New Component Organization

```
client/app/components/
├── product/                          ← NEW organized directory
│   ├── index.ts                      ← Centralized exports
│   ├── ProductGallery.tsx            ← Image viewer
│   ├── ProductSummary.tsx            ← Price, title, stock
│   ├── ProductSpecs.tsx              ← Technical specifications
│   ├── FitmentBadge.tsx              ← Vehicle compatibility badge
│   ├── AddToCartPanel.tsx            ← Cart, quantity, wishlist
│   ├── CompatibilityTable.tsx        ← Vehicle fitment table
│   └── RelatedProducts.tsx           ← Product recommendations
│
└── Products/                         ← Existing directory (kept for cards)
    ├── Beauty/
    │   ├── ProductCardVertical.tsx
    │   └── ProductCardHorizontal.tsx
    └── [old files can be removed]
```

---

## 🎯 Component Breakdown

### **1. ProductGallery.tsx** (Client Component)

**Purpose:** Display product images with zoom and thumbnail navigation

**Props:**

```typescript
interface ProductGalleryProps {
  images: string[];
  productName: string;
}
```

**Features:**

- Main image display
- Thumbnail grid (if multiple images)
- Zoom on hover effect
- Fallback for missing images
- Next.js Image optimization

**Usage:**

```tsx
<ProductGallery images={[product.image_url]} productName={product.title} />
```

---

### **2. ProductSummary.tsx** (Client Component)

**Purpose:** Display product title, price, stock, and integrate cart panel

**Props:**

```typescript
interface ProductSummaryProps {
  product: ProductDetail;
  inStock: boolean;
  formattedPrice: string;
}
```

**Features:**

- Product title and part number
- Brand display
- Price with GST indicator
- Stock status badge
- Integrates AddToCartPanel
- Warranty information badge
- Sticky positioning on desktop

**Usage:**

```tsx
<ProductSummary
  product={product}
  inStock={inStock}
  formattedPrice={formattedPrice}
/>
```

---

### **3. FitmentBadge.tsx** (Client Component)

**Purpose:** Show vehicle compatibility status

**Props:**

```typescript
interface FitmentBadgeProps {
  isCompatible?: boolean;
  vehicleName?: string;
  compact?: boolean;
}
```

**Features:**

- Two variants: compact and full
- Green (compatible) / Red (incompatible)
- Optional vehicle name display
- Icon indicators

**Usage:**

```tsx
{
  /* Compact version */
}
<FitmentBadge isCompatible={true} compact />;

{
  /* Full version with vehicle name */
}
<FitmentBadge isCompatible={true} vehicleName="Honda Civic 2018" />;
```

---

### **4. AddToCartPanel.tsx** (Client Component)

**Purpose:** Handle cart operations, quantity selection, wishlist, and sharing

**Props:**

```typescript
interface AddToCartPanelProps {
  productId: number;
  productTitle: string;
  price: number;
  stockCount: number;
  inStock: boolean;
}
```

**Features:**

- Quantity selector with +/- buttons
- Stock limit validation
- Add to cart button with loading state
- Wishlist toggle
- Share functionality (native + fallback)
- Total price preview for multiple items

**Usage:**

```tsx
<AddToCartPanel
  productId={product.id}
  productTitle={product.title}
  price={product.price}
  stockCount={product.stock_count}
  inStock={inStock}
/>
```

**State Management:**

```typescript
const [quantity, setQuantity] = useState(1);
const [isWishlisted, setIsWishlisted] = useState(false);
const [isAdding, setIsAdding] = useState(false);
```

---

### **5. ProductSpecs.tsx** (Server Component)

**Purpose:** Display technical specifications in organized grid

**Props:**

```typescript
interface ProductSpecsProps {
  attributes: Record<string, any>;
  partNumber?: string;
}
```

**Features:**

- 3-column responsive grid
- Dynamic attribute rendering
- Auto-formatting (snake_case → Title Case)
- Boolean handling (true/false → Yes/No)
- Array handling (joins with commas)
- Special sections for warranty and origin
- Part number display

**Usage:**

```tsx
<ProductSpecs
  attributes={product.attributes}
  partNumber={product.part_number}
/>
```

---

### **6. CompatibilityTable.tsx** (Client Component)

**Purpose:** Display and filter compatible vehicles

**Props:**

```typescript
interface CompatibilityTableProps {
  vehicles: CompatibleVehicle[];
}
```

**Features:**

- Collapsible section
- Search functionality
- Pagination (load more)
- Desktop: Table view
- Mobile: Card view
- Filter by make, model, variant

**State:**

```typescript
const [isExpanded, setIsExpanded] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [visibleCount, setVisibleCount] = useState(10);
```

**Usage:**

```tsx
<CompatibilityTable vehicles={product.compatible_vehicles} />
```

---

### **7. RelatedProducts.tsx** (Server Component)

**Purpose:** Fetch and display related products

**Props:**

```typescript
interface RelatedProductsProps {
  categorySlug?: string;
  currentProductId: number;
}
```

**Features:**

- Server-side data fetching
- Category-based filtering
- Suspense boundary with skeleton
- Auto-excludes current product
- 4-column responsive grid

**Usage:**

```tsx
<RelatedProducts
  categorySlug={product.category_slug}
  currentProductId={product.id}
/>
```

---

## 🔄 Import Patterns

### **Option 1: Individual Imports**

```typescript
import ProductGallery from "@/app/components/product/ProductGallery";
import ProductSummary from "@/app/components/product/ProductSummary";
import AddToCartPanel from "@/app/components/product/AddToCartPanel";
```

### **Option 2: Centralized Import (Recommended)**

```typescript
import {
  ProductGallery,
  ProductSummary,
  ProductSpecs,
  FitmentBadge,
  AddToCartPanel,
  CompatibilityTable,
  RelatedProducts,
} from "@/app/components/product";
```

---

## 🎨 Component Composition

### **Main Product Page Structure:**

```tsx
<main>
  {/* Breadcrumbs */}

  <div className="grid lg:grid-cols-12">
    {/* Left: Gallery (7 cols) */}
    <ProductGallery />

    {/* Right: Summary (5 cols) */}
    <ProductSummary>
      {/* Contains: */}
      <AddToCartPanel />
      <FitmentBadge />
    </ProductSummary>
  </div>

  {/* Specifications */}
  <ProductSpecs />

  {/* Compatibility */}
  <CompatibilityTable />

  {/* Info Section */}

  {/* Related Products */}
  <RelatedProducts />
</main>
```

---

## 🔧 Customization Guide

### **Change Quantity Increment**

```typescript
// AddToCartPanel.tsx
const handleQuantityChange = (delta: number) => {
  setQuantity((prev) => {
    const newQty = prev + delta; // Change delta value
    return Math.max(1, Math.min(stockCount, newQty));
  });
};
```

### **Modify Specs Grid Columns**

```typescript
// ProductSpecs.tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Change lg:grid-cols-3 to desired number */}
</div>
```

### **Adjust Related Products Count**

```typescript
// RelatedProducts.tsx
params.append("limit", "8"); // Change to desired number
.slice(0, 4); // Change display count
```

### **Change Compatibility Pagination**

```typescript
// CompatibilityTable.tsx
const [visibleCount, setVisibleCount] = useState(10); // Initial
setVisibleCount((prev) => prev + 10); // Increment
```

---

## 🎯 Server vs Client Components

### **Server Components** (Default)

✅ `ProductSpecs.tsx` - Static content  
✅ `RelatedProducts.tsx` - Data fetching

**Benefits:**

- No JavaScript sent to client
- Better SEO
- Faster initial load

### **Client Components** ("use client")

✅ `ProductGallery.tsx` - Image interactions  
✅ `ProductSummary.tsx` - Sticky positioning  
✅ `FitmentBadge.tsx` - Dynamic display  
✅ `AddToCartPanel.tsx` - Cart operations  
✅ `CompatibilityTable.tsx` - Search & filter

**Benefits:**

- Interactive features
- State management
- Event handlers

---

## 📊 Data Flow

```
Product Page (Server)
    ↓
Fetch Product Data
    ↓
Pass to Components
    ↓
┌─────────────────┬─────────────────┐
│ Server          │ Client          │
├─────────────────┼─────────────────┤
│ ProductSpecs    │ ProductGallery  │
│ RelatedProducts │ ProductSummary  │
│                 │ AddToCartPanel  │
│                 │ FitmentBadge    │
│                 │ CompatibilityTbl│
└─────────────────┴─────────────────┘
```

---

## ✅ Migration Checklist

If migrating from old structure:

- [ ] Update imports in `products/[slug]/page.tsx`
- [ ] Test all component functionality
- [ ] Verify responsive design
- [ ] Check loading states
- [ ] Test error boundaries
- [ ] Validate SEO meta tags
- [ ] Remove old component files (optional)

---

## 🚀 Benefits of New Structure

1. **Better Organization**

   - All product components in one directory
   - Clear naming conventions
   - Easy to find and maintain

2. **Improved Modularity**

   - Each component has single responsibility
   - Easy to test individually
   - Reusable across pages

3. **Cleaner Imports**

   - Centralized index.ts
   - Shorter import paths
   - Better IDE autocomplete

4. **Enhanced Maintainability**

   - Isolated component logic
   - Easier debugging
   - Simpler updates

5. **Performance Optimized**
   - Server components where possible
   - Client components only when needed
   - Reduced JavaScript bundle

---

## 📝 Component Checklist

Each component includes:

- ✅ TypeScript interfaces
- ✅ Proper prop validation
- ✅ Responsive design
- ✅ Accessibility (ARIA labels)
- ✅ Loading states (where applicable)
- ✅ Error handling
- ✅ Consistent styling
- ✅ Documentation

---

This new structure provides a solid foundation for building and maintaining your product detail pages!
