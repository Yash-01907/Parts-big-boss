# Product Detail Page - Quick Reference

## 🎯 Component Hierarchy

```
page.tsx (Server Component)
│
├── Navbar (Server)
│
├── Breadcrumbs (Server)
│
├── Main Grid (12 columns)
│   ├── ProductGallery (Client) - 7 cols
│   │   ├── Main Image
│   │   └── Thumbnails
│   │
│   └── ProductSummary (Client) - 5 cols
│       ├── Title & Part Number
│       ├── Price
│       ├── Stock Status
│       ├── Quantity Selector
│       ├── Add to Cart
│       └── Wishlist/Share
│
├── Key Specifications (Server)
│   └── 3-column grid from attributes
│
├── CompatibilityTable (Client)
│   ├── Search bar
│   ├── Filterable table
│   └── Load more
│
├── Product Information (Server)
│   └── Trust badges
│
├── RelatedProducts (Server)
│   └── Suspense boundary
│
└── Footer (Server)
```

---

## 🔄 Server vs Client Components

### **Server Components** (Faster, SEO-friendly)

- ✅ `page.tsx` - Main page
- ✅ `RelatedProducts.tsx` - Data fetching
- ✅ Breadcrumbs
- ✅ Specifications section
- ✅ Product information

### **Client Components** (Interactive)

- ✅ `ProductGallery.tsx` - Image interactions
- ✅ `ProductSummary.tsx` - Cart, quantity
- ✅ `CompatibilityTable.tsx` - Search, expand

---

## 📱 Responsive Behavior

### **Mobile (< 640px)**

```
┌─────────────────┐
│ Breadcrumbs     │
├─────────────────┤
│ Gallery         │
│ (full width)    │
├─────────────────┤
│ Summary         │
│ (sticky)        │
├─────────────────┤
│ Specs           │
│ (1 column)      │
├─────────────────┤
│ Compatibility   │
│ (cards)         │
├─────────────────┤
│ Info            │
├─────────────────┤
│ Related         │
│ (2 columns)     │
└─────────────────┘
```

### **Desktop (≥ 1024px)**

```
┌─────────────────────────────┐
│ Breadcrumbs                 │
├──────────────┬──────────────┤
│ Gallery      │ Summary      │
│ (7/12)       │ (5/12)       │
│              │ [STICKY]     │
├──────────────┴──────────────┤
│ Specs (3 columns)           │
├─────────────────────────────┤
│ Compatibility (table)       │
├─────────────────────────────┤
│ Info (3 columns)            │
├─────────────────────────────┤
│ Related (4 columns)         │
└─────────────────────────────┘
```

---

## 🎨 Key CSS Classes

### **Layout**

```css
/* Main grid */
grid-cols-1 lg:grid-cols-12

/* Gallery */
lg:col-span-7

/* Summary */
lg:col-span-5 sticky top-24

/* Specs */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Related */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

### **Spacing**

```css
/* Container */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12

/* Sections */
mb-8 (between sections)
gap-8 (grid gaps)
space-y-6 (vertical spacing)
```

---

## 🚀 Quick Start

### **1. Test the Page**

```bash
# Navigate to any product
http://localhost:3000/products/[slug]

# Example
http://localhost:3000/products/denso-spark-plug-part-3291
```

### **2. Check Loading State**

```bash
# Throttle network in DevTools to see skeleton
```

### **3. Test 404**

```bash
# Invalid slug
http://localhost:3000/products/invalid-slug-123
```

---

## 🔧 Common Customizations

### **Change Sticky Offset**

```typescript
// ProductSummary.tsx
<div className="sticky top-24"> // Change top-24 to desired offset
```

### **Adjust Related Products Count**

```typescript
// RelatedProducts.tsx
params.append("limit", "8"); // Change to desired number
```

### **Modify Compatibility Pagination**

```typescript
// CompatibilityTable.tsx
const [visibleCount, setVisibleCount] = useState(10); // Initial count
setVisibleCount((prev) => prev + 10); // Load more increment
```

---

## 📊 Data Structure

### **Product Object**

```typescript
{
  id: number;
  title: string;
  slug: string;
  part_number: string;
  price: number; // in paise
  stock_count: number;
  image_url: string;
  attributes: {
    brand?: string;
    warranty?: string;
    // ... other attributes
  };
  category_id: number;
  category_name: string;
  category_slug: string;
  compatible_vehicles: [
    {
      variant_id: number;
      make_name: string;
      model_name: string;
      year_from: number;
      year_to: number;
      submodel?: string;
    }
  ];
}
```

---

## 🐛 Troubleshooting

### **Product Not Loading**

1. Check API endpoint: `http://localhost:5000/api/products/:slug`
2. Verify slug exists in database
3. Check server logs for errors
4. Ensure Redis is running

### **Images Not Showing**

1. Verify `image_url` in database
2. Check Next.js Image configuration
3. Ensure CORS headers if external images

### **Related Products Empty**

1. Check if category has other products
2. Verify category_slug is correct
3. Check API response in Network tab

---

## ✅ Checklist Before Deploy

- [ ] Test all product pages
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test loading states
- [ ] Verify error handling
- [ ] Test 404 page
- [ ] Check image optimization
- [ ] Verify cache headers
- [ ] Test share functionality
- [ ] Check accessibility (ARIA labels)

---

## 📚 Files Reference

| File                     | Purpose              | Type   |
| ------------------------ | -------------------- | ------ |
| `page.tsx`               | Main product page    | Server |
| `loading.tsx`            | Loading skeleton     | Server |
| `error.tsx`              | Error boundary       | Client |
| `not-found.tsx`          | 404 page             | Server |
| `ProductGallery.tsx`     | Image viewer         | Client |
| `ProductSummary.tsx`     | Price, cart, actions | Client |
| `CompatibilityTable.tsx` | Vehicle table        | Client |
| `RelatedProducts.tsx`    | Recommendations      | Server |

---

## 🎯 Performance Tips

1. **Enable ISR**

   ```typescript
   export const revalidate = 3600; // 1 hour
   ```

2. **Use Static Generation for Popular Products**

   ```typescript
   export async function generateStaticParams() {
     // Return array of slugs
   }
   ```

3. **Optimize Images**

   - Use Next.js Image component
   - Serve WebP format
   - Lazy load below fold

4. **Minimize Client JS**
   - Keep Server Components as default
   - Only use "use client" when needed

---

This quick reference should help you navigate and customize the product detail page implementation!
