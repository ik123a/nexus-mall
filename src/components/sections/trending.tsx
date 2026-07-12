"use client";

import { motion } from "framer-motion";
import { products, getTrending, getNewArrivals } from "@/constants/products";
import { ProductCard } from "@/components/products/product-card";

export function TrendingProducts() {
  const trending = getTrending().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 8);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">Trending</span> Now
            </h2>
            <p className="text-white/50">Flying off the shelves this week</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white transition">Trending</button>
            <button className="px-4 py-2 rounded-full glass text-sm text-white/40 hover:text-white/60 transition">New Arrivals</button>
            <button className="px-4 py-2 rounded-full glass text-sm text-white/40 hover:text-white/60 transition">Best Sellers</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trending.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}