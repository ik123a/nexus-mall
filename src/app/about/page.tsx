"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Globe, Zap, Heart, Award, Users, Target, Eye, Rocket } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

const stats = [
  { label: "Curated Brands", value: 200, suffix: "+" },
  { label: "Products Live", value: 6232, suffix: "" },
  { label: "Cities Worldwide", value: 47, suffix: "" },
  { label: "Members", value: 2, suffix: "M+" },
];

const missionCards = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To redefine digital commerce by blending immersive 3D experiences with curated luxury — making every purchase feel personal, frictionless, and unforgettable.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A future where shopping is an experience you look forward to — not a transaction. Where every brand, every product, every detail is orchestrated around you.",
  },
  {
    icon: Heart,
    title: "Our Values",
    body: "Craft over clutter. Sustainability over speed. People over platforms. We choose restraint, intention, and the long view in everything we ship.",
  },
];

const teamMembers = [
  { name: "AVA CHEN", role: "Founder & CEO", img: "1494790108377-be9c29b29330" },
  { name: "NOAH PARK", role: "Chief Product Officer", img: "1599566150163-29194dcaad36" },
  { name: "MIA RODRIGUEZ", role: "Head of Design", img: "1438761681033-6461ffad8d80" },
  { name: "LIAM OKAFOR", role: "VP Engineering", img: "1500648767791-00dcc994a43e" },
  { name: "SOFIA ANDERS", role: "Brand Director", img: "1544005313-94ddf0286df2" },
  { name: "ETHAN KUMAR", role: "Head of AI", img: "1507003211169-0a1dd7228f2d" },
  { name: "ZARA BENALI", role: "VP Customer", img: "1487412720507-e7ab37603c6f" },
  { name: "KYLE TANAKA", role: "CTO", img: "1519085360753-3697979229c2" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let cur = 0;
    const inc = target / steps;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(cur));
      }
    }, stepTime);
    return () => clearInterval(id);
  }, [target]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand/20 -top-20 -left-20" />
        <div className="orb w-[400px] h-[400px] bg-emerald/20 top-40 -right-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald" />
            <span>EST. 2024 — REDEFINING THE FUTURE OF SHOPPING</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 text-balance"
          >
            We're not a store.
            <br />
            <span className="text-gradient">We're an experience.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-12"
          >
            NEXUS MALL is a curated destination where 200+ of the world's most interesting
            brands meet a 3D mall you can actually walk through. Discover. Build. Belong.
          </motion.p>

          {/* Stat counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass rounded-2xl p-6 sm:p-8"
              >
                <div className="text-3xl sm:text-5xl font-display font-black text-gradient mb-2">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">Our Story</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black mb-6 leading-tight">
                Built for shoppers who
                <span className="text-gradient"> want more.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5 text-white/60 text-lg leading-relaxed"
            >
              <p>
                NEXUS started in a tiny studio in 2024 with one belief: e-commerce lost its soul.
                Endless scrolling, identical stores, hollow checkout flows.
              </p>
              <p>
                We rebuilt it from the ground up — a 3D mall you can actually walk through,
                a concierge that knows your taste, and a curation that treats brands like art.
              </p>
              <p>
                Two million members and 47 cities later, we're just getting started.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">What Drives Us</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Mission, vision, <span className="text-gradient">values.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {missionCards.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-3xl p-8 hover:border-brand/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-brand/30">
                  <m.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{m.title}</h3>
                <p className="text-white/60 leading-relaxed">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 relative">
        <div className="orb w-[400px] h-[400px] bg-emerald-light/10 top-20 right-0" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">The People</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black">
                Meet the <span className="text-gradient">team.</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-md">
              Designers, engineers, dreamers — building the future of shopping from 12 timezones.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group glass rounded-3xl overflow-hidden hover:border-blue-400/30 transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden bg-white/5">
                  <img
                    src={`https://images.unsplash.com/photo-${m.img}?w=400&q=80`}
                    alt={m.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm tracking-wide">{m.name}</h4>
                  <p className="text-xs text-white/50 mt-0.5">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
