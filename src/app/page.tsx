"use client";

import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { CategoryShowcase } from "@/components/sections/categories";
import { TrendingProducts } from "@/components/sections/trending";
import { BrandsMarquee } from "@/components/sections/brands";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandsMarquee />
      <Features />
      <CategoryShowcase />
      <TrendingProducts />
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}