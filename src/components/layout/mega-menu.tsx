"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { categories } from "@/constants/categories";

export function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="relative text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5 py-1">
        Stores
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[700px] glass-strong rounded-2xl p-8 grid grid-cols-4 gap-x-8 gap-y-6 shadow-2xl shadow-blue-500/10"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition">
                  <span className="text-xs font-bold">{cat.name[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-medium group-hover:text-blue-400 transition">{cat.name}</div>
                  <div className="text-[10px] text-white/40">{cat.productCount.toLocaleString()} items</div>
                </div>
              </Link>
            ))}
            {/* Footer */}
            <div className="col-span-4 mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>16 stores · 5 floors · 6,232 products</span>
              <Link href="/mall" onClick={() => setOpen(false)} className="text-blue-400 hover:text-blue-300 transition">
                Explore 3D Mall →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}