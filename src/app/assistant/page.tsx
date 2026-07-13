"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Image as ImgIcon, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products } from "@/constants/products";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Message = { role: "user" | "ai"; content: string; products?: typeof products };

const quickPrompts = [
  "Recommend me a gift under ₹5,000",
  "Show me trending sneakers",
  "What's your favorite smartwatch?",
  "Help me build an outfit for a party",
  "Find me the best noise-cancelling headphones",
  "Show me new arrivals in beauty",
];

const aiResponses: Record<string, string> = {
  sneakers: "I've hand-picked the **Carbon X Running Shoes** — they're flying off shelves and get a 4.8 rating from 3,000+ runners. The carbon plate gives 5% energy return. Want to see them?",
  watch: "The **Holographic Smartwatch X9** is my top pick. It has ECG, a sapphire screen, and a 14-day battery. Perfect for both fitness and style.",
  gift: "For a luxury feel under ₹5,000, try the **Aurora Silk Dress** (on sale at ₹890) or **Neon Runner Sneakers** at ₹240. The latter is unisex and ships in 24 hours.",
  outfit: "Building an outfit… **Maison Noir Leather Bag** + **Luxe Couture Trench**. Effortlessly futuristic. Want me to find shoes to complete it?",
  headphones: "The **Aerospace Pro Headphones** from Quantum are unbeatable — adaptive ANC, spatial audio, 60-hour battery, and titanium frame. 4.9 stars from 2,847 reviews.",
  beauty: "New in beauty: **Aura Glow Serum** with 5% niacinamide + peptide complex. 4.8 stars from 8,943 reviews. Dermatologist tested, vegan, and on sale at ₹120.",
};

export default function AssistantPage() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi, I'm your NEXUS concierge. Ask me anything — products, outfits, or where to find something in the mall." },
  ]);
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const lower = text.toLowerCase();
      let key: string | null = null;
      if (lower.includes("sneaker") || lower.includes("shoe")) key = "sneakers";
      else if (lower.includes("watch")) key = "watch";
      else if (lower.includes("gift")) key = "gift";
      else if (lower.includes("outfit")) key = "outfit";
      else if (lower.includes("headphone") || lower.includes("audio")) key = "headphones";
      else if (lower.includes("beauty") || lower.includes("skincare") || lower.includes("serum")) key = "beauty";

      const reply = key ? aiResponses[key] : "Let me help you with that. Try asking about sneakers, a watch, a gift idea, an outfit, headphones, or beauty products.";
      const aiMsg: Message = {
        role: "ai",
        content: reply,
        products: key === "sneakers"
          ? products.filter((p) => p.tags.includes("sneakers")).slice(0, 2)
          : key === "headphones"
            ? products.filter((p) => p.tags.includes("audio")).slice(0, 2)
            : key === "beauty"
              ? products.filter((p) => p.category === "beauty").slice(0, 2)
              : undefined,
      };
      setMessages((m) => [...m, aiMsg]);
    }, 800);
  };

  const sidebarProducts = products.filter((p) => p.isTrending || p.isNew).slice(0, 6);

  return (
    <main className="h-screen flex">
      <Navbar />

      {/* Sidebar - Suggested for you */}
      <motion.aside
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block w-80 border-r border-white/5 glass bg-black/40 flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold">Suggested for You</h2>
          <button onClick={() => setShowSidebar(!showSidebar)} className="text-white/40 hover:text-white">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sidebarProducts.map((p) => (
            <Button
              key={p.id}
              variant="ghost"
              className="w-full justify-start gap-3 p-3 hover:bg-white/5"
              onClick={() => router.push(`/product/${p.id}`)}
            >
              <Image src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" fill sizes="48px" />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-white/50">₹{p.price.toLocaleString()}</p>
              </div>
            </Button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <Button variant="outline" className="w-full gap-2" onClick={() => setOpen(true)}>
            <Sparkles className="w-4 h-4" />
            Open Full Chat
          </Button>
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NEXUS Concierge</h1>
              <p className="text-xs text-white/50">Always online · Powered by N-9</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => setShowSidebar(true)}>
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] lg:max-w-[60%] px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-brand to-emerald text-white rounded-br-md"
                    : "bg-white/5 border border-white/10 rounded-bl-md"
                }`}>
                  <div className="prose prose-invert max-w-none text-sm">
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className="whitespace-pre-wrap">{line}</p>
                    ))}
                  </div>
                  {msg.products && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((p) => (
                        <Button
                          key={p.id}
                          variant="ghost"
                          className="w-full justify-start gap-3 p-2 rounded-xl hover:bg-white/10"
                          onClick={() => { setOpen(false); router.push(`/product/${p.id}`); }}
                        >
                          <Image src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" fill sizes="40px" />
                          <div className="text-left flex-1">
                            <p className="text-xs font-medium truncate">{p.name}</p>
                            <p className="text-[10px] text-white/60">₹{p.price.toLocaleString()}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5 bg-black/40">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  size="sm"
                  className="text-xs px-3 py-1.5"
                  onClick={() => send(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (input.trim()) send(input); }} className="flex items-center gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1"
              />
              <Button type="submit" size="icon" className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-emerald">
                <Sparkles className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <CommandMenu />
      <Toaster />
      <Footer />
    </main>
  );
}