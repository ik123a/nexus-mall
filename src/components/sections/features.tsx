"use client";

import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Shield, Sparkles, Zap, Headphones, Gift, Truck } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Concierge", desc: "Your personal stylist and shopper" },
  { icon: ShoppingBag, title: "3D Product View", desc: "Rotate, zoom, try before you buy" },
  { icon: Truck, title: "Same-Day Delivery", desc: "In 47 cities in 2-4 hours" },
  { icon: Shield, title: "Secure Vault", desc: "Crypto, BNPL, biometric payments" },
  { icon: Headphones, title: "Premium Support", desc: "Real humans, 24/7, under 30s" },
  { icon: Gift, title: "Elite Rewards", desc: "5% back, early access, VIP events" },
  { icon: CreditCard, title: "Flexible Payments", desc: "Crypto, UPI, cards, wallet" },
  { icon: Zap, title: "Smart Outfits", desc: "AI-generated looks from your closet" },
];

export function Features() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Everything <span className="text-gradient">You Expect</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">And more. Because the future shouldn&apos;t look like the past.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group glass rounded-2xl p-6 text-center hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-white/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}