"use client";

import { motion } from "framer-motion";
import { Copy, Clock, Tag, Sparkles, Tag as TagIcon, Percent, Zap, BadgeCheck, Shield } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

const coupons = [
  { code: "NEXUS15", discount: "15% Off", desc: "Sitewide on full-price items", expires: "Jul 31, 2026", tier: "Public", used: false },
  { code: "WELCOME20", discount: "20% Off", desc: "First order only", expires: "Aug 15, 2026", tier: "New Members", used: false },
  { code: "ELITE10", discount: "10% Off", desc: "Stackable with sale items", expires: "Jul 20, 2026", tier: "Elite", used: false },
  { code: "FLASH25", discount: "25% Off", desc: "Select tech & electronics", expires: "Tonight 11:59 PM", tier: "Flash Sale", used: false },
  { code: "STYLE50", discount: "$50 Off", desc: "Orders $300+ on fashion", expires: "Jul 31, 2026", tier: "Member", used: false },
  { code: "BEAUTY15", discount: "15% Off", desc: "All beauty & skincare", expires: "Aug 5, 2026", tier: "Public", used: false },
];

export default function CouponsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-black mb-4">
              Active <span className="text-gradient">Coupons</span>
            </h1>
            <p className="text-white/50">Stack savings on top of sales. Applied automatically at checkout.</p>
          </motion.div>

          {/* Featured banner */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <Card className="p-8 relative overflow-hidden bg-gradient-to-r from-brand/10 via-emerald/10 to-emerald-light/10 border-brand/20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/20 to-transparent animate-pulse" />
              </div>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-bold">FLASH SALE</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Flash Sale: 25% Off Tech</h2>
                  <p className="text-white/60 mb-4">Code <strong>FLASH25</strong> on Quantum, Neo & Gadget Lab. Ends tonight at 11:59 PM.</p>
                  <Button onClick={() => { setCopied("FLASH25"); setTimeout(() => setCopied(null), 2000); }}>
                    <Copy className="w-4 h-4 mr-2" /> {copied === "FLASH25" ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gradient mb-1">25%</div>
                  <div className="text-white/50 text-sm">OFF</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Coupon grid */}
          <div className="space-y-4">
            {coupons.map((c, i) => (
              <motion.div key={c.code} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand/20 to-emerald/20 flex items-center justify-center">
                      <Percent className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="text-lg font-bold text-gradient font-mono">{c.code}</code>
                        <Button variant="outline" size="sm" onClick={() => { setCopied(c.code); setTimeout(() => setCopied(null), 2000); }}>
                          <Copy className="w-3.5 h-3.5 mr-1" /> {copied === c.code ? "Copied" : "Copy"}
                        </Button>
                      </div>
                      <p className="text-sm text-white/60 mt-1">{c.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <span className="px-3 py-1 rounded-full glass text-xs text-white/60 border border-white/10">{c.tier}</span>
                    <span className="text-sm text-white/50"><Clock className="w-3.5 h-3.5 inline mr-1" /> Expires {c.expires}</span>
                    <Button size="sm" variant={c.used ? "outline" : "default"}>
                      {c.used ? "Applied" : "Apply"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tier info */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-16 space-y-6">
            {[
              { name: "Public", desc: "Available to all shoppers", icon: Sparkles },
              { name: "Member", desc: "Free NEXUS membership required", icon: BadgeCheck },
              { name: "Elite", desc: "NEXUS Elite members only", icon: Shield },
              { name: "Flash", desc: "Limited time, limited quantity", icon: Zap },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-emerald/20 flex items-center justify-center">
                    <t.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t.name} Tier</h3>
                    <p className="text-sm text-white/50">{t.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}