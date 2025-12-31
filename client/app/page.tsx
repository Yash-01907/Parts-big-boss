"use client";
import { bootstrapAuth } from "./store/bootstrapAuth";
import Navbar from "./components/Sections/Navbar";
import HeroSlider from "./components/Hero-Slider/HeroSlider";
import VehicleSelector from "./components/Sections/VehicleSelector";
import FeaturedProductsSection from "./components/Sections/FeaturedProductsSection";
import CustomerReviewSection from "./components/Sections/CustomerReviewSection";
import CategoryGrid from "./components/Sections/CategoryGrid";
import BrandMarquee from "./components/Sections/BrandMarquee";
import Footer from "./components/Sections/Footer";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    bootstrapAuth();
  }, []);
  return (
    <>
      <Navbar />

      <main className="w-full pb-20 bg-[var(--surface-hover)] min-h-screen">
        <HeroSlider />

        <div className="z-10 px-4">
           <VehicleSelector />
        </div>

        {/* Featured Products Section Demo */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"> 
       <FeaturedProductsSection />
        </section>
        <section>
            <CustomerReviewSection />
        </section>
        <section>
            <CategoryGrid />
        </section>
        <section>
            <BrandMarquee />
        </section>
        {/* Future sections go here */}
        {/* <FeaturedCategories /> */}
        {/* <BestSellers /> */}
        {/* <DealsStrip /> */}
      </main>
        <Footer/>
    </>
  );
}
