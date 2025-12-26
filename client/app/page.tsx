"use client";

import Navbar from "./components/Navbar/Navbar";
import HeroSlider from "./components/Hero-Slider/HeroSlider";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full">
        <HeroSlider />

        {/* Future sections go here */}
        {/* <FeaturedCategories /> */}
        {/* <BestSellers /> */}
        {/* <DealsStrip /> */}
      </main>
    </>
  );
}
