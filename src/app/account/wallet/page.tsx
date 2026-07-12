"use client";

import { motion } from "framer-motion";
import { Wallet, CreditCard, Plus, Minus, ArrowUpRight, ArrowDownRight, DollarSign, Clock, CheckCircle, XCircle, MoreHorizontal, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const transactions = [
  { id: "TXN-001", type: "credit", amount: 5000, description: "Wallet top-up via UPI", date: "2026-07-09", status: "completed" },
  { id: "TXN-002", type: "debit", amount: 4599, description: "Order ORD-20260709-001", date: "2026-07-09", status: "completed" },
  { id: "TXN-003", type: "credit", amount: 500, description: "Cashback: Holographic Smartwatch X9", date: "2026-07-08", status: "completed" },
  { id: "TXN-004", type: "debit", amount: 240, description: "Order ORD-20260707-003", date: "2026-07-07", status: "completed" },
  { id: "TXN-005", type: "credit", amount: 200, description: "Birthday gift credit", date: "2026-07-01", status: "completed" },
  { id: "TXN-006", type: "debit", amount: 1899, description: "Order ORD-20260628-012", date: "2026-06-28", status: "completed" },
  { id: "TXN-007", type: "credit", amount: 1500, description: "Referral bonus: Maya D. joined", date: "2026-06-25", status: "completed" },
  { id: "TXN-008", type: "debit", amount: 8500, description: "Order ORD-20260620-005", date: "2026-06-20", status: "completed" },
];

const paymentMethods = [
  { type: "upi", name: "UPI", details: "alex@okhdfcbank", default: true },
  { type: "card", name: "Visa ending in 4242", details: "Expires 12/27", default: false },
  { type: "wallet", name: "NEXUS Wallet", details: "₹12,840 balance", default: false },
];

export default function WalletPage() {
  const balance = 12840;

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
              <h1 className="text-4xl font-display font-black">NEXUS Wallet</h1>
              <p className="text-white/50 mt-1">Manage your balance, payments & transaction history</p>
            </div>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-emerald/10 to-emerald-light/10" />
              <CardContent className="relative p-8 sm:p-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Available Balance</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl sm:text-7xl font-black text-gradient">₹{balance.toLocaleString()}</span>
                      <span className="text-green-400 font-medium self-end pb-1">+₹2,340 this month</span>
                    </div>
                    <p className="text-white/40 text-sm mt-2">Equivalent to ~$154 USD</p>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" variant="premium" className="gap-2">
                      <Plus className="w-5 h-5" />
                      Add Money
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <ArrowUpRight className="w-5 h-5" />
                      Withdraw
                    </Button>
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
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-green-400">+₹7,200</div>
                <div className="text-xs text-white/50">Credits this month</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <ArrowDownRight className="w-6 h-6 text-red-400 mx-auto mb-2 rotate-45" />
                <div className="text-2xl font-black text-red-400">-₹4,860</div>
                <div className="text-xs text-white/50">Debits this month</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-amber-400">₹0</div>
                <div className="text-xs text-white/50">Pending</div>
              </CardContent>
            </Card>
            <Card className="text-center py-6">
              <CardContent>
                <Zap className="w-6 h-6 text-emerald-light mx-auto mb-2" />
                <div className="text-2xl font-black text-emerald-light">12</div>
                <div className="text-xs text-white/50">Transactions (30d)</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="max-w-2xl">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="topup">Add Money</TabsTrigger>
            </TabsList>

            {/* Transactions */}
            <TabsContent value="transactions">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Description</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4 text-right">Amount</th>
                          <th className="px-6 py-4 text-right">Balance</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {transactions.map((txn, i) => {
                          let runningBalance = balance;
                          for (let j = 0; j <= i; j++) {
                            runningBalance += transactions[j].type === "credit" ? transactions[j].amount : -transactions[j].amount;
                          }
                          return (
                            <tr key={txn.id} className="hover:bg-white/2 transition">
                              <td className="px-6 py-4 text-sm text-white/50">{txn.date}</td>
                              <td className="px-6 py-4">
                                <div className="font-medium">{txn.description}</div>
                                <div className="text-xs text-white/40 font-mono">{txn.id}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${txn.type === "credit" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                  {txn.type === "credit" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                  {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right font-medium">
                                {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-right text-white/60 font-mono">₹{runningBalance.toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                  <CheckCircle className="w-3 h-3" />
                                  Completed
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods */}
            <TabsContent value="methods">
              <div className="space-y-4">
                {paymentMethods.map((pm) => (
                  <Card key={pm.type} className={pm.default ? "border-brand/30" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pm.type === "upi" ? "bg-brand/20" : pm.type === "card" ? "bg-purple-500/20" : "bg-green-500/20"}`}>
                            {pm.type === "upi" && <Zap className="w-6 h-6 text-brand" />}
                            {pm.type === "card" && <CreditCard className="w-6 h-6 text-emerald-light" />}
                            {pm.type === "wallet" && <Wallet className="w-6 h-6 text-green-400" />}
                          </div>
                          <div>
                            <h4 className="font-semibold">{pm.name}</h4>
                            <p className="text-sm text-white/50">{pm.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {pm.default && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand/20 text-brand">Default</span>
                          )}
                          <Button variant="ghost" size="sm">Manage</Button>
                          {!pm.default && (
                            <Button variant="outline" size="sm">Set Default</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </Button>
              </div>
            </TabsContent>

            {/* Top Up */}
            <TabsContent value="topup">
              <Card>
                <CardContent className="p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-6 text-center">Add Money to Wallet</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[500, 1000, 2000, 5000, 10000, 20000].map((amt) => (
                      <Button key={amt} variant="outline" onClick={() => {}} className="py-3">
                        ₹{amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Custom Amount</label>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">₹</span>
                      <Input type="number" placeholder="Enter amount" min={100} max={50000} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center gap-3 cursor-pointer p-3 glass rounded-xl">
                      <input type="radio" name="method" defaultChecked className="w-4 h-4 accent-brand" />
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-brand" />
                        <div>
                          <p className="font-medium">UPI</p>
                          <p className="text-xs text-white/50">Instant • No fees</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 glass rounded-xl">
                      <input type="radio" name="method" className="w-4 h-4 accent-brand" />
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-emerald-light" />
                        <div>
                          <p className="font-medium">Card</p>
                          <p className="text-xs text-white/50">Instant • 1.5% fee</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 glass rounded-xl">
                      <input type="radio" name="method" className="w-4 h-4 accent-brand" />
                      <div className="flex items-center gap-3">
                        <ArrowDownRight className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-xs text-white/50">2-4 hours • No fees</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <Button size="lg" variant="premium" className="w-full gap-2">
                    <Plus className="w-5 h-5" />
                    Add ₹1,000 to Wallet
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
}