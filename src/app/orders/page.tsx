"use client";

import { motion } from "framer-motion";
import { Package, Search, Clock, MapPin, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

// Demo orders
const orders = [
  { id: "NX-2024-001", date: "Jul 6, 2026", status: "delivered", items: 3, total: 2498, tracking: "1Z999AA10123456784", eta: "Delivered" },
  { id: "NX-2024-002", date: "Jul 3, 2026", status: "shipped", items: 1, total: 449, tracking: "1Z999AA10123456785", eta: "Jul 8" },
  { id: "NX-2024-003", date: "Jul 1, 2026", status: "processing", items: 2, total: 1438, tracking: "1Z999AA10123456786", eta: "Jul 10" },
];

const statusIcons = { delivered: CheckCircle2, shipped: Truck, processing: Package } as const;

export default function OrdersPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-black mb-2">Orders</h1>
            <p className="text-white/50">{orders.length} orders placed</p>
          </motion.div>

          {orders.length === 0 ? (
            <div className="text-center py-32 glass rounded-3xl">
              <Package className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-white/50 mb-8">Place your first order and it will appear here.</p>
              <Button asChild size="lg"><Link href="/shop">Start Shopping</Link></Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, i) => {
                const StatusIcon = statusIcons[order.status] || Package;
                const statusColors = {
                  delivered: "text-green-400 bg-green-500/10 border-green-500/20",
                  shipped: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                  processing: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                };

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 hover:border-blue-400/20 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{order.id}</span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${statusColors[order.status]}`}>
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-white/50">Placed {order.date} · {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${order.total.toLocaleString()}</p>
                          <p className="text-xs text-white/40">Tracking: {order.tracking}</p>
                        </div>
                      </div>

                      {/* Tracking progress bar */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-2 text-xs text-white/50">
                          <Clock className="w-3 h-3" />
                          <span>Estimated delivery: {order.eta}</span>
                        </div>
                        <div className="h-2 glass rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all bg-gradient-to-r from-blue-500 to-purple-600 ${
                            order.status === "delivered" ? "w-full" : order.status === "shipped" ? "w-2/3" : "w-1/3"
                          }`} />
                        </div>
                        <div className="flex justify-between mt-1 text-[10px] text-white/30">
                          <span>Ordered</span>
                          <span>Packed</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                        {order.status === "processing" && (
                          <Button variant="outline" size="sm">Cancel Order</Button>
                        )}
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">Write Review</Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}