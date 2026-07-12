"use client";

import { motion } from "framer-motion";
import { Heart, Trash2, X, ShoppingBag } from "lucide-react";
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

export default function WishlistPage() {
  const { wishlist, remove, add, toggleWishlist } = useCart();
  const wishlistProducts = wishlist.map(id => getProductById(id)).filter(Boolean);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-black mb-2">Wishlist</h1>
            <p className="text-white/50">{wishlistProducts.length} saved items</p>
          </motion.div>

          {wishlistProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 glass rounded-3xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white/50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-white/50 mb-8">Save items you love and we'll notify you on price drops.</p>
              <Button asChild size="lg">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistProducts.map((product, i) => (
                  <motion.div
                    key={product!.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-0 overflow-hidden hover:border-pink-400/30 transition">
                      <div className="relative aspect-square">
                        <Image src={product!.image} alt={product!.name} fill className="object-cover" sizes="300px" />
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                          {product!.isNew && (
                            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-[10px] font-semibold">NEW</span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                          <button onClick={() => toggleWishlist(product!.id)} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition" aria-label="Remove from wishlist">
                            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-blue-400">{product!.brand}</p>
                        <Link href={`/product/${product!.id}`}>
                          <h3 className="font-semibold line-clamp-1 mb-2">{product!.name}</h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-white/50">
                            <span className="flex items-center gap-0.5">
                              <span className="w-3 h-3 fill-yellow-400 text-yellow-400">★</span>
                              {product!.rating}
                            </span>
                          </div>
                          <span className="font-bold text-lg">${product!.price.toLocaleString()}</span>
                        </div>
                        <Button onClick={() => add(product!.id)} className="w-full mt-4" size="sm">
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}