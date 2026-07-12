"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic, Image as ImageIcon, TrendingUp, Filter, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/constants/products";
import { categories } from "@/constants/categories";
import { trendingSearches } from "@/constants/reviews";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = query.length > 0
    ? products.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-6">
              Search the <span className="text-gradient">Mall</span>
            </h1>

            {/* Search bar */}
            <div className="max-w-3xl mx-auto glass-strong rounded-2xl p-2 flex items-center gap-2 border border-white/10">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 6,232 products, stores, brands…"
                className="flex-1 bg-transparent px-6 py-4 focus:outline-none text-white placeholder:text-white/30 text-base"
              />
              <button className="p-3 glass rounded-xl hover:bg-white/10 transition">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-3 glass rounded-xl hover:bg-white/10 transition">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Trending searches */}
          {query.length === 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-medium">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/60 hover:text-white hover:border-blue-400/30 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Suggestions */}
          <div className="mb-12">
            <h2 className="text-sm font-medium mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`glass rounded-2xl p-4 text-center hover:border-blue-400/30 transition ${
                    activeCategory === cat.slug ? "border-blue-400/50" : ""
                  }`}
                >
                  <Image src={cat.image} alt={cat.name} className="w-full aspect-square object-cover rounded-xl mb-2" fill sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12.5vw, 12.5vw" />
                  <p className="text-xs font-medium">{cat.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {query.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {filteredProducts.length} results for "{query}"
                </h2>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 glass rounded-3xl">
                  <Search className="w-12 h-12 mx-auto mb-4 text-white/30" />
                  <h3 className="text-xl font-bold mb-2">No results found</h3>
                  <p className="text-white/50 mb-8">Try adjusting your search or browse trending items below</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
}