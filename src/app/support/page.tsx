"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, Phone, Mail, ChevronRight, FileText, Package, CreditCard, Truck, Shield } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

const categories = [
  { icon: Package, title: "Orders", desc: "Track, modify, cancel" },
  { icon: Truck, title: "Shipping", desc: "Delivery & tracking" },
  { icon: CreditCard, title: "Payment", desc: "Cards, crypto, BNPL" },
  { icon: Shield, title: "Returns", desc: "30-day return policy" },
  { icon: FileText, title: "Account", desc: "Profile, settings, security" },
  { icon: MessageCircle, title: "Membership", desc: "Elite, rewards, referrals" },
];

const faqs = [
  { q: "How fast is same-day delivery?", a: "Same-day delivery is available in 47 major cities, with orders arriving in 2-4 hours from checkout. Cut-off times vary by city, generally 8 PM local time." },
  { q: "Can I return items I bought live?", a: "Yes! All purchases, including items bought during live shows, are eligible for our standard 30-day return policy. We even pick up the return for free." },
  { q: "How does the NEXUS AI Concierge work?", a: "Our AI Concierge understands your style, budget, and occasion to recommend items, build outfits, and even design rooms. Just chat in plain language." },
  { q: "What payment methods do you accept?", a: "All major cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, PayPal, UPI, and select cryptocurrencies (BTC, ETH, SOL, USDC). Buy Now Pay Later is also available." },
  { q: "How do I become a NEXUS Elite member?", a: "You can upgrade any time from your account dashboard. Pricing varies by region, and Elite includes free express shipping, early drops, personal stylist, and 5% back on purchases." },
  { q: "What's the difference between wishlist and save-for-later?", a: "Both save items to your account, but \"Save for Later\" preserves cart configurations (color, size) for one-click reordering. Wishlist is more aspirational—just items you're eyeing." },
  { q: "Can I try products in AR before buying?", a: "Yes! Most products on NEXUS have an \"AR Preview\" option on the product page. We currently support iOS 15+ and Android 12+ devices." },
  { q: "Is my data safe with NEXUS?", a: "Absolutely. We use AES-256 encryption at rest, TLS 1.3 in transit, and are SOC 2 Type II certified. We never sell your data to third parties. See our Privacy Policy for details." },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const filtered = search.length > 0 ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())) : faqs;

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-black mb-4">
              How can we <span className="text-gradient">help</span>?
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">Real humans. 24/7. Average response time: 90 seconds.</p>

            <div className="max-w-2xl mx-auto mt-8 glass-strong rounded-2xl p-2 flex items-center gap-2 border border-white/10">
              <Search className="w-5 h-5 text-white/40 ml-4" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for help…" className="flex-1 bg-transparent py-3 px-2 focus:outline-none" />
            </div>
          </motion.div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {categories.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5 hover:border-blue-400/30 transition cursor-pointer text-center">
                  <c.icon className="w-7 h-7 mx-auto mb-3 text-blue-400" />
                  <h3 className="font-bold mb-1">{c.title}</h3>
                  <p className="text-xs text-white/50">{c.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold mb-6">Frequently Asked</h2>
          <div className="space-y-3 mb-12">
            {filtered.map((f, i) => (
              <motion.details key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <summary className="cursor-pointer glass rounded-2xl p-4 flex justify-between items-center hover:bg-white/5 transition list-none">
                  <span className="font-medium pr-3">{f.q}</span>
                  <ChevronRight className="w-4 h-4 text-white/40 transition group-open:rotate-90" />
                </summary>
                <div className="glass rounded-2xl p-4 mt-2 text-white/70 text-sm">{f.a}</div>
              </motion.details>
            ))}
          </div>

          {/* Talk to support */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
              <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
              <p className="text-white/60 mb-6">Our team is one tap away — choose your preferred channel.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Button className="w-full"><MessageCircle className="w-4 h-4 mr-2" /> Live Chat</Button>
                <Button asChild variant="outline" className="w-full"><a href="mailto:support@nexus.com"><Mail className="w-4 h-4 mr-2" /> Email</a></Button>
                <Button asChild variant="outline" className="w-full"><a href="tel:+18880000000"><Phone className="w-4 h-4 mr-2" /> Call</a></Button>
              </div>
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