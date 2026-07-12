"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Star, MapPin, Clock, Heart, Truck, Package, Users, Shield, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { products, getProductsByCategory, getProduct } from "@/constants/products";
import { floors } from "@/constants/floors";

const allStores = floors.flatMap((f) => f.stores);

export default function StorePage() {
  const params = useParams();
  const slug = params.slug as string;
  const store = allStores.find((s) => s.id === slug);

  if (!store) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Store Not Found</h1>
            <Link href="/mall">
              <Button variant="premium" className="gap-2 mt-4"><ChevronLeft className="w-4 h-4" />Back to Mall</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const storeProducts = getProductsByCategory(store.category).slice(0, 8);

  const hours = [
    { day: "Mon–Fri", open: "10:00 AM", close: "10:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "11:00 PM" },
    { day: "Sunday", open: "11:00 AM", close: "9:00 PM" },
  ];

  const features = [
    { icon: Star, label: "Rating", value: `${store.rating}/5.0` },
    { icon: MapPin, label: "Floor", value: store.floor === -1 ? "Parking Garage" : store.floor === 0 ? "Ground Floor" : store.floor === 1 ? "First Floor" : "Second Floor" },
    { icon: Shield, label: "Status", value: store.isOpen ? "Open Now" : "Closed" },
    { icon: Package, label: "Category", value: store.category.charAt(0).toUpperCase() + store.category.slice(1) },
  ];

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-blue-500/10 -top-40 -left-40" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-12 items-start lg:items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-full lg:w-1/2"
            >
              <div className="aspect-video rounded-3xl overflow-hidden glass">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {!store.isOpen && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-6 py-3 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 font-medium">
                      Currently Closed
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full lg:w-1/2"
            >
              <Link href="/mall" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white mb-4">
                <ChevronLeft className="w-4 h-4" /> Back to Mall
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-4">{store.name}</h1>
              <p className="text-lg text-white/60 mb-6">{store.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((f) => (
                  <div key={f.label} className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </div>
                    <div className="font-semibold">{f.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="premium" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Visit in 3D Mall
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Follow Store
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products ({storeProducts.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {hours.map((h, i) => (
                  <motion.div
                    key={h.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-6 text-center"
                  >
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{h.day}</div>
                    <div className="flex items-center justify-center gap-2 font-mono">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{h.open} – {h.close}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Store Highlights</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Truck className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-medium">Free Delivery</p>
                      <p className="text-sm text-white/50">On orders over ₹2,999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Package className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-sm text-white/50">30-day free returns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Users className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-medium">Personal Stylist</p>
                      <p className="text-sm text-white/50">Book a free session</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass rounded-xl">
                    <Shield className="w-6 h-6 text-amber-400" />
                    <div>
                      <p className="font-medium">Authenticity Guaranteed</p>
                      <p className="text-sm text-white/50">Verified products only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products */}
            <TabsContent value="products">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {storeProducts.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="group hover:border-blue-400/30 transition overflow-hidden">
                      <Link href={`/product/${p.id}`}>
                        <div className="aspect-square overflow-hidden bg-white/5">
                          <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider">{p.brand}</p>
                        <Link href={`/product/${p.id}`}>
                          <h4 className="font-semibold mt-1 line-clamp-1">{p.name}</h4>
                        </Link>
                        <p className="text-blue-400 font-bold mt-1">₹{p.price.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/shop?category=${store.category}`}>
                    View All {store.category.charAt(0).toUpperCase() + store.category.slice(1)} Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
                    <p className="text-white/50 mb-6">Be the first to review this store after your visit!</p>
                    <Button variant="premium" className="gap-2">
                      <Star className="w-4 h-4" />
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About */}
            <TabsContent value="about">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {store.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">{store.description}</p>
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Brand</p>
                        <p className="font-medium">{store.brand}</p>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Category</p>
                        <p className="font-medium capitalize">{store.category}</p>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Location</p>
                        <p className="font-medium">{store.floor === -1 ? "Parking Garage" : store.floor === 0 ? "Ground Floor" : store.floor === 1 ? "First Floor" : "Second Floor"}</p>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Status</p>
                        <p className="font-medium flex items-center gap-2">{store.isOpen ? (<span className="w-2 h-2 rounded-full bg-green-400" />) : (<span className="w-2 h-2 rounded-full bg-red-400" />)} {store.isOpen ? "Open" : "Closed"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Visit Us in the 3D Mall</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60 mb-4">Experience {store.name} in our immersive 3D mall. Walk through the aisles, try products virtually, and chat with our AI stylists.</p>
                    <Button size="lg" variant="premium" className="w-full gap-2" asChild>
                      <Link href="/mall">
                        <MapPin className="w-5 h-5" />
                        Enter 3D Mall
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
}