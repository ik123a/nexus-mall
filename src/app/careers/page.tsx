"use client";

import { motion } from "framer-motion";
import { Zap, Users, Heart, Code, Globe, ArrowRight, Sparkles, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const cultureValues = [
  { icon: Zap, title: "Move Fast, Build Beauty", desc: "Speed doesn't mean cutting corners. We ship polished experiences, not MVPs." },
  { icon: Heart, title: "Obsess Over Details", desc: "The 1% that users never notice but always feel. That's where the magic lives." },
  { icon: Users, title: "Customers First, Always", desc: "Every decision traces back to: does this make shopping better for our members?" },
  { icon: Code, title: "Engineer for Elegance", desc: "Clean code, clean design, clean architecture. Complexity is a bug, not a feature." },
  { icon: Globe, title: "Global by Default", desc: "Built for 47 cities and counting. Localization isn't an afterthought." },
  { icon: Sparkles, title: "Stay Weird", desc: "Conformity is the enemy. We hire outliers and let them be outliers." },
];

const benefits = [
  "Competitive equity + salary",
  "Full medical, dental, vision",
  "Unlimited PTO + 16 company holidays",
  "₹2L annual learning budget",
  "Home office stipend (₹1L setup + ₹25k/yr)",
  "Quarterly offsites in amazing locations",
  "Early access to every NEXUS drop",
  "Flexible remote/hybrid — you choose",
];

const openRoles = [
  { id: 1, title: "Senior Frontend Engineer", dept: "Engineering", location: "Bengaluru / Remote", type: "Full-time", level: "Senior" },
  { id: 2, title: "Staff Backend Engineer (Go)", dept: "Engineering", location: "Bengaluru / Remote", type: "Full-time", level: "Staff" },
  { id: 3, title: "Product Designer — AI Experiences", dept: "Design", location: "Mumbai / Remote", type: "Full-time", level: "Senior" },
  { id: 4, title: "ML Engineer — Recommendation Systems", dept: "AI/ML", location: "Bengaluru / Remote", type: "Full-time", level: "Senior" },
  { id: 5, title: "Brand Designer", dept: "Design", location: "Delhi / Remote", type: "Full-time", level: "Mid" },
  { id: 6, title: "DevOps Engineer", dept: "Engineering", location: "Remote (India)", type: "Full-time", level: "Senior" },
  { id: 7, title: "Growth Marketing Lead", dept: "Marketing", location: "Mumbai / Remote", type: "Full-time", level: "Lead" },
  { id: 8, title: "Customer Experience Manager", dept: "Operations", location: "Bengaluru", type: "Full-time", level: "Mid" },
  { id: 9, title: "Technical Writer", dept: "Product", location: "Remote", type: "Contract", level: "Mid" },
  { id: 10, title: "3D/Three.js Developer", dept: "Engineering", location: "Bengaluru / Remote", type: "Full-time", level: "Senior" },
];

function RoleCard({ role }: { role: typeof openRoles[0] }) {
  const levelColors: Record<string, string> = {
    Senior: "from-amber-500 to-orange-500",
    Staff: "from-emerald to-emerald-light",
    Lead: "from-brand to-emerald-light",
    Mid: "from-green-500 to-emerald-500",
  };

  return (
    <Card className="group hover:border-brand/30 transition-all duration-500">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{role.title}</h3>
            <p className="text-sm text-white/50">{role.dept}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${levelColors[role.level] || "from-white/10 to-white/5"} text-white`}>
              {role.level}
            </span>
            <span className="px-2.5 py-1 rounded-full glass text-xs text-white/60 border border-white/10">
              {role.type}
            </span>
            <span className="px-2.5 py-1 rounded-full glass text-xs text-white/60 border border-white/10 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {role.location}
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto group-hover:bg-brand/10 group-hover:border-brand/30">
          View Details & Apply
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function CareersPage() {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-light" />
            <span>10 OPEN ROLES — HIRING ACROSS 12 TIMEZONES</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 text-balance"
          >
            Build the Future
            <br />
            <span className="text-gradient">of Shopping.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-12"
          >
            We're a small, elite team redefining commerce. 3D malls, AI concierges, brands as art.
            If that sounds like your kind of problem, we should talk.
          </motion.p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">How We Work</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Our <span className="text-gradient">Culture.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-brand/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-brand/30">
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                <p className="text-white/60 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 relative bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">Perks & Benefits</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black">
                What You
                <span className="text-gradient">Get.</span>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand/30">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-white/80">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand mb-4 font-semibold">Open Positions</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black">
                Current
                <span className="text-gradient">Openings.</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-md">
              Don't see your role? We're always looking for exceptional people. Email us at careers@nexusmall.com
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openRoles.map((role, i) => (
              <motion.div key={role.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <RoleCard role={role} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="orb w-[400px] h-[400px] bg-emerald/10 top-20 right-0" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-emerald/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-black mb-6">
                Ready to
                <span className="text-gradient"> join us?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Send your portfolio/GitHub and a note on why NEXUS to careers@nexusmall.com
              </p>
              <Button size="xl" variant="premium" className="gap-3">
                <Mail className="w-5 h-5" />
                Email Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

// Check icon for benefits
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}