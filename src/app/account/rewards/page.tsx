"use client";

import { motion } from "framer-motion";
import { Star, Crown, Gift, Sparkles, Target, ArrowRight, ChevronDown, ChevronUp, Lock, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tiers = [
  {
    id: "bronze",
    name: "Bronze",
    price: 0,
    color: "from-amber-700 via-amber-900 to-amber-800",
    icon: Crown,
    pointsMultiplier: "1X",
    nextTier: "Silver",
    progress: 0,
  },
  {
    id: "silver",
    name: "Silver",
    price: 999,
    color: "from-gray-500 via-gray-700 to-gray-800",
    icon: Star,
    pointsMultiplier: "1.5X",
    nextTier: "Gold",
    progress: 35,
  },
  {
    id: "gold",
    name: "Gold",
    price: 2999,
    color: "from-amber-500 via-yellow-400 to-amber-600",
    icon: Crown,
    pointsMultiplier: "2X",
    nextTier: "Platinum",
    progress: 72,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 9999,
    color: "from-purple-600 via-pink-500 to-blue-500",
    icon: Sparkles,
    pointsMultiplier: "3X",
    nextTier: "Max Tier",
    progress: 100,
  },
];

const rewards = [
  { id: 1, name: "₹500 Off Coupon", points: 5000, category: "Discounts", expiry: "2026-12-31" },
  { id: 2, name: "Free Express Shipping (1 month)", points: 3000, category: "Shipping", expiry: "2026-08-15" },
  { id: 3, name: "Early Access: Quantum Drop", points: 8000, category: "Exclusive", expiry: "2026-07-20" },
  { id: 4, name: "Birthday Gift Upgrade", points: 10000, category: "Perks", expiry: "2026-12-31" },
  { id: 5, name: "3D Mall Premium Avatar", points: 6000, category: "Digital", expiry: "2026-10-01" },
  { id: 6, name: "Personal Stylist Session", points: 15000, category: "Services", expiry: "2026-09-30" },
  { id: 7, name: "Double Points Weekend Pass", points: 4000, category: "Boosters", expiry: "2026-07-31" },
  { id: 8, name: "VIP Event Invitation", points: 20000, category: "Experiences", expiry: "2026-08-31" },
];

const activity = [
  { type: "earn", points: 449, reason: "Purchase: Aerospace Pro Headphones", date: "2026-07-09" },
  { type: "earn", points: 119, reason: "Purchase: Aura Glow Serum (2x)", date: "2026-07-07" },
  { type: "bonus", points: 500, reason: "Weekly login streak (7 days)", date: "2026-07-05" },
  { type: "earn", points: 320, reason: "Purchase: Carbon X Running Shoes", date: "2026-07-03" },
  { type: "spend", points: 3000, reason: "Redeemed: Free Express Shipping", date: "2026-07-01" },
  { type: "earn", points: 150, reason: "Review: Holographic Smartwatch X9", date: "2026-06-28" },
  { type: "bonus", points: 1500, reason: "Referral: Maya D. joined", date: "2026-06-25" },
  { type: "earn", points: 850, reason: "Purchase: Solis Diamond Solitaire", date: "2026-06-20" },
];

export default function RewardsPage() {
  const currentPoints = 12840;
  const currentTier = "Gold";
  const tier = tiers.find((t: any) => t.name === currentTier) as typeof tiers[0];

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      <div className="min-h-screen pt-16">

      <div className="max-w-7xl mx-auto px-6 pb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-display font-black">NEXUS Rewards</h1>
            <p className="text-white/50 mt-1">Earn points, unlock perks, level up your experience</p>
          </motion.div>

          {/* Current Tier Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/10 to-amber-600/10" />
              <CardContent className="relative p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-xl shadow-amber-500/30">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-display font-black">Gold Member</h2>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold">2X POINTS</span>
                      </div>
                      <p className="text-white/60">You are earning <span className="font-bold text-amber-300">2X points</span> on every purchase</p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-white/50">
                        <span><Crown className="w-4 h-4 mr-1" /> 12,840 points</span>
                        <span><Sparkles className="w-4 h-4 mr-1" /> 2,340 this month</span>
                        <span><Target className="w-4 h-4 mr-1" /> 47% to Platinum</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-64">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/50">Progress to Platinum</span>
                      <span className="font-bold text-amber-300">{tier.progress}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tier.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-white/40 mt-2">₹7,160 more spending to reach Platinum</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            <Card className="text-center py-6">
              <CardContent>
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-amber-400">{currentPoints.toLocaleString()}</div>
                <div className="text-xs text-white/50">Total Points</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-pink-400">8</div>
                <div className="text-xs text-white/50">Available Rewards</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-blue-400">47</div>
                <div className="text-xs text-white/50">Days to Expiry</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <Lock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-purple-400">2,840</div>
                <div className="text-xs text-white/50">Lifetime Earned</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="rewards" className="space-y-6">
            <TabsList className="max-w-2xl">
              <TabsTrigger value="rewards">Rewards Catalog</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tiers">Tiers and Benefits</TabsTrigger>
            </TabsList>

            {/* Rewards Catalog */}
            <TabsContent value="rewards">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-2xl p-5 hover:border-amber-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-400/20 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-xs text-white/40 font-mono text-right whitespace-nowrap">Expires {r.expiry}</span>
                    </div>
                    <h4 className="font-medium mb-1 line-clamp-1">{r.name}</h4>
                    <p className="text-xs text-white/50 mb-3">{r.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{r.points.toLocaleString()}</span>
                        <span className="text-white/40 text-xs">pts</span>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        Redeem
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Activity */}
            <TabsContent value="activity">
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.type === "spend" ? "bg-red-500/20" : "bg-green-500/20"}`}>
                      {a.type === "spend" ? (
                        <ArrowRight className="w-5 h-5 text-red-400" />
                      ) : (
                        <Star className={`w-5 h-5 fill-current ${a.type === "bonus" ? "text-amber-400" : "text-green-400"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{a.reason}</p>
                      <p className="text-xs text-white/50">{a.date}</p>
                    </div>
                    <span className={`font-bold ${a.type === "spend" ? "text-red-400" : "text-green-400"}`}>
                      {a.type === "spend" ? "-" : "+"}{a.points.toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tiers & Benefits */}
            <TabsContent value="tiers">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((t, i) => {
                  const TierIcon = t.icon;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`glass rounded-3xl p-6 relative ${t.name === currentTier ? "border-2 border-amber-400/50" : ""}`}
                    >
                      {t.name === currentTier && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-400">
                          CURRENT
                        </div>
                      )}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br mx-auto mb-5 flex items-center justify-center shadow-lg">
                        <TierIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center mb-5">
                        <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                        <div className="text-sm text-white/50">{t.price === 0 ? "Free" : `₹${t.price.toLocaleString()}/year`}</div>
                      </div>
                      <div className="mb-5 p-4 glass rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-lg">{t.pointsMultiplier}</span>
                        </div>
                        <p className="text-xs text-white/50">Points multiplier on all purchases</p>
                      </div>
                      <ul className="space-y-3 text-sm text-white/70">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Free standard shipping</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> 30-day returns</li>
                        {t.name !== "Bronze" && (
                          <>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Early sale access</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Birthday gift</li>
                          </>
                        )}
                        {["Gold", "Platinum"].includes(t.name) && (
                          <>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Priority concierge</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> 3D Mall perks</li>
                          </>
                        )}
                      </ul>
                      {t.name !== currentTier && t.name !== "Platinum" && (
                        <Button variant="outline" className="w-full mt-6" size="sm">
                          Upgrade to {t.nextTier}
                        </Button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Check({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>;
}