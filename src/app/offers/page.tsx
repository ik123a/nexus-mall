"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Tag, ArrowRight, Flame, Clock, Sparkles } from "lucide-react";
import { getOnOffer } from "@/constants/products";
import { ProductCard } from "@/components/products/product-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

/**
 * Current offers: every product with a real markdown, deepest discount first.
 *
 * This route was missing. The navbar labelled its /coupons link "Offers",
 * which is why /offers was linked in the first place and then repointed --
 * two different ideas sharing one label. Coupons are promo codes you apply at
 * checkout; this is what is already reduced. Both now exist and are distinct.
 */
export default function OffersPage() {
  const offers = getOnOffer();
  const [sortBy, setSortBy] = useState<"discount" | "price-asc" | "price-desc">("discount");

  const sorted = [...offers].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return b.discountPct - a.discountPct;
    }
  });

  const best = sorted[0];
  const totalSaving = offers.reduce((sum, p) => sum + (p.comparePrice! - p.price), 0);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-black mb-2">
                Current <span className="text-gradient">Offers</span>
              </h1>
              <p className="text-white/50">
                {offers.length} reduced {offers.length === 1 ? "item" : "items"}
                {totalSaving > 0 && (
                  <> · save up to ₹{totalSaving.toLocaleString()} in total</>
                )}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort offers"
              className="glass px-4 py-2 rounded-xl text-sm border border-white/10"
            >
              <option value="discount">Biggest discount</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </motion.div>

          {/* Deepest cut */}
          {best && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <Card className="p-8 relative overflow-hidden bg-gradient-to-r from-brand/10 via-emerald/10 to-emerald-light/10 border-brand/20">
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-4 h-4 text-yellow-400" />
                      <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-bold">
                        BIGGEST CUT
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">{best.name}</h2>
                    <p className="text-white/60 mb-1">{best.description}</p>
                    <p className="text-white/50 text-sm mb-4">
                      <span className="text-white/30 line-through mr-2">
                        ₹{best.comparePrice!.toLocaleString()}
                      </span>
                      <span className="text-blue-400 font-bold">₹{best.price.toLocaleString()}</span>
                    </p>
                    <Button asChild>
                      <Link href={`/product/${best.id}`}>
                        View product <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-gradient mb-1">
                      {best.discountPct}%
                    </div>
                    <div className="text-white/50 text-sm">OFF</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* No custom badge here: ProductCard already renders the struck
              price and a -{n}% chip, so a second overlay repeated the same
              number twice on one card. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>

          {offers.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <p className="text-white/50 mb-4">Nothing is reduced right now.</p>
              <Button variant="outline" asChild>
                <Link href="/shop">Browse all products</Link>
              </Button>
            </div>
          )}

          {/* Coupons are a different thing; cross-link rather than blur them. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-emerald/20 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5 text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Have a promo code?</h3>
                <p className="text-sm text-white/50">
                  Coupons stack on top of these prices at checkout.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/coupons">
                  <Sparkles className="w-4 h-4 mr-2" /> View coupons
                </Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}
