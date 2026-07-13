"use client";

import { motion } from "framer-motion";
import { Crown, Star, Check, Shield, Zap, Heart, Crown as CrownIcon, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tiers: Array<{
  id: string;
  name: string;
  price: number;
  period: string;
  color: string;
  border: string;
  icon: typeof Crown;
  badge: string;
  features: string[];
  cta: string;
  ctaVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
}> = [
  {
    id: "bronze",
    name: "Bronze",
    price: 0,
    period: "/year",
    color: "from-amber-700 via-amber-900 to-amber-800",
    border: "border-amber-500/30",
    icon: Crown,
    badge: "Free",
    features: [
      "Free standard shipping on ₹2,999+",
      "30-day free returns",
      "Access to sales 24h early",
      "Basic AI Concierge",
      "Earn 1X NEXUS Points",
      "Birthday gift (₹200 credit)",
    ],
    cta: "Join Free",
    ctaVariant: "outline",
  },
  {
    id: "silver",
    name: "Silver",
    price: 999,
    period: "/year",
    color: "from-gray-500 via-gray-700 to-gray-800",
    border: "border-gray-400/30",
    icon: Star,
    badge: "Most Popular",
    features: [
      "Free express shipping (1-2 days)",
      "Free doorstep return pickup",
      "Access to sales 48h early",
      "Priority AI Concierge",
      "Earn 1.5X NEXUS Points",
      "Birthday gift (₹500 credit)",
      "Monthly exclusive drops access",
      "Free 3D Mall navigation",
    ],
    cta: "Upgrade to Silver",
    ctaVariant: "premium",
  },
  {
    id: "gold",
    name: "Gold",
    price: 2999,
    period: "/year",
    color: "from-amber-500 via-yellow-400 to-amber-600",
    border: "border-amber-400/50",
    icon: CrownIcon,
    badge: "Best Value",
    features: [
      "Free instant delivery (2-4 hrs, 12 cities)",
      "Instant refund on pickup scan",
      "Access to sales 72h early",
      "Dedicated AI Concierge + Human Agent",
      "Earn 2X NEXUS Points",
      "Birthday gift (₹1,500 credit)",
      "Exclusive Gold-only products",
      "Personal 3D Mall Guide",
      "Virtual showroom access",
      "Extended EMI (18/24 months no-cost)",
      "Crypto payments (USDC, ETH)",
    ],
    cta: "Upgrade to Gold",
    ctaVariant: "premium",
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 9999,
    period: "/year",
    color: "from-purple-600 via-pink-500 to-blue-500",
    border: "border-purple-400/50",
    icon: Sparkles,
    badge: "Invite Only",
    features: [
      "All Gold benefits, plus:",
      "Personal Shopping Concierge (human)",
      "Unlimited instant delivery (any city)",
      "White-glove delivery & setup",
      "Earn 3X NEXUS Points",
      "Birthday luxury gift (curated)",
      "Private sale invitations",
      "VIP event access (fashion weeks, launches)",
      "Dedicated relationship manager",
      "Custom 3D Mall penthouse suite",
      "Co-design privileges with brands",
      "Annual luxury getaway for 2",
    ],
    cta: "Request Invitation",
    ctaVariant: "outline",
  },
];

const comparisonRows = [
  { feature: "Annual Fee", bronze: "Free", silver: "₹999", gold: "₹2,999", platinum: "₹9,999" },
  { feature: "Standard Shipping", bronze: "₹2,999+", silver: "Free", gold: "Free", platinum: "Free" },
  { feature: "Express Shipping", bronze: "₹299", silver: "Free", gold: "Free", platinum: "Free" },
  { feature: "Instant Delivery", bronze: "₹499", silver: "₹499", gold: "Free (12 cities)", platinum: "Free (All cities)" },
  { feature: "Return Pickup", bronze: "Drop-off only", silver: "Free", gold: "Free + Instant Refund", platinum: "Free + Instant Refund" },
  { feature: "Early Sale Access", bronze: "24h", silver: "48h", gold: "72h", platinum: "72h + Private Sales" },
  { feature: "AI Concierge", bronze: "Basic", silver: "Priority", gold: "Dedicated + Human", platinum: "Personal Human Concierge" },
  { feature: "Points Multiplier", bronze: "1X", silver: "1.5X", gold: "2X", platinum: "3X" },
  { feature: "3D Mall Perks", bronze: "Basic", silver: "Free Navigation", gold: "Personal Guide + Showrooms", platinum: "Penthouse Suite + Co-design" },
  { feature: "Birthday Gift", bronze: "₹200", silver: "₹500", gold: "₹1,500", platinum: "Curated Luxury" },
  { feature: "EMI Options", bronze: "3-12 mo", silver: "3-12 mo", gold: "3-24 mo no-cost", platinum: "3-24 mo no-cost" },
  { feature: "Exclusive Products", bronze: "No", silver: "Monthly Drops", gold: "Gold-only + Early", platinum: "Co-design Access" },
  { feature: "Events", bronze: "No", silver: "No", gold: "Virtual Showrooms", platinum: "VIP Events + Getaways" },
];

const faqs = [
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Upgrade anytime — prorated charge, instant benefits. Downgrade takes effect at your next renewal date. No penalties, no lock-in periods.",
  },
  {
    q: "How do I earn and use NEXUS Points?",
    a: "Earn points on every purchase (multiplied by your tier). 100 points = ₹1. Redeem at checkout, for shipping upgrades, or exclusive experiences. Points never expire while you're a member.",
  },
  {
    q: "What does 'Invite Only' mean for Platinum?",
    a: "Platinum is by invitation based on engagement, tenure, and referrals. You can request an invitation — our team reviews quarterly. Gold members with 2+ years tenure get priority consideration.",
  },
  {
    q: "Do benefits apply to 3D Mall purchases?",
    a: "Yes. All shipping, returns, and concierge benefits extend to 3D Mall. Gold+ get exclusive virtual showrooms, personal guides, and Platinum members get a customizable penthouse suite in the 3D Mall.",
  },
  {
    q: "What happens if I cancel?",
    a: "Benefits continue until the end of your billing period. No refunds for partial periods. Points are frozen but restored if you rejoin within 90 days. Platinum invitations are not guaranteed upon rejoining.",
  },
  {
    q: "Can I gift a membership?",
    a: "Yes. Silver and Gold can be gifted (1-year prepaid). The recipient gets immediate access. Platinum cannot be gifted — it's earned through engagement.",
  },
];

function TierCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative glass rounded-3xl p-8 ${tier.border} flex flex-col h-full group`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600">
        {tier.badge}
      </div>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <tier.icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
        <div className="flex items-center justify-center gap-1">
          <span className="text-4xl font-black">{tier.price === 0 ? "Free" : `₹${tier.price.toLocaleString()}`}</span>
          <span className="text-white/50 text-lg self-end pb-1">{tier.period}</span>
        </div>
      </div>
      <ul className="space-y-3 flex-1 mb-8">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
            <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={tier.ctaVariant}
        size="lg"
        className="w-full gap-2"
      >
        {tier.cta}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

export default function MembershipPage() {
  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-amber-500/20 -top-20 -left-20" />
        <div className="orb w-[400px] h-[400px] bg-purple-500/20 top-40 -right-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>4 TIERS · INSTANT UPGRADES · NO LOCK-IN</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-8"
          >
            NEXUS
            <br />
            <span className="text-gradient">Membership.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Four tiers. Zero compromise. From free forever to invite-only luxury — every level unlocks real value.
          </motion.p>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">Choose Your Level</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Find Your
              <span className="text-gradient">Tier.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 relative bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">Side by Side</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Compare
              <span className="text-gradient">Features.</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 font-semibold text-white/50">Feature</th>
                  <th className="pb-4 font-semibold text-center text-amber-400">Bronze</th>
                  <th className="pb-4 font-semibold text-center text-gray-400">Silver</th>
                  <th className="pb-4 font-semibold text-center text-amber-300">Gold</th>
                  <th className="pb-4 font-semibold text-center text-purple-400">Platinum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white/2" : ""}>
                    <td className="py-4 font-medium text-white">{row.feature}</td>
                    <td className="py-4 text-center text-white/70 text-sm">{row.bronze}</td>
                    <td className="py-4 text-center text-white/70 text-sm">{row.silver}</td>
                    <td className="py-4 text-center text-white/70 text-sm">{row.gold}</td>
                    <td className="py-4 text-center text-white/70 text-sm">{row.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">Questions?</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Membership
              <span className="text-gradient">FAQ.</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group">
                  <CardContent className="p-0">
                    <button
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                    >
                      <span className="font-medium text-lg pr-10">{faq.q}</span>
                      <span className="text-white/40 flex-shrink-0">+</span>
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-black mb-6">
                Ready to
                <span className="text-gradient"> level up?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Join 2M+ members. Start free, upgrade anytime. Your first birthday gift is on us.
              </p>
              <Button size="xl" variant="premium" className="gap-3">
                <Crown className="w-5 h-5" />
                Join Free
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