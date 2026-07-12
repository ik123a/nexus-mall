"use client";

import { motion } from "framer-motion";
import { Play, Heart, Users, Eye, Radio, Tv, Calendar, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { getTrending } from "@/constants/products";
import Image from "next/image";

export default function LivePage() {
  const liveShows = [
    { id: 1, host: "LUXE Atelier", product: "Spring Couture Drop", viewer: 12482, image: getTrending()[0]?.image || "", category: "Fashion" },
    { id: 2, host: "Quantum", product: "Lens AR Launch Event", viewer: 8234, image: getTrending()[2]?.image || "", category: "Tech" },
    { id: 3, host: "Aura", product: "Glow Serum Tutorial", viewer: 5921, image: getTrending()[10]?.image || "", category: "Beauty" },
    { id: 4, host: "Solis", product: "Diamond Atelier Reveal", viewer: 4521, image: getTrending()[7]?.image || "", category: "Jewelry" },
    { id: 5, host: "Pulse", product: "Carbon X Performance Test", viewer: 3185, image: getTrending()[5]?.image || "", category: "Sports" },
    { id: 6, host: "Neo", product: "VR Arena Open House", viewer: 2103, image: getTrending()[14]?.image || "", category: "Gaming" },
  ];

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-4">
              <span className="text-gradient">Live</span> Shopping
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto">Watch exclusive drops, get styling tips, and shop in real-time with our hosts</p>
          </motion.div>

          {/* Featured live stream */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Card className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="lg:col-span-2 relative aspect-video lg:aspect-auto bg-gradient-to-br from-brand/10 via-emerald/10 to-emerald-light/10 flex items-center justify-center min-h-[300px]">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-red-500/90 text-[11px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full" />
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1.5 rounded-full glass px-3 py-1.5 text-xs flex items-center gap-1.5">
                      <Eye className="w-3 h-3" /> 12,482 watching
                    </span>
                  </div>
                  <button className="w-20 h-20 rounded-full bg-gradient-to-br from-brand/80 to-emerald/80 backdrop-blur-xl flex items-center justify-center">
                    <Play className="w-9 h-9 ml-1" />
                  </button>
                </div>
                <div className="p-6 lg:p-8">
                  <span className="text-xs text-brand font-medium">FEATURED LIVE</span>
                  <h2 className="text-2xl font-bold mt-2 mb-3">Spring Couture Drop — LUXE Atelier</h2>
                  <p className="text-sm text-white/60 mb-4">Watch as our designer unveils the 2026 spring collection, with live customization and shoppable moments.</p>

                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-10 h-10"><AvatarImage src="https://i.pravatar.cc/100?img=20" /><AvatarFallback>L</AvatarFallback></Avatar>
                    <div>
                      <p className="text-sm font-medium">Hosted by Marie Laurent</p>
                      <p className="text-xs text-white/40">248k followers</p>
                    </div>
                  </div>

                  <Button className="w-full">Join Live Now</Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Live grid */}
          <h2 className="text-2xl font-bold mb-6">Upcoming & Other Shows</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveShows.map((show, i) => (
              <motion.div key={show.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-0 overflow-hidden hover:border-blue-400/30 transition group cursor-pointer">
                  <div className="relative aspect-video">
                    <Image src={show.image} alt={show.product} className="w-full h-full object-cover group-hover:scale-105 transition" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-red-500/90 text-[10px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className="p-1.5 rounded-full glass"><Heart className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass px-2 py-1 rounded-full text-[11px]">
                      <Users className="w-3 h-3" /> {show.viewer.toLocaleString()}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"><Play className="w-6 h-6 ml-0.5" /></button>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-brand">{show.category}</span>
                    <h3 className="font-bold mt-1 group-hover:text-brand transition">{show.product}</h3>
                    <p className="text-xs text-white/40 mt-1">Hosted by {show.host}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Schedule teaser */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-16">
            <Card className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Don't miss upcoming shows</h3>
                  <p className="text-sm text-white/50">Get notified 15 min before they start</p>
                </div>
              </div>
              <Button>Subscribe to Live Calendar</Button>
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