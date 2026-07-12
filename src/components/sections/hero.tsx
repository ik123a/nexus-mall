"use client";

import { motion } from "framer-motion";
import { MallScene } from "@/components/three/mall-scene";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Crown, Sparkles, Shield, Truck, BadgePercent } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Zap, title: "3D Mall", desc: "Explore 5 floors in real-time" },
  { icon: Crown, title: "Luxury Curated", desc: "10,000+ premium products" },
  { icon: Sparkles, title: "AI Concierge", desc: "Personal shopping assistant" },
  { icon: Shield, title: "Secure Payments", desc: "Crypto, cards, buy-now-pay-later" },
  { icon: Truck, title: "Same-day Delivery", desc: "In 47 major metros" },
  { icon: BadgePercent, title: "Elite Rewards", desc: "5% back + exclusive drops" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient orbs */}
        <div className="orb w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand/30 via-transparent to-emerald/30" />
        <div className="orb w-[600px] h-[600px] top-0 right-0 bg-gradient-to-br from-emerald/20 to-transparent" />
        <div className="orb w-[500px] h-[500px] bottom-0 left-0 bg-gradient-to-tr from-emerald-light/15 to-transparent" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      {/* 3D Mall Scene */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <MallScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 justify-center lg:justify-start mb-6"
          >
            <span className="glass px-4 py-1.5 rounded-full text-xs font-medium text-white/60 border border-white/10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 inline-block animate-pulse" />
              NOW LIVE — NEXUS ELITE MEMBERSHIP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[0.95] mb-6"
          >
            The Future of
            <br />
            <span className="text-gradient">Shopping</span>
            <br />
            Is Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-10"
          >
            Step inside a living, breathing luxury mall. 5 floors. Real-time 3D. AI concierge.
            Holographic products. Virtual try-on. Crypto payments. Welcome to NEXUS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16"
          >
            <Button asChild size="xl" className="group">
              <Link href="/mall">
                Enter the 3D Mall
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="premium" size="xl">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/40"
          >
            <span className="flex items-center gap-1.5"><BadgePercent className="w-4 h-4" /> 2M+ shoppers</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> 47 cities same-day</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 99.9% uptime</span>
            <span className="flex items-center gap-1.5"><Crown className="w-4 h-4" /> 200+ luxury brands</span>
          </motion.div>
        </div>

        {/* Right: Floating product cards + stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] flex items-center justify-center"
        >
          {/* Orbital product cards */}
          <div className="relative w-full h-full">
            {[
              { deg: 45, r: 160, color: "#b8763e", label: "Audio Pro" },
              { deg: 135, r: 180, color: "#10b981", label: "Smart Watch" },
              { deg: 225, r: 160, color: "#34d399", label: "AR Glasses" },
              { deg: 315, r: 180, color: "#ec4899", label: "Silk Dress" },
            ].map((p, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-4 w-40 text-center border border-white/10"
                  style={{ transform: `rotate(${p.deg}deg) translateY(-${p.r}px) rotate(-${p.deg}deg)` }}
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${p.color}, ${p.color}80)` }} />
                  <p className="text-xs font-medium">{p.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center pulsing orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-brand/20 via-emerald/20 to-emerald-light/20 blur-3xl animate-pulse" />
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-brand/30 via-emerald/30 to-emerald-light/30 blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-xs text-white/40 flex items-center gap-2"
      >
        <span>Scroll to explore</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}