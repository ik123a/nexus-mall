"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, Heart, X, Gift, Shield, Truck, Sparkles } from "lucide-react";
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

export default function CartPage() {
  const { items, remove, updateQty, clear, wishlist, toggleWishlist } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [showGiftOptions, setShowGiftOptions] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const p = getProductById(item.productId);
    return sum + (p?.price || 0) * item.quantity;
  }, 0);

  const discount = appliedCoupon ? subtotal * 0.15 : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon && ["NEXUS15", "WELCOME20", "ELITE10"].includes(coupon.toUpperCase())) {
      setAppliedCoupon(coupon.toUpperCase());
    }
  };

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-display font-black mb-10">Shopping Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 glass rounded-3xl"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand/20 to-emerald/20 flex items-center justify-center">
                <Gift className="w-10 h-10 text-white/50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-white/50 mb-8">Looks like you haven't added anything yet.</p>
              <Button asChild size="lg">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item, i) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <motion.div
                        key={`${item.productId}-${item.color}-${item.size}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass rounded-2xl p-4 flex gap-4"
                      >
                        <Link href={`/product/${product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 block">
                          <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs text-brand">{product.brand}</p>
                              <Link href={`/product/${product.id}`}>
                                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                              </Link>
                              <div className="flex items-center gap-2 mt-1 text-sm text-white/50">
                                {item.color && <span className="px-2 py-0.5 rounded bg-white/5">{item.color}</span>}
                                {item.size && <span className="px-2 py-0.5 rounded bg-white/5">{item.size}</span>}
                              </div>
                            </div>
                            <button
                              onClick={() => remove(item.productId, { color: item.color, size: item.size })}
                              className="p-2 rounded-xl hover:bg-white/10 transition text-white/40 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">${product.price}</span>
                            </div>
                            <div className="flex items-center gap-2 border border-white/10 rounded-xl overflow-hidden">
                              <button onClick={() => updateQty(item.productId, item.quantity - 1, { color: item.color, size: item.size })} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition"><Minus className="w-4 h-4" /></button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button onClick={() => updateQty(item.productId, item.quantity + 1, { color: item.color, size: item.size })} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition"><Plus className="w-4 h-4" /></button>
                            </div>
                            <span className="font-bold text-lg text-gradient">${(product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <Card className="p-6 sticky top-24">
                    <h2 className="font-bold mb-4">Order Summary</h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-white/60">Shipping</span><span className="font-medium text-green-400">Free</span></div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-400"><span>Discount ({appliedCoupon})</span><span className="font-medium">-${discount.toFixed(2)}</span></div>
                      )}
                      <div className="border-t border-white/10 pt-3"></div>
                      <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-gradient">${total.toFixed(2)}</span></div>
                    </div>

                    {/* Coupon */}
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Promo Code</h3>
                      <div className="flex gap-2">
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="NEXUS15, WELCOME20..."
                          className="flex-1 glass px-4 py-2 rounded-xl text-sm border border-white/10"
                        />
                        <Button onClick={applyCoupon} size="sm" disabled={!coupon || !!appliedCoupon}>
                          Apply
                        </Button>
                      </div>
                      {appliedCoupon && (
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> 15% applied
                        </p>
                      )}
                    </div>

                    {/* Gift options */}
                    <div className="mt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showGiftOptions}
                          onChange={() => setShowGiftOptions(!showGiftOptions)}
                          className="w-4 h-4 rounded border-white/20 bg-transparent accent-brand"
                        />
                        <span className="text-sm">Add gift wrap & message (+$4.99)</span>
                      </label>
                      {showGiftOptions && (
                        <div className="mt-3 p-3 glass rounded-xl space-y-2">
                          <textarea placeholder="Gift message (max 160 chars)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" maxLength={160} rows={3} />
                        </div>
                      )}
                    </div>

                    <Button asChild className="w-full mt-6" size="lg">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>

                    <p className="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-2">
                      <Shield className="w-3 h-3" /> Secure checkout · <Truck className="w-3 h-3" /> Free 2-4hr delivery
                    </p>
                  </Card>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.filter(p => !items.some(i => i.productId === p.id)).slice(0, 4).map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link href={`/product/${p.id}`} className="block">
                        <Card className="p-0 overflow-hidden hover:border-brand/30 transition">
                          <div className="relative h-48">
                            <Image src={p.image} alt={p.name} fill sizes="300px" className="object-cover" />
                          </div>
                          <div className="p-4">
                            <p className="text-xs text-brand">{p.brand}</p>
                            <h4 className="font-semibold line-clamp-1">{p.name}</h4>
                            <span className="font-bold text-gradient">${p.price}</span>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
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

// Gift component
function GiftName({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
      <path d="M12 7v10" />
      <path d="M20 12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2" />
      <path d="M12 3a3 3 0 0 1 3 3v3H9V6a3 3 0 0 1 3-3z" />
    </svg>
  );
}