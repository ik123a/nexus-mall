"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Check, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

/**
 * The six posts in /blog are linked from the index with /blog/<slug>, but no
 * [slug] route existed, so every one of them 404'd. This route is the missing
 * half of that link. Posts stay in the index module so there is one source of
 * truth for the slugs.
 */
import { posts } from "../posts";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  async function share(): Promise<void> {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: post?.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // A cancelled native share sheet is a user choice, not a failure; only
      // the clipboard path reports back through `copied`.
    }
  }

  if (!post) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
            <p className="text-white/50 mb-6">That article doesn&apos;t exist or has been unpublished.</p>
            <Link href="/blog">
              <Button variant="premium" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to the Journal
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
        <CommandMenu />
        <Toaster />
      </main>
    );
  }

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to the Journal
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[10px] text-blue-400 font-medium mb-4"
          >
            {post.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-display font-black mb-6"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center gap-5 text-sm text-white/50 mb-8 pb-8 border-b border-white/10"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {post.readTime} read
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" /> {post.author}
            </span>
            <button
              type="button"
              onClick={() => void share()}
              className="ml-auto inline-flex items-center gap-2 hover:text-white transition-colors"
              aria-label={copied ? "Link copied" : "Share this story"}
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              {copied ? "Copied" : "Share"}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden glass mb-12"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </motion.div>

          <div className="space-y-6 text-white/70 leading-relaxed text-lg">
            <p className="text-xl text-white/85">{post.excerpt}</p>
            <p>
              The NEXUS Journal follows the people and materials reshaping what a
              destination store can be. This piece is part of an ongoing series
              reporting from the floors, the ateliers and the labs behind the
              brands we carry.
            </p>
            <p>
              Our editors spent time with the teams behind the work, and the
              result is a story less about spectacle than about the decisions
              that rarely make it into a product page. The short version: the
              next generation of retail is being built by people who treat
              craft and computation as the same discipline.
            </p>
            <p>
              More from the Journal, including interviews with the designers,
              makers and operators we work with, arrives every week.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-8">Keep reading</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <Card className="p-0 overflow-hidden h-full hover:border-blue-400/30 transition">
                    <div className="relative h-32">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <span className="text-[10px] text-blue-400">{p.category}</span>
                      <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-blue-400 transition">
                        {p.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                All stories <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}
