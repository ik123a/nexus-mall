"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CreditCard, Gift, Heart, Star, Sparkles, ArrowRight, Check, X, Mail, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const cardDesigns = [
  {
    id: "classic",
    name: "Classic Noir",
    gradient: "from-black via-gray-900 to-black",
    border: "border-white/10",
    accent: "text-white",
    preview: "PREMIUM GIFT CARD",
  },
  {
    id: "aurora",
    name: "Aurora",
    gradient: "from-purple-600 via-pink-500 to-blue-500",
    border: "border-purple-400/30",
    accent: "text-white",
    preview: "AURORA GIFT CARD",
  },
  {
    id: "neon",
    name: "Neon Pulse",
    gradient: "from-cyan-500 via-blue-600 to-purple-600",
    border: "border-cyan-400/30",
    accent: "text-white",
    preview: "NEON GIFT CARD",
  },
  {
    id: "gold",
    name: "Gold Leaf",
    gradient: "from-amber-600 via-yellow-400 to-amber-700",
    border: "border-amber-400/30",
    accent: "text-black",
    preview: "GOLD GIFT CARD",
  },
];

const presetAmounts = [50, 100, 250, 500, 1000, 2000, 5000];

export default function GiftCardsPage() {
  const [selectedDesign, setSelectedDesign] = useState("classic");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [isPhysical, setIsPhysical] = useState(false);

  const design = cardDesigns.find((d) => d.id === selectedDesign)!;
  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-purple-500/20 -top-20 -left-20" />
        <div className="orb w-[400px] h-[400px] bg-pink-500/20 top-40 -right-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>INSTANT DELIVERY · NO EXPIRY · USE ANYWHERE</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-6"
              >
                The Perfect
                <br />
                <span className="text-gradient">Gift Card.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-lg text-white/60 mb-8"
              >
                Choose a design, set the amount, add a personal message. Delivered instantly via email or scheduled for the perfect moment.
              </motion.p>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Sparkles, text: "Never expires" },
                  { icon: CreditCard, text: "Use online & in 3D Mall" },
                  { icon: Gift, text: "Works on sale items" },
                  { icon: Heart, text: "Combinable with promos" },
                ].map((b, i) => (
                  <motion.div
                    key={b.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm"
                  >
                    <b.icon className="w-4 h-4 text-blue-400" />
                    <span>{b.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Card Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div
                className={`relative rounded-3xl p-8 sm:p-12 aspect-[1.6] max-w-md mx-auto ${design.gradient} ${design.border} shadow-2xl shadow-black/50`}
              >
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wider text-sm">{design.preview}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-right">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Balance</p>
                    <p className={`text-4xl font-black ${design.accent}`}>₹{finalAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="text-xs text-white/50">NEXUS MALL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Design Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-bold mb-6">Choose Design</h3>
              <div className="space-y-3">
                {cardDesigns.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesign(d.id)}
                    className={`relative w-full aspect-[1.6] rounded-2xl p-6 overflow-hidden transition-all duration-300 flex items-end ${
                      selectedDesign === d.id
                        ? "ring-2 ring-blue-400/50 scale-[1.02]"
                        : "hover:ring-1 ring-white/10"
                    } ${d.gradient} ${d.border}`}
                  >
                    <span className={`font-bold tracking-wider ${d.accent}`}>{d.preview}</span>
                    {selectedDesign === d.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Config Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-8">
                <h3 className="text-lg font-bold mb-6">Customize Your Gift</h3>

                {/* Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Amount (₹50 – ₹5,000)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {presetAmounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setAmount(a); setCustomAmount(""); }}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                          amount === a && !customAmount
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "glass border border-white/10 text-white/70 hover:text-white"
                        }`}
                      >
                        ₹{a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40">Custom:</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-40"
                      min={50}
                      max={5000}
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Delivery</label>
                  <Tabs defaultValue="email" className="space-y-4">
                    <TabsList className="grid grid-cols-2 bg-transparent p-0">
                      <TabsTrigger value="email" className="bg-transparent shadow-none">Email (Instant)</TabsTrigger>
                      <TabsTrigger value="schedule" className="bg-transparent shadow-none">Schedule</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-4 pt-0">
                      <Input placeholder="recipient@email.com" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                    </TabsContent>
                    <TabsContent value="schedule" className="space-y-4 pt-0">
                      <Input type="date" value={sendDate} onChange={(e) => setSendDate(e.target.value)} className="max-w-xs" />
                      <Input placeholder="recipient@email.com" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                      <p className="text-xs text-white/40">Scheduled gifts send at 9:00 AM on the selected date.</p>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Recipient Details */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Recipient Name</label>
                    <Input placeholder="Alex" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Your Name</label>
                    <Input placeholder="Sam" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1.5">Message (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full glass border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/40 transition resize-none"
                    placeholder="Happy Birthday! Thought you'd love picking something from NEXUS…"
                    maxLength={500}
                  />
                  <p className="text-xs text-white/30 text-right mt-1">{message.length}/500</p>
                </div>

                {/* Physical Card Option */}
                <div className="mb-6 flex items-center gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPhysical}
                      onChange={(e) => setIsPhysical(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 accent-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-white/80">Also mail a physical card (+₹99, 3-5 days)</span>
                  </label>
                </div>

                {/* Add to Cart */}
                <Button
                  size="xl"
                  variant="premium"
                  className="w-full gap-3"
                  onClick={() => {
                    // Add to cart logic would go here
                    alert(`Gift card added to cart: ₹${finalAmount.toLocaleString()}`);
                  }}
                >
                  <Gift className="w-5 h-5" />
                  Add to Cart — ₹{finalAmount.toLocaleString()}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}