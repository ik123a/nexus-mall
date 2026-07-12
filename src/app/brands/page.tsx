"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Filter, X, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Electronics", count: 847, slug: "electronics" },
  { name: "Fashion", count: 1203, slug: "fashion" },
  { name: "Tech & Wearables", count: 562, slug: "tech" },
  { name: "Beauty & Wellness", count: 431, slug: "beauty" },
  { name: "Home & Living", count: 389, slug: "home" },
  { name: "Sports & Outdoors", count: 312, slug: "sports" },
  { name: "Accessories", count: 698, slug: "accessories" },
  { name: "Food & Beverage", count: 287, slug: "food" },
];

const brands = [
  { name: "Quantum", category: "Tech & Wearables", products: 12, slug: "quantum" },
  { name: "LUXE", category: "Fashion", products: 24, slug: "luxe" },
  { name: "Neon", category: "Sports & Outdoors", products: 18, slug: "neon" },
  { name: "AURA", category: "Beauty & Wellness", products: 15, slug: "aura" },
  { name: "Synthetik", category: "Electronics", products: 22, slug: "synthetik" },
  { name: "VOID", category: "Fashion", products: 19, slug: "void" },
  { name: "MERIDIAN", category: "Home & Living", products: 14, slug: "meridian" },
  { name: "PHASE", category: "Tech & Wearables", products: 11, slug: "phase" },
  { name: "ORIGIN", category: "Food & Beverage", products: 8, slug: "origin" },
  { name: "ECLIPSE", category: "Accessories", products: 16, slug: "eclipse" },
  { name: "NOMAD", category: "Sports & Outdoors", products: 13, slug: "nomad" },
  { name: "AETHER", category: "Beauty & Wellness", products: 10, slug: "aether" },
  { name: "VERTEX", category: "Electronics", products: 20, slug: "vertex" },
  { name: "ZENITH", category: "Fashion", products: 17, slug: "zenith" },
  { name: "POLARIS", category: "Home & Living", products: 9, slug: "polaris" },
  { name: "HELIX", category: "Tech & Wearables", products: 12, slug: "helix" },
  { name: "NOVA", category: "Accessories", products: 14, slug: "nova" },
  { name: "COSMIC", category: "Food & Beverage", products: 6, slug: "cosmic" },
  { name: "RADIANT", category: "Beauty & Wellness", products: 11, slug: "radiant" },
  { name: "PRIME", category: "Electronics", products: 23, slug: "prime" },
  { name: "ESSENCE", category: "Fashion", products: 15, slug: "essence" },
  { name: "ASCEND", category: "Sports & Outdoors", products: 9, slug: "ascend" },
  { name: "LUNAR", category: "Home & Living", products: 8, slug: "lunar" },
  { name: "SOLAR", category: "Tech & Wearables", products: 10, slug: "solar" },
];

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  return (
    <Card className="group hover:border-brand/30 transition-all duration-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center">
            <Tag className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-white/40 font-mono">{brand.products} products</span>
        </div>
        <h3 className="text-lg font-bold mb-1">{brand.name}</h3>
        <p className="text-xs text-white/50 uppercase tracking-wide">{brand.category}</p>
      </CardContent>
    </Card>
  );
}

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-emerald/20 -top-20 -left-20" />
        <div className="orb w-[400px] h-[400px] bg-emerald-light/20 top-40 -right-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">Discover</p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-6"
            >
              <span className="text-gradient">200+</span> Curated Brands
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60"
            >
              Every brand tells a story. We handpick only the ones worth telling.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                placeholder="Search brands, categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/40 mr-2">Filter by:</span>
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-full text-xs transition ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-brand to-emerald text-white"
                    : "glass border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    activeCategory === cat.name
                      ? "bg-gradient-to-r from-brand to-emerald text-white"
                      : "glass border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-white/50"
          >
            Showing {filteredBrands.length} of {brands.length} brands
          </motion.div>

          {/* Brand Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {filteredBrands.map((brand, i) => (
              <motion.div key={brand.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <BrandCard brand={brand} />
              </motion.div>
            ))}
            {filteredBrands.length === 0 && (
              <div className="col-span-full glass text-center py-12">
                <p className="text-white/50">No brands match your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}