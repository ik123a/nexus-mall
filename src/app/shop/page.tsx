"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { products, getProductsByCategory } from "@/constants/products";
import { categories } from "@/constants/categories";
import { ProductCard } from "@/components/products/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "newest">("newest");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = getProductsByCategory(activeCategory);
    }
    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      }
    });
    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-black mb-2">Shop All</h1>
              <p className="text-white/50">{filteredProducts.length} products available</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="glass px-4 py-2 rounded-xl text-sm border border-white/10"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "glass border border-white/10 text-white/60 hover:text-white"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === cat.slug
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "glass border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {cat.name} ({cat.productCount})
              </button>
            ))}
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-white/50">No products found in this category</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}