"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bell, MessageSquare, Shield, Tag, Mail, Check, ChevronDown, ChevronUp, X, Filter, Settings, Moon, Zap, Package, Star, Gift, Truck, Lock, Sparkles, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const notifications = [
  { id: "n-1", type: "order", title: "Order Delivered", message: "Your order ORD-20260709-001 has been delivered.", time: "2 hours ago", read: false, icon: Package },
  { id: "n-2", type: "promo", title: "Flash Sale: 50% Off", message: "Neon Runner Sneakers now ₹120! Ends in 4 hours.", time: "4 hours ago", read: false, icon: Zap },
  { id: "n-3", type: "security", title: "New Login Detected", message: "New login from Chrome on Windows in Mumbai.", time: "1 day ago", read: true, icon: Shield },
  { id: "n-4", type: "order", title: "Order Shipped", message: "Your order ORD-20260707-003 is on the way. Track it here.", time: "2 days ago", read: true, icon: Truck },
  { id: "n-5", type: "reward", title: "Birthday Gift Ready", message: "Your Gold tier birthday gift (₹1,500 credit) is waiting.", time: "3 days ago", read: false, icon: Gift },
  { id: "n-6", type: "promo", title: "Early Access: Quantum Drop", message: "As a Gold member, you get 72h early access to the Quantum Lens AR restock.", time: "5 days ago", read: true, icon: Star },
  { id: "n-7", type: "system", title: "Price Drop Alert", message: "Aura Glow Serum dropped to ₹120 (was ₹160). You had it on wishlist.", time: "1 week ago", read: true, icon: Tag },
  { id: "n-8", type: "social", title: "Review Helpful", message: "12 people found your review of Carbon X Running Shoes helpful.", time: "1 week ago", read: true, icon: MessageSquare },
  { id: "n-9", type: "order", title: "Return Processed", message: "Your return for Order ORD-20260628-012 has been processed. ₹1,899 refunded.", time: "2 weeks ago", read: true, icon: RotateCcw },
  { id: "n-10", type: "promo", title: "Weekend Double Points", message: "Earn 2X points on all purchases this weekend only!", time: "2 weeks ago", read: true, icon: Zap },
  { id: "n-11", type: "security", title: "Password Changed", message: "Your password was successfully updated. If this wasn't you, contact support.", time: "3 weeks ago", read: true, icon: Lock },
  { id: "n-12", type: "system", title: "New Feature: AI Stylist", message: "Try our new AI-powered outfit builder in the Assistant tab.", time: "3 weeks ago", read: true, icon: Sparkles },
];

const preferences = [
  { id: "orders", label: "Order Updates", desc: "Shipment, delivery, and return notifications", icon: Package, enabled: true },
  { id: "promos", label: "Promotions & Sales", desc: "Flash sales, price drops, and exclusive offers", icon: Zap, enabled: true },
  { id: "rewards", label: "Rewards & Points", desc: "Points earned, tier changes, birthday gifts", icon: Star, enabled: true },
  { id: "security", label: "Security Alerts", desc: "Login attempts, password changes, 2FA", icon: Shield, enabled: true },
  { id: "social", label: "Community Activity", desc: "Review likes, comments, follows", icon: MessageSquare, enabled: true },
  { id: "system", label: "Product Alerts", desc: "Price drops on wishlist, back in stock, new arrivals", icon: Tag, enabled: true },
  { id: "newsletter", label: "Weekly Newsletter", desc: "Curated picks, style guides, mall events", icon: Mail, enabled: false },
  { id: "sms", label: "SMS Notifications", desc: "Critical alerts via SMS (delivery, security)", icon: MessageSquare, enabled: true },
  { id: "push", label: "Push Notifications", desc: "Real-time updates on mobile & desktop", icon: Bell, enabled: true },
  { id: "email", label: "Email Digest", desc: "Daily summary of all notifications", icon: Mail, enabled: false },
];

function NotificationItem({ notification, index }: { notification: typeof notifications[0]; index: number }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    order: Package,
    promo: Zap,
    security: Shield,
    reward: Gift,
    system: Tag,
    social: MessageSquare,
  };
  const Icon = icons[notification.type] || Bell;

  return (
    <motion.div
      key={notification.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`glass rounded-2xl p-4 transition-all ${!notification.read ? "border-blue-400/20 bg-blue-500/5" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!notification.read ? "bg-blue-500/20" : "bg-white/5"}`}>
          <Icon className={`w-5 h-5 ${!notification.read ? "text-blue-400" : "text-white/50"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className={`font-semibold ${!notification.read ? "text-white" : "text-white/80"}`}>{notification.title}</h4>
              <p className={`text-sm mt-1 ${!notification.read ? "text-white/70" : "text-white/50"}`}>{notification.message}</p>
            </div>
            <span className="text-xs text-white/40 font-mono whitespace-nowrap">{notification.time}</span>
          </div>
          {!notification.read && (
            <div className="mt-3 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1 h-8">
                <Check className="w-3.5 h-3.5" />
                Mark as read
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PreferenceItem({ pref }: { pref: typeof preferences[0] }) {
  const [enabled, setEnabled] = useState(pref.enabled);
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Package, Zap, Star, Shield, MessageSquare, Tag, Mail, Bell,
  };
  const Icon = icons[pref.icon.toString().split(" ")[1]?.split(".")[0] || ""] || Bell;

  return (
    <Card className="group hover:border-white/10 transition">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <pref.icon className="w-5 h-5 text-white/70" />
            </div>
            <div>
              <h4 className="font-medium">{pref.label}</h4>
              <p className="text-sm text-white/50">{pref.desc}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [unreadCount] = useState(notifications.filter((n) => !n.read).length);

  const filteredNotifications = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || (activeTab === "unread" && !n.read) || (activeTab === "read" && n.read);
    const matchesFilter = filterType === "all" || n.type === filterType;
    return matchesTab && matchesFilter;
  });

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl font-display font-black">Notifications</h1>
              <p className="text-white/50 mt-1">Stay updated on orders, promotions, and account activity</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Moon className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Tabs - All/Unread/Read */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xl">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">{notifications.length}</span></TabsTrigger>
                <TabsTrigger value="unread">Unread <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">{unreadCount}</span></TabsTrigger>
                <TabsTrigger value="read">Read <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">{notifications.length - unreadCount}</span></TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Filter by Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className="gap-1"
              >
                <Bell className="w-3.5 h-3.5" /> All
              </Button>
              {["order", "promo", "security", "reward", "system", "social"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="gap-1 capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Notifications List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {filteredNotifications.map((n, i) => (
              <NotificationItem key={n.id} notification={n} index={i} />
            ))}
            {filteredNotifications.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No notifications match your filters.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Notification Preferences</h2>
                <p className="text-white/50 text-sm">Control what you receive and how</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {preferences.map((p) => (
                <PreferenceItem key={p.id} pref={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}