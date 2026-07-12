"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, History, X, Command, Mic, Image as LucideImage, ArrowRight } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { products } from "@/constants/products";
import { trendingSearches, recentlyViewed } from "@/constants/reviews";
import { useUI } from "@/store/use-ui";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

export function CommandMenu() {
  const { isCommandOpen, setCommandOpen } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof products>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      setResults(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((t) => t.includes(q)),
        ).slice(0, 6),
      );
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (id: string) => {
    setCommandOpen(false);
    setQuery("");
    router.push(`/product/${id}`);
  };

  if (!isCommandOpen) return null;

  return (
    <Dialog open={isCommandOpen} onOpenChange={setCommandOpen}>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10" 
          onClick={() => { setCommandOpen(false); setQuery(""); }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          className="w-full max-w-xl glass-strong rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden border border-white/10"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
            <Search className="w-5 h-5 text-white/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything in the mall…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
            <div className="hidden sm:flex items-center gap-2 text-white/30">
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition" title="Voice search">
                <Mic className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition" title="Image search">
                <LucideImage className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => { setCommandOpen(false); setQuery(""); }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4 text-white/30" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto p-3">
            {query.length > 1 && results.length > 0 ? (
              <div className="space-y-1">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-white/5 transition group"
                  >
                    <NextImage src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" fill sizes="48px" />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium group-hover:text-blue-400 transition">{p.name}</div>
                      <div className="text-xs text-white/40">{p.brand} — ${p.price}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition" />
                  </button>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="text-center py-8 text-white/30 text-sm">No results found</div>
            ) : (
              <>
                {/* Trending searches */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 px-2 py-2 text-xs text-white/40">
                    <TrendingUp className="w-3.5 h-3.5" /> Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white/60 hover:bg-white/10 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recently viewed */}
                <div>
                  <div className="flex items-center gap-2 px-2 py-2 text-xs text-white/40">
                    <History className="w-3.5 h-3.5" /> Recently Viewed
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {recentlyViewed.map((id) => {
                      const p = products.find((x) => x.id === id);
                      return p ? (
                        <button
                          key={p.id}
                          onClick={() => handleSelect(p.id)}
                          className="group p-2 rounded-xl hover:bg-white/5 transition text-center"
                        >
                          <NextImage src={p.image} alt={p.name} className="w-full h-16 rounded-lg object-cover mb-1" fill sizes="33vw" />
                          <div className="text-[10px] text-white/50 group-hover:text-white/80 transition line-clamp-1">{p.name}</div>
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}