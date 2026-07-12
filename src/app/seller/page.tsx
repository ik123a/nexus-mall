"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ShoppingCart, Star, Package, Users, CreditCard, BarChart3, Calendar, ArrowRight, Settings, Bell, Store } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const sellerKPIs = [
  { label: "Total Sales", value: "₹47.2L", change: "+23.1%", trend: "up", icon: DollarSign, color: "text-green-400" },
  { label: "Orders", value: "1,247", change: "+18.4%", trend: "up", icon: ShoppingCart, color: "text-blue-400" },
  { label: "Conversion", value: "4.2%", change: "+0.3%", trend: "up", icon: TrendingUp, color: "text-amber-400" },
  { label: "Avg Rating", value: "4.8", change: "+0.1", trend: "up", icon: Star, color: "text-purple-400" },
  { label: "Return Rate", value: "2.1%", change: "-0.4%", trend: "up", icon: Package, color: "text-cyan-400" },
];

const topProducts = [
  { name: "Aerospace Pro Headphones", brand: "Quantum", sold: 342, revenue: 1450000, rating: 4.9, stock: 47 },
  { name: "Holographic Smartwatch X9", brand: "Quantum", sold: 287, revenue: 2290000, rating: 4.8, stock: 23 },
  { name: "Carbon X Running Shoes", brand: "Pulse", sold: 512, revenue: 1638000, rating: 4.8, stock: 12 },
  { name: "Aura Glow Serum", brand: "Aura", sold: 894, revenue: 1072000, rating: 4.8, stock: 56 },
  { name: "Neon Runner Sneakers", brand: "Neo", sold: 421, revenue: 1010000, rating: 4.7, stock: 89 },
  { name: "Quantum Lens AR Glasses", brand: "Quantum", sold: 67, revenue: 870000, rating: 4.7, stock: 8 },
];

const recentReviews = [
  { product: "Aerospace Pro Headphones", user: "Alex C.", rating: 5, title: "Best headphones ever", date: "2026-07-08", content: "Spatial audio is incredible ANC is mind-blowing. 60hr battery is real." },
  { product: "Carbon X Running Shoes", user: "Mira P.", rating: 5, title: "PR shattered", date: "2026-07-07", content: "Shaved 4 min off marathon. Carbon plate works." },
  { product: "Aura Glow Serum", user: "James R.", rating: 4, title: "Visible results", date: "2026-07-06", content: "Dark spots fading after 2 weeks. Gentle formula." },
  { product: "Holographic Smartwatch X9", user: "Sofia K.", rating: 5, title: "ECG saved me", date: "2026-07-05", content: "Detected irregular rhythm. Doctor confirmed." },
  { product: "Neon Runner Sneakers", user: "Liam F.", rating: 4, title: "Glow is amazing", date: "2026-07-04", content: "Bright at night, comfy all day. Fast shipping." },
];

function ChartPlaceholder({ title, color }: { title: string; color: string }) {
  return (
    <Card className="h-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="w-full h-full glass rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${color}`}>
              <BarChart3 className="w-8 h-8" />
            </div>
            <p className="text-white/50">{title} chart placeholder</p>
            <p className="text-xs text-white/30 mt-1">Connect Recharts / Chart.js here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KPICard({ kpi, index }: { kpi: typeof sellerKPIs[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
          {kpi.trend === "up" ? <ArrowRight className="w-3.5 h-3.5 rotate-45" /> : <ArrowRight className="w-3.5 h-3.5 -rotate-45" />}
          <span>{kpi.change}</span>
        </div>
      </div>
      <div className="text-3xl font-black mb-1">{kpi.value}</div>
      <div className="text-xs text-white/50 uppercase tracking-wider">{kpi.label}</div>
    </motion.div>
  );
}

export default function SellerPage() {
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
              <h1 className="text-4xl font-display font-black">Seller Dashboard</h1>
              <p className="text-white/50 mt-1">Quantum Brand — Performance Overview</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button variant="premium" className="gap-2">
                <Package className="w-4 h-4" />
                Add Product
              </Button>
            </div>
          </motion.div>

          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
          >
            {sellerKPIs.map((kpi, i) => <KPICard key={kpi.label} kpi={kpi} index={i} />)}
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="max-w-2xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Top Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-8">
              {/* Sales Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ChartPlaceholder title="Daily Sales (30 days)" color="bg-green-500/20 border border-green-400/30" />
              </motion.div>

              {/* Traffic Sources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <ChartPlaceholder title="Traffic by Channel" color="bg-blue-500/20 border border-blue-400/30" />
                <ChartPlaceholder title="Revenue by Category" color="bg-purple-500/20 border border-purple-400/30" />
                <ChartPlaceholder title="Customer Demographics" color="bg-amber-500/20 border border-amber-400/30" />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-4 gap-4"
              >
                <Card className="text-center py-8 hover:border-blue-400/30 transition">
                  <CardContent className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold">Add Product</h4>
                    <p className="text-sm text-white/50">List new inventory</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">Create</Button>
                  </CardContent>
                </Card>
                <Card className="text-center py-8 hover:border-blue-400/30 transition">
                  <CardContent className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold">Promote</h4>
                    <p className="text-sm text-white/50">Run a campaign</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">Launch</Button>
                  </CardContent>
                </Card>
                <Card className="text-center py-8 hover:border-blue-400/30 transition">
                  <CardContent className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold">Payouts</h4>
                    <p className="text-sm text-white/50">View & request</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">Request</Button>
                  </CardContent>
                </Card>
                <Card className="text-center py-8 hover:border-blue-400/30 transition">
                  <CardContent className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bell className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold">Notifications</h4>
                    <p className="text-sm text-white/50">Manage alerts</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">Settings</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Top Products */}
            <TabsContent value="products">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Brand</th>
                            <th className="px-6 py-4 text-right">Units Sold</th>
                            <th className="px-6 py-4 text-right">Revenue</th>
                            <th className="px-6 py-4 text-right">Rating</th>
                            <th className="px-6 py-4 text-right">Stock</th>
                            <th className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {topProducts.map((p, i) => (
                            <tr key={p.name} className="hover:bg-white/2 transition">
                              <td className="px-6 py-4 font-medium">{p.name}</td>
                              <td className="px-6 py-4 text-white/60">{p.brand}</td>
                              <td className="px-6 py-4 text-right font-mono">{p.sold.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right font-medium">₹{p.revenue.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span>{p.rating}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={p.stock < 20 ? "text-red-400" : p.stock < 50 ? "text-amber-400" : "text-green-400"}>
                                  {p.stock} left
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {recentReviews.map((r, i) => (
                  <Card key={r.product} className="hover:border-blue-400/30 transition">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h4 className="font-semibold">{r.product}</h4>
                          <p className="text-sm text-white/50">{r.user} · {r.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="font-medium mb-1">"{r.title}"</p>
                      <p className="text-white/60 text-sm">{r.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}