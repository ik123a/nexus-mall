"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Eye, Share2, ChevronLeft, ChevronRight, Star,
  Truck, Shield, Sparkles, Minus, Plus, X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { products, getRelated } from "@/constants/products";
import { useCart } from "@/store/use-cart";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { ProductViewer3D } from "@/components/three/product-viewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

export function ProductPageClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const { add, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  const related = getRelated(product.id);

  return (
    <main className="pt-16 pb-20">
      <Navbar />
      <CommandMenu />
      <Toaster />

      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-white/40" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/70 transition">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-white/70 transition">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-white/70 transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/30 line-clamp-1">{product.name}</span>
        </nav>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative glass rounded-3xl overflow-hidden aspect-square">
              <Tabs defaultValue="3d" className="w-full h-full">
                <TabsList className="absolute top-4 left-4 right-4 z-10 bg-transparent">
                  <TabsTrigger value="3d" className="glass-strong text-xs">3D View</TabsTrigger>
                  <TabsTrigger value="photos" className="glass-strong text-xs">Photos</TabsTrigger>
                  <TabsTrigger value="ar" className="glass-strong text-xs">AR Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="3d" className="w-full h-full">
                  <ProductViewer3D color="#3b82f6" kind="octahedron" />
                </TabsContent>

                <TabsContent value="photos" className="w-full h-full">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="50vw"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="w-full h-full flex items-center justify-center">
                  <div className="glass rounded-2xl p-8 text-center max-w-sm">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="font-bold mb-2">AR Preview</h3>
                    <p className="text-sm text-white/50 mb-4">Point your camera to see this product in your space</p>
                    <Button className="w-full">Launch AR</Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-brand to-emerald text-[10px] font-semibold">
                    NEW
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-[10px] font-semibold">
                    -{discount}%
                  </span>
                )}
                {product.isTrending && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-[10px] font-semibold">
                    TRENDING
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-400 text-red-400" : "text-white/70"}`} />
                </button>
                <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition">
                  <Share2 className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[product.image, ...product.images].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition ${
                      selectedImage === img ? "ring-2 ring-brand" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs text-brand uppercase tracking-wider">{product.brand}</span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                  <span>|</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl font-bold text-gradient">${product.price.toLocaleString()}</span>
              {product.comparePrice && (
                <span className="text-xl text-white/30 line-through">${product.comparePrice.toLocaleString()}</span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-sm font-semibold">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed border-t border-white/5 pt-6">{product.description}</p>

            {/* Features */}
            <div className="border-t border-white/5 pt-6">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 1 && (
              <div className="border-t border-white/5 pt-6">
                <label className="block text-sm font-medium mb-3">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-offset-black ring-brand scale-105"
                          : "hover:ring-1 ring-white/20"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="border-t border-white/5 pt-6">
                <label className="block text-sm font-medium mb-3">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl glass text-sm font-medium transition ${
                        selectedSize === size
                          ? "bg-brand/30 border-brand/40 text-white"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center bg-transparent border-none focus:outline-none text-white"
                  />
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={() => add(product.id, { color: selectedColor, size: selectedSize })}
                disabled={!product.inStock}
                className="w-full"
                size="lg"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <p className="text-center text-xs text-white/40 flex items-center justify-center gap-2">
                <Truck className="w-3 h-3" /> Free 2-4hr delivery · <Shield className="w-3 h-3" /> Secure checkout
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="border-t border-white/5 pt-6">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="prose prose-invert max-w-none text-white/60">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 mt-4">
                    {product.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specs">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <dt className="text-white/50">Brand</dt><dd className="font-medium">{product.brand}</dd>
                  <dt className="text-white/50">Category</dt><dd className="font-medium">{product.category}</dd>
                  <dt className="text-white/50">In Stock</dt><dd className="font-medium text-green-400">{product.inStock ? "Yes" : "No"}</dd>
                  <dt className="text-white/50">Colors</dt><dd className="font-medium">{product.colors?.length || 1}</dd>
                  <dt className="text-white/50">Sizes</dt><dd className="font-medium">{product.sizes?.length || 1}</dd>
                  <dt className="text-white/50">Rating</dt><dd className="font-medium">{product.rating}/5</dd>
                </dl>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {products.filter(r => r.id !== product.id).slice(0, 3).map((p) => (
                    <Card key={p.id} className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{p.brand[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{p.brand}</div>
                          <div className="flex items-center gap-1 text-xs text-white/50">
                            <span>Verified Buyer</span>
                            <span className="text-green-400">✓ Verified</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">Great {p.category} product</h4>
                      <p className="text-sm text-white/60">{p.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                        <span>12 helpful</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Truck className="w-6 h-6 text-brand" />
                    <div>
                      <div className="font-medium">Same-Day Delivery</div>
                      <div className="text-sm text-white/50">2-4 hours in 47 cities</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="font-medium">30-Day Returns</div>
                      <div className="text-sm text-white/50">Free return pickup</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/product/${p.id}`} className="block">
                    <Card className="p-0 overflow-hidden hover:border-brand/30 transition">
                      <Image src={p.image} alt={p.name} className="w-full h-48 object-cover" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      <div className="p-4">
                        <p className="text-xs text-brand">{p.brand}</p>
                        <h3 className="font-semibold line-clamp-1">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold">${p.price}</span>
                          {p.comparePrice && <span className="text-sm text-white/30 line-through">${p.comparePrice}</span>}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}