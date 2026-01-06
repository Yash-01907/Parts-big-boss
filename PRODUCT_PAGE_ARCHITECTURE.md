# Product Detail Page - Server Component Architecture

## 🎯 Overview

This is a **production-ready, server-side rendered** product detail page implementation using Next.js 14+ App Router with optimal performance and SEO.

---

## 📁 File Structure

```
client/app/
├── products/
│   └── [slug]/
│       ├── page.tsx          ← Main Server Component
│       ├── loading.tsx        ← Loading skeleton
│       ├── error.tsx          ← Error boundary
│       └── not-found.tsx      ← 404 page
│
└── components/
    └── Products/
        ├── ProductGallery.tsx        ← Image viewer (Client)
        ├── ProductSummary.tsx        ← Price, cart, actions (Client)
        ├── CompatibilityTable.tsx    ← Vehicle table (Client)
        └── RelatedProducts.tsx       ← Recommendations (Server)
```

---

## 🏗️ Architecture

### **Server Components** (Default)

- `page.tsx` - Main product page
- `RelatedProducts.tsx` - Fetches related products server-side

### **Client Components** ("use client")

- `ProductGallery.tsx` - Image interactions
- `ProductSummary.tsx` - Add to cart, quantity selector
- `CompatibilityTable.tsx` - Search, expand/collapse

---

## 📐 Layout Structure

### **Desktop (12-Column Grid)**

```
┌─────────────────────────────────────────┐
│ Breadcrumbs                             │
├──────────────────────┬──────────────────┤
│ Gallery (7 cols)     │ Summary (5 cols) │
│ - Main image         │ - Title          │
│ - Thumbnails         │ - Price          │
│                      │ - Stock          │
│                      │ - Quantity       │
│                      │ - Add to Cart    │
│                      │ - Wishlist/Share │
├──────────────────────┴──────────────────┤
│ Key Specifications (3-column grid)      │
├──────────────────────────────────────────┤
│ Compatibility Table (Collapsible)       │
│ - Search bar                             │
│ - Filterable table                       │
│ - Load more pagination                   │
├──────────────────────────────────────────┤
│ Description / Product Information        │
│ - Trust badges                           │
├──────────────────────────────────────────┤
│ Related Products (4-column grid)         │
└──────────────────────────────────────────┘
```

### **Mobile Behavior**

- ✅ Vertical stacking
- ✅ Sticky summary on scroll
- ✅ Collapsible compatibility section
- ✅ Responsive table → card view
- ✅ Touch-optimized quantity selector

---

## 🚀 Key Features

### **1. Server-Side Rendering**

```typescript
// Automatic data fetching on server
async function getProduct(slug: string) {
  const response = await fetch(`${API_URL}/api/products/${slug}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  return response.json();
}
```

### **2. SEO Optimization**

```typescript
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return {
    title: `${product.title} - ${product.part_number}`,
    description: `Buy ${product.title} at ₹${price}...`,
    openGraph: { ... }
  };
}
```

### **3. Performance Features**

- ✅ Redis caching (backend)
- ✅ ISR (Incremental Static Regeneration)
- ✅ Image optimization with Next.js Image
- ✅ Lazy loading for related products
- ✅ Streaming with Suspense

### **4. User Experience**

- ✅ Loading skeletons
- ✅ Error boundaries
- ✅ 404 handling
- ✅ Sticky add-to-cart
- ✅ Quantity validation
- ✅ Share functionality
- ✅ Wishlist toggle

---

## 🎨 Component Breakdown

### **ProductGallery** (Client Component)

**Features:**

- Main image display
- Thumbnail navigation
- Zoom on hover effect
- Fallback for missing images

**Props:**

```typescript
interface ProductGalleryProps {
  images: string[];
  productName: string;
}
```

---

### **ProductSummary** (Client Component)

**Features:**

- Sticky positioning (`sticky top-24`)
- Price display
- Stock status indicator
- Quantity selector with validation
- Add to cart button
- Wishlist toggle
- Share functionality
- Warranty badge

**Props:**

```typescript
interface ProductSummaryProps {
  product: ProductDetail;
  inStock: boolean;
  formattedPrice: string;
}
```

**State Management:**

```typescript
const [quantity, setQuantity] = useState(1);
const [isWishlisted, setIsWishlisted] = useState(false);
```

---

### **CompatibilityTable** (Client Component)

**Features:**

- Collapsible section
- Search functionality
- Pagination (load more)
- Responsive table/card view
- Filter by make, model, variant

**Props:**

```typescript
interface CompatibilityTableProps {
  vehicles: CompatibleVehicle[];
}
```

**State:**

```typescript
const [isExpanded, setIsExpanded] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [visibleCount, setVisibleCount] = useState(10);
```

---

### **RelatedProducts** (Server Component)

**Features:**

- Server-side data fetching
- Category-based filtering
- Suspense boundary
- Loading skeleton
- Automatic exclusion of current product

**Data Fetching:**

```typescript
async function getRelatedProducts(categorySlug, currentProductId) {
  const response = await fetch(
    `${API_URL}/api/products/search?category_slug=${categorySlug}&limit=8`
  );
  const data = await response.json();
  return data.results.filter((p) => p.id !== currentProductId).slice(0, 4);
}
```

---

## 🔄 Data Flow

```
User Request
    ↓
Next.js Server Component (page.tsx)
    ↓
Fetch from API (/api/products/:slug)
    ↓
Redis Cache Check
    ↓
PostgreSQL Query (if cache miss)
    ↓
Return Product Data
    ↓
Render HTML on Server
    ↓
Hydrate Client Components
    ↓
Interactive UI
```

---

## 📊 Database Query

The backend controller executes this optimized query:

```sql
SELECT
  p.id, p.title, p.slug, p.part_number, p.price,
  p.stock_count, p.image_url, p.attributes,
  p.created_at, p.updated_at,
  c.id as category_id,
  c.name as category_name,
  c.slug as category_slug,
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object(
        'variant_id', vv.id,
        'make_name', vm.name,
        'model_name', vmo.name,
        'year_from', vv.year_from,
        'year_to', vv.year_to,
        'submodel', vv.submodel
      )
    ) FILTER (WHERE vv.id IS NOT NULL),
    '[]'
  ) as compatible_vehicles
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_vehicle_fitment pvf ON p.id = pvf.product_id
LEFT JOIN vehicle_variants vv ON pvf.vehicle_variant_id = vv.id
LEFT JOIN vehicle_models vmo ON vv.model_id = vmo.id
LEFT JOIN vehicle_makes vm ON vmo.make_id = vm.id
WHERE p.slug = $1
GROUP BY p.id, c.id, c.name, c.slug
```

---

## 🎯 Responsive Breakpoints

```css
/* Mobile First */
default: 1 column

/* Tablet */
sm: (640px+)
  - Gallery: full width
  - Summary: full width
  - Specs: 2 columns
  - Related: 2 columns

/* Desktop */
lg: (1024px+)
  - Gallery: 7/12 columns
  - Summary: 5/12 columns (sticky)
  - Specs: 3 columns
  - Related: 4 columns
```

---

## 🧪 Testing Checklist

### **Functionality**

- [ ] Product loads correctly
- [ ] Images display properly
- [ ] Price formatted correctly (₹)
- [ ] Stock status accurate
- [ ] Quantity selector works
- [ ] Add to cart button functional
- [ ] Wishlist toggle works
- [ ] Share button works
- [ ] Compatibility search works
- [ ] Related products load

### **Performance**

- [ ] Page loads in < 2s
- [ ] Images optimized
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling
- [ ] Lazy loading works

### **SEO**

- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Breadcrumbs structured data
- [ ] Proper heading hierarchy
- [ ] Alt text on images

### **Responsive**

- [ ] Mobile layout correct
- [ ] Tablet layout correct
- [ ] Desktop layout correct
- [ ] Touch targets adequate
- [ ] No horizontal scroll

---

## 🔧 Configuration

### **Environment Variables**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### **Revalidation**

```typescript
// In page.tsx
export const revalidate = 3600; // 1 hour

// Or per-fetch
fetch(url, { next: { revalidate: 3600 } });
```

---

## 🚀 Deployment Considerations

### **Static Generation (Recommended)**

```typescript
// Generate static pages for popular products
export async function generateStaticParams() {
  const products = await getPopularProducts();
  return products.map((p) => ({ slug: p.slug }));
}
```

### **Caching Strategy**

- **Backend:** Redis (1 hour TTL)
- **Frontend:** ISR (1 hour revalidation)
- **CDN:** Edge caching for static assets

---

## 📈 Performance Metrics

**Target Scores:**

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## 🎨 Styling

**CSS Variables Used:**

```css
--accent: Primary brand color (red)
--surface-hover: Background color
--text-primary: Main text color
--text-secondary: Secondary text color
```

**Tailwind Classes:**

- Responsive grid: `grid-cols-1 lg:grid-cols-12`
- Sticky positioning: `sticky top-24`
- Animations: `animate-pulse`, `transition-all`

---

## 🔮 Future Enhancements

1. **Image Gallery**

   - Multiple images
   - Zoom modal
   - 360° view

2. **Reviews & Ratings**

   - Customer reviews
   - Star ratings
   - Review submission

3. **Live Inventory**

   - Real-time stock updates
   - Low stock warnings
   - Notify when available

4. **Personalization**

   - Recently viewed
   - Recommended for you
   - Saved for later

5. **Social Proof**
   - "X people bought this"
   - "Trending in category"
   - Customer photos

---

## ✅ Summary

This implementation provides:

- ✅ **Server-side rendering** for optimal SEO
- ✅ **Component-based architecture** for maintainability
- ✅ **Responsive design** for all devices
- ✅ **Performance optimization** with caching
- ✅ **Excellent UX** with loading states and error handling
- ✅ **Production-ready** code quality

The page is fully integrated with your existing database schema and follows Next.js 14+ best practices!
