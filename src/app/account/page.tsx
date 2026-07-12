"use client";

import { motion } from "framer-motion";
import { Bell, Heart, MapPin, CreditCard, ShoppingBag, Star, Wallet, Settings, LogOut, Sparkles, Crown, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/constants/reviews";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

const stats = [
  { name: "Orders", value: 47, icon: ShoppingBag, href: "/orders", color: "brand" },
  { name: "Wishlist", value: 12, icon: Heart, href: "/wishlist", color: "rose" },
  { name: "Points", value: currentUser.points.toLocaleString(), icon: Sparkles, href: "/account/rewards", color: "emerald" },
  { name: "Reviews", value: 23, icon: Star, href: "/community", color: "amber" },
];

export default function AccountPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative glass-strong rounded-3xl p-8 mb-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand/10 via-emerald/10 to-emerald-light/10" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-3xl">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-display font-black">{currentUser.name}</h1>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-[10px] font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    {currentUser.membership}
                  </span>
                </div>
                <p className="text-white/60">{currentUser.email}</p>
                <p className="text-xs text-white/40 mt-1">Member since {new Date(currentUser.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" />Settings</Button>
                <Button variant="outline" size="sm"><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {stats.map((s) => (
                <Link key={s.name} href={s.href}>
                  <div className="glass rounded-2xl p-4 hover:bg-white/5 transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${s.color}-500/10 mb-2`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-[10px] text-white/40">{s.name}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Menu grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShoppingBag, title: "My Orders", desc: "Track upcoming and past orders", href: "/orders" },
              { icon: Heart, title: "Wishlist", desc: "Items you've saved for later", href: "/wishlist" },
              { icon: MapPin, title: "Addresses", desc: "Manage shipping addresses", href: "/account/addresses" },
              { icon: CreditCard, title: "Payment Methods", desc: "Cards, crypto, BNPL, wallet", href: "/account/wallet" },
              { icon: Sparkles, title: "Rewards", desc: "Earn & redeem points", href: "/account/rewards" },
              { icon: Bell, title: "Notifications", desc: "Updates and exclusive offers", href: "/account/notifications" },
              { icon: Gift, title: "Gift Cards", desc: "Send luxury to friends", href: "/gift-cards" },
              { icon: Crown, title: "Membership", desc: "Upgrade to NEXUS Elite", href: "/membership" },
              { icon: Wallet, title: "Wallet & Refunds", desc: "Manage credits and refunds", href: "/account/wallet" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={item.href}>
                  <Card className="p-5 hover:border-brand/30 transition group cursor-pointer">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <item.icon className="w-7 h-7 mb-3 text-white/60 group-hover:text-brand transition" />
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-xs text-white/50">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}