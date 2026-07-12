"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Package, Truck, CreditCard, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const allOrders = [
  { id: "ORD-20260709-001", customer: "Alex Chen", email: "alex@nexus.com", items: 3, total: 4599, status: "delivered", date: "2026-07-09", payment: "UPI", address: "Bandra West, Mumbai" },
  { id: "ORD-20260709-002", customer: "Mira Patel", email: "mira@nexus.com", items: 1, total: 8500, status: "shipped", date: "2026-07-09", payment: "Card", address: "Koramangala, Bengaluru" },
  { id: "ORD-20260709-003", customer: "James R.", email: "james@nexus.com", items: 2, total: 3200, status: "processing", date: "2026-07-09", payment: "BNPL", address: "Cyber City, Gurugram" },
  { id: "ORD-20260709-004", customer: "Sofia K.", email: "sofia@nexus.com", items: 4, total: 2890, status: "pending", date: "2026-07-08", payment: "UPI", address: "Hauz Khas, Delhi" },
  { id: "ORD-20260709-005", customer: "Liam F.", email: "liam@nexus.com", items: 1, total: 1299, status: "cancelled", date: "2026-07-08", payment: "Wallet", address: "Banjara Hills, Hyderabad" },
  { id: "ORD-20260709-006", customer: "Emma W.", email: "emma@nexus.com", items: 2, total: 5200, status: "delivered", date: "2026-07-07", payment: "Card", address: "Park Street, Kolkata" },
  { id: "ORD-20260709-007", customer: "Maya D.", email: "maya@nexus.com", items: 3, total: 1850, status: "shipped", date: "2026-07-07", payment: "UPI", address: "Viman Nagar, Pune" },
  { id: "ORD-20260709-008", customer: "Noah P.", email: "noah@nexus.com", items: 1, total: 799, status: "processing", date: "2026-07-06", payment: "Card", address: "Anna Nagar, Chennai" },
  { id: "ORD-20260709-009", customer: "Zara B.", email: "zara@nexus.com", items: 2, total: 3499, status: "delivered", date: "2026-07-06", payment: "BNPL", address: "Jubilee Hills, Hyderabad" },
  { id: "ORD-20260709-010", customer: "Kyle T.", email: "kyle@nexus.com", items: 5, total: 6200, status: "shipped", date: "2026-07-05", payment: "Card", address: "Whitefield, Bengaluru" },
  { id: "ORD-20260709-011", customer: "Riya S.", email: "riya@nexus.com", items: 1, total: 2499, status: "pending", date: "2026-07-05", payment: "UPI", address: "Salt Lake, Kolkata" },
  { id: "ORD-20260709-012", customer: "Arjun M.", email: "arjun@nexus.com", items: 3, total: 1899, status: "delivered", date: "2026-07-04", payment: "Wallet", address: "MG Road, Pune" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-500/20 text-green-400 border-green-400/30",
  shipped: "bg-blue-500/20 text-blue-400 border-blue-400/30",
  processing: "bg-amber-500/20 text-amber-400 border-amber-400/30",
  pending: "bg-gray-500/20 text-gray-400 border-gray-400/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-400/30",
};

const statusOrder = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
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
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-white/5 rounded-xl transition">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-display font-black">Order Management</h1>
                <p className="text-white/50 mt-1">View, filter, and manage all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input placeholder="Search orders…" className="pl-10 w-72" />
              </div>
              <select className="h-11 w-48 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <select className="h-11 w-48 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              <Button variant="premium" className="gap-2">
                <Package className="w-4 h-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => {
              const count = allOrders.filter((o) => o.status === s).length;
              return (
                <Card key={s} className="text-center py-4">
                  <div className="text-2xl font-black mb-1">{count}</div>
                  <div className={`text-xs text-white/50 uppercase tracking-wider capitalize ${statusColors[s].replace("bg-", "").replace("text-", "text-").replace("border-", "border-")}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </div>
                </Card>
              );
            })}
          </motion.div>

          {/* Orders Table */}
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
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Items</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Payment</th>
                        <th className="px-6 py-4">Shipping Address</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/2 transition">
                          <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-xs text-white/40">{order.email}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">{order.items}</td>
                          <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <select
                              defaultValue={order.status}
                              className={`w-32 px-2 py-1 rounded-xl text-xs font-medium border bg-transparent ${statusColors[order.status]}`}
                            >
                              {statusOrder.map((s) => (
                                <option key={s} value={s}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/60">{order.payment}</td>
                          <td className="px-6 py-4 text-sm text-white/60 max-w-xs truncate">{order.address}</td>
                          <td className="px-6 py-4 text-sm text-white/50">{order.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Package className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Truck className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-sm text-white/50">Showing 1 to 12 of 127 orders</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
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