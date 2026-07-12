"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, ShoppingCart, Users, TrendingUp, BarChart3, CreditCard, Package, ArrowUpRight, ArrowDownRight, Minus, MoreHorizontal, Search, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const kpis = [
  { label: "Total Revenue", value: "₹2.47 Cr", change: "+12.4%", trend: "up", icon: DollarSign, color: "text-green-400" },
  { label: "Orders", value: "12,847", change: "+8.2%", trend: "up", icon: ShoppingCart, color: "text-blue-400" },
  { label: "Customers", value: "8,234", change: "+15.1%", trend: "up", icon: Users, color: "text-purple-400" },
  { label: "Conversion Rate", value: "3.24%", change: "+0.18%", trend: "up", icon: TrendingUp, color: "text-amber-400" },
  { label: "Avg Order Value", value: "₹1,923", change: "-2.1%", trend: "down", icon: CreditCard, color: "text-cyan-400" },
];

const recentOrders = [
  { id: "ORD-20260709-001", customer: "Alex Chen", email: "alex@nexus.com", items: 3, total: 4599, status: "delivered", date: "2026-07-09", payment: "UPI" },
  { id: "ORD-20260709-002", customer: "Mira Patel", email: "mira@nexus.com", items: 1, total: 8500, status: "shipped", date: "2026-07-09", payment: "Card" },
  { id: "ORD-20260709-003", customer: "James R.", email: "james@nexus.com", items: 2, total: 3200, status: "processing", date: "2026-07-09", payment: "BNPL" },
  { id: "ORD-20260709-004", customer: "Sofia K.", email: "sofia@nexus.com", items: 4, total: 2890, status: "pending", date: "2026-07-08", payment: "UPI" },
  { id: "ORD-20260709-005", customer: "Liam F.", email: "liam@nexus.com", items: 1, total: 1299, status: "cancelled", date: "2026-07-08", payment: "Wallet" },
  { id: "ORD-20260709-006", customer: "Emma W.", email: "emma@nexus.com", items: 2, total: 5200, status: "delivered", date: "2026-07-07", payment: "Card" },
  { id: "ORD-20260709-007", customer: "Maya D.", email: "maya@nexus.com", items: 3, total: 1850, status: "shipped", date: "2026-07-07", payment: "UPI" },
  { id: "ORD-20260709-008", customer: "Noah P.", email: "noah@nexus.com", items: 1, total: 799, status: "processing", date: "2026-07-06", payment: "Card" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-500/20 text-green-400 border-green-400/30",
  shipped: "bg-blue-500/20 text-blue-400 border-blue-400/30",
  processing: "bg-amber-500/20 text-amber-400 border-amber-400/30",
  pending: "bg-gray-500/20 text-gray-400 border-gray-400/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-400/30",
};

function KPICard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
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
          {kpi.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{kpi.change}</span>
        </div>
      </div>
      <div className="text-3xl font-black mb-1">{kpi.value}</div>
      <div className="text-xs text-white/50 uppercase tracking-wider">{kpi.label}</div>
    </motion.div>
  );
}

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

export default function AdminPage() {
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
              <h1 className="text-4xl font-display font-black">Admin Dashboard</h1>
              <p className="text-white/50 mt-1">Overview of NEXUS MALL performance</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input placeholder="Search orders, customers…" className="pl-10 w-64" />
              </div>
              <Button variant="premium" className="gap-2">
                <Package className="w-4 h-4" />
                Export Report
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
            {kpis.map((kpi, i) => <KPICard key={kpi.label} kpi={kpi} index={i} />)}
          </motion.div>

          {/* Charts Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-6 mb-10"
          >
            <ChartPlaceholder title="Revenue Trend (30 days)" color="bg-green-500/20 border border-green-400/30" />
            <ChartPlaceholder title="Orders by Channel" color="bg-blue-500/20 border border-blue-400/30" />
            <ChartPlaceholder title="Customer Acquisition" color="bg-purple-500/20 border border-purple-400/30" />
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Items</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Payment</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/2 transition">
                          <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                          <td className="px-6 py-4">
                            <div>{order.customer}</div>
                            <div className="text-xs text-white/40">{order.email}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">{order.items}</td>
                          <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/60">{order.payment}</td>
                          <td className="px-6 py-4 text-sm text-white/50">{order.date}</td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
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
        </div>
      </div>
      <Footer />
    </main>
  );
}