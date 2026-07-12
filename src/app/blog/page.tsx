"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MessageSquare, Sparkles, Shield, Truck, BadgeCheck, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

const posts = [
  { slug: "spring-2026-trends", category: "Trends", title: "The 10 Trends Defining Spring 2026", excerpt: "From holographic fabrics to AI-generated silhouettes, here's what's next.", author: "Marie Laurent", date: "Jul 5, 2026", readTime: "6 min", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { slug: "behind-luxe", category: "Behind the Scenes", title: "Inside LUXE Atelier: Crafting the Future", excerpt: "A rare look at the atelier where haute couture meets advanced materials science.", author: "James Chen", date: "Jul 2, 2026", readTime: "8 min", image: "https://images.unsplash.com/photo-1609081214828-98e1b6b6e1c3?w=800&q=80" },
  { slug: "quantum-lens", category: "Tech", title: "Quantum Lens AR: The Future Is Transparent", excerpt: "How mixed-reality glasses are changing the way we shop, work, and play.", author: "Dr. Sarah Kim", date: "Jun 28, 2026", readTime: "5 min", image: "https://images.unsplash.com/photo-1572635196237-34b9ada94842?w=800&q=80" },
  { slug: "beauty-science", category: "Beauty", title: "The Science of Glow: Aura's Peptide Breakthrough", excerpt: "Why dermatologists are calling this serum the most innovative of the decade.", author: "Dr. Priya Sharma", date: "Jun 25, 2026", readTime: "4 min", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab9be?w=800&q=80" },
  { slug: "home-ai", category: "Style", title: "Studio Home: When AI Designs Your Living Room", excerpt: "We tested the AI room designer — the results were surprisingly personal.", author: "Alex Rivera", date: "Jun 20, 2026", readTime: "7 min", image: "https://images.unsplash.com/photo-1556228453-efd6901fdbca?w=800&q=80" },
  { slug: "sustainable-luxury", category: "Trends", title: "Sustainable Luxury Is No Longer an Oxymoron", excerpt: "How NEXUS brands are proving that opulence and ecology can coexist.", author: "Emma Watson", date: "Jun 15, 2026", readTime: "6 min", image: "https://images.unsplash.com/photo-1542838132-7c767ae3e0c2?w=800&q=80" },
];

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-4">
              The <span className="text-gradient">NEXUS Journal</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto">Stories from the front lines of fashion, tech, and culture</p>
          </motion.div>

          {/* Featured post */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6">
                  <div className="flex items-center gap-2 text-xs text-white/70 mb-3">
                    <BadgeCheck className="w-3 h-3 text-blue-400" /> Exclusive
                    <span>·</span>
                    <Calendar className="w-3 h-3" /> {posts[0].date}
                    <span>·</span>
                    <Clock className="w-3 h-3" /> {posts[0].readTime}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">{posts[0].title}</h2>
                  <p className="text-white/70 mb-4 max-w-md">{posts[0].excerpt}</p>
                  <Button asChild variant="outline">
                    <Link href={`/blog/${posts[0].slug}`}>Read Story <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
              <div className="p-8 lg:p-12 glass">
                <span className="text-xs text-blue-400 font-medium mb-2 block">{posts[0].category}</span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">{posts[0].title}</h3>
                <p className="text-white/60 mb-6">{posts[0].excerpt} The NEXUS Journal goes deep on the intersection of luxury, technology, and human creativity.</p>
                <div className="flex items-center gap-4">
                  <Image src="https://i.pravatar.cc/100?img=12" alt={posts[0].author} className="w-10 h-10 rounded-full" fill sizes="40px" />
                  <div>
                    <p className="font-medium">{posts[0].author}</p>
                    <p className="text-xs text-white/40">Senior Editor</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="p-0 overflow-hidden hover:border-blue-400/30 transition group">
                    <Image src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="p-5">
                      <span className="text-[10px] text-blue-400 font-medium">{post.category}</span>
                      <h3 className="font-bold mt-1 mb-2 group-hover:text-blue-400 transition line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-white/60 line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span><Calendar className="w-3 h-3 inline mr-1" /> {post.date}</span>
                        <span><Clock className="w-3 h-3 inline mr-1" /> {post.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg">Load More Stories</Button>
          </div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}