"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Shop: ["All Products", "New Arrivals", "Trending", "Sales", "Gift Cards"],
  Mall: ["Ground Floor", "First Floor", "Second Floor", "Food Court", "Cinema"],
  Account: ["Profile", "Orders", "Wishlist", "Rewards", "Settings"],
  Company: ["About", "Careers", "Blog", "Press", "Contact"],
  Support: ["FAQ", "Returns", "Shipping", "Privacy", "Terms"],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-black/80 mt-32">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="glass-strong rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 border border-blue-400/10">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Stay ahead of the future</h3>
            <p className="text-sm text-white/50">Weekly drops, early access, and NEXUS exclusives.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full sm:w-auto">
            <Input placeholder="you@email.com" className="min-w-[240px] bg-white/5" />
            <Button type="submit" size="lg">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold text-sm mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3 h-3" />
            </div>
            <span className="text-xs text-white/40">© 2026 NEXUS MALL — The Future of Shopping</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>🇺🇸 English · USD</span>
            <span>🛡️ PCI DSS Level 1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}