"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Camera, Video, Star, Filter, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { userReviews } from "@/constants/reviews";
import { products, getTrending } from "@/constants/products";
import Image from "next/image";

export default function CommunityPage() {
  const trending = getTrending().slice(0, 4);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-4">
              Join the <span className="text-gradient">NEXUS Community</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto">Real reviews, real people. Share your finds, see what others love.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {userReviews.map((review, i) => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12"><AvatarImage src={review.user.avatar} /><AvatarFallback>{review.user.name[0]}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{review.user.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                              <span className="flex">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</span>
                              <span>· {review.date}</span>
                            </div>
                          </div>
                          <button className="p-2 rounded-xl hover:bg-white/5 transition"><Share2 className="w-4 h-4" /></button>
                        </div>
                        <h4 className="font-bold mt-3 mb-1">{review.title}</h4>
                        <p className="text-sm text-white/70 leading-relaxed mb-3">{review.content}</p>
                        {review.images && (
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {review.images.map((img, j) => (
                              <Image key={j} src={img} alt="" className="aspect-square object-cover rounded-xl" fill sizes="33vw" />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <button className="flex items-center gap-1 hover:text-pink-400 transition"><Heart className="w-4 h-4" /> {review.helpful}</button>
                          <button className="flex items-center gap-1 hover:text-blue-400 transition"><MessageCircle className="w-4 h-4" /> Reply</button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <Button className="w-full"><Camera className="w-4 h-4 mr-2" /> Share a Review</Button>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</h3>
                  <div className="space-y-2 text-sm">
                    {["All", "Photos", "Videos", "5 Stars", "Verified"].map((f) => (
                      <label key={f} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded accent-blue-500" /> {f}</label>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-400" /> Trending Products</h3>
                <div className="space-y-3">
                  {trending.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="flex items-center gap-3 group">
                      <Image src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" fill sizes="56px" />
                      <div className="flex-1">
                        <p className="text-xs text-blue-400">{p.brand}</p>
                        <p className="font-medium text-sm group-hover:text-blue-400 transition line-clamp-1">{p.name}</p>
                        <p className="text-xs text-white/50">${p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}