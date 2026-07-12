"use client";

import { motion } from "framer-motion";
import { Scale, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/use-cart";
import { products, getProductById } from "@/constants/products";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

const compareAttributes = [
  "Price",
  "Brand",
  "Rating",
  "In Stock",
  "Colors",
  "Sizes",
  "Key Feature",
];

export default function ComparePage() {
  const { compare, remove: removeCompare, toggleCompare } = useCart();
  const compareProducts = compare.map(id => getProductById(id)).filter(Boolean);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-display font-black mb-2">Compare Products</h1>
              <p className="text-white/50">{compareProducts.length} of 4 selected</p>
            </div>
            {compareProducts.length > 0 && (
              <Button variant="outline" onClick={() => compare.forEach(id => toggleCompare(id))} size="sm">
                Clear All
              </Button>
            )}
          </motion.div>

          {compareProducts.length < 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 glass rounded-3xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Scale className="w-10 h-10 text-white/50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Add products to compare</h2>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                Select up to 4 products from any page to see a side-by-side comparison of specs, prices, and features.
              </p>
              <Button asChild size="lg">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-semibold">Attribute</th>
                    {compareProducts.map((product) => (
                      <th key={product!.id} className="text-center py-4 px-4">
                        <div className="relative aspect-square max-w-xs mx-auto">
                          <Image src={product!.image} alt={product!.name} fill className="object-cover rounded-xl" sizes="200px" />
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-blue-400">{product!.brand}</p>
                          <Link href={`/product/${product!.id}`}>
                            <h3 className="font-semibold line-clamp-1">{product!.name}</h3>
                          </Link>
                          <div className="flex items-center justify-center gap-1 mt-1 text-xs text-white/50">
                            <span className="flex items-center gap-0.5">
                              <span className="w-3 h-3 fill-yellow-400 text-yellow-400">★</span>
                              {product!.rating}
                            </span>
                          </div>
                          <p className="font-bold text-gradient">${product!.price.toLocaleString()}</p>
                          <button onClick={() => toggleCompare(product!.id)} className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center justify-center gap-1">
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {compareAttributes.map((attr, i) => (
                    <tr key={attr} className={i % 2 === 0 ? "bg-white/3" : ""}>
                      <td className="py-4 px-4 font-medium text-white/70">{attr}</td>
                      {compareProducts.map((product) => (
                        <td key={product!.id} className="py-4 px-4 text-center text-white/60">
                          {(() => {
                            switch (attr) {
                              case "Price": return <span className="font-bold text-gradient">${product!.price.toLocaleString()}</span>;
                              case "Brand": return <span>{product!.brand}</span>;
                              case "Rating": return <span className="flex items-center justify-center gap-1"><span className="w-3 h-3 fill-yellow-400 text-yellow-400">★</span>{product!.rating}</span>;
                              case "In Stock": return <span className={product!.inStock ? "text-green-400" : "text-red-400"}>{product!.inStock ? "✓ In Stock" : "✗ Out of Stock"}</span>;
                              case "Colors": return <span>{product!.colors?.length || 1} options</span>;
                              case "Sizes": return <span>{product!.sizes?.length || 1} options</span>;
                              case "Key Feature": return <span className="text-sm max-w-xs mx-auto">{product!.features[0]}</span>;
                              default: return <span>—</span>;
                            }
                          })()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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