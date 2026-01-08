export interface HeroSlideData {
  id: number;
  image: string;
  alt: string;
  href: string;
  title?: string;
  description?: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: 1,
    image: "/top-view-hard-disk-with-white-light.jpg",
    alt: "Automobile brake system components",
    href: "/search?q=brakes",
    title: "Brake System Parts",
    description: "Reliable braking components for every vehicle",
  },
  {
    id: 2,
    image: "/close-up-car-engine.jpg",
    alt: "Automotive engine components",
    href: "/search?q=engine",
    title: "Engine Components",
    description: "High-performance engine parts and accessories",
  },
  {
    id: 3,
    image: "/detail-shot-wheel.jpg",
    alt: "Vehicle suspension system",
    href: "/search?q=suspension",
    title: "Suspension Systems",
    description: "Smooth rides with premium suspension solutions",
  },
];
