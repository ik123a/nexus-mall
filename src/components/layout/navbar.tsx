"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, User, Menu, X, Zap, Crown, Gamepad2, Sparkles } from "lucide-react";
import { useCart, useCartTotals } from "@/store/use-cart";
import { useUI } from "@/store/use-ui";
import { categories } from "@/constants/categories";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./mega-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCartTotals();
  const wishlist = useCart((s) => s.wishlist);
  const { isCommandOpen, setCommandOpen, isMobileMenuOpen, setMobileMenuOpen } = useUI();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCommandOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "relative text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-1";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-dark shadow-2xl shadow-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-gradient">NEXUS</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/mall" className={linkClass}>
              <Crown className="w-4 h-4" />
              3D Mall
            </Link>
            <Link href="/shop" className={linkClass}>Shop</Link>
            <MegaMenu />
            <Link href="/events" className={linkClass}>
              <Zap className="w-3.5 h-3.5" />
              Events
            </Link>
            <Link href="/offers" className={linkClass}>Offers</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs hover:bg-white/10 hover:text-white/60 transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search anything…</span>
              <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 hidden xl:inline">⌘K</kbd>
            </button>

            <button className="sm:hidden p-2" onClick={() => setCommandOpen(true)} aria-label="Search"><Search className="w-5 h-5 text-white/70" /></button>

            <Link href="/wishlist" className="relative p-2 hover:text-white text-white/70 transition">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "fill-red-400 text-red-400" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </Link>

            <Link href="/cart" className="relative p-2 hover:text-white text-white/70 transition">
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-[9px] flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            <Link href="/account" className="p-2 hover:text-white text-white/70 transition">
              <User className="w-5 h-5" />
            </Link>

            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 glass-strong rounded-b-3xl mx-2 p-6 space-y-4 lg:hidden"
          >
            <Link href="/mall" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 hover:text-blue-400 transition">
              <Crown className="w-5 h-5" /> 3D Mall
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 hover:text-blue-400 transition">
              Shop
            </Link>
            {categories.slice(0, 6).map((c) => (
              <Link key={c.id} href={`/shop?category=${c.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 hover:text-blue-400 transition">
                {c.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link href="/assistant" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-gradient">AI Concierge</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}