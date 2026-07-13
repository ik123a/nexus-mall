"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { products } from "@/constants/products";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Message = { role: "user" | "ai"; content: string; products?: typeof products };

const quickPrompts = [
  "Recommend me a gift under $500",
  "Show me trending sneakers",
  "What's your favorite watch?",
  "Help me build an outfit",
];

const aiResponses: Record<string, string> = {
  sneakers: "I've hand-picked the **Carbon X Running Shoes** — they're flying off shelves and get a 4.8 rating from 3,000+ runners. Want to see them?",
  watch: "The **Holographic Smartwatch X9** is my top pick. It has ECG, a sapphire screen, and a 14-day battery.",
  gift: "For a luxury feel under $500, try the **Aurora Silk Dress** (on sale) or **Neon Runner Sneakers**. The latter is unisex and ships in 24 hours.",
  outfit: "Building an outfit… **Maison Noir Leather Bag** + **Luxe Couture Trench**. Effortlessly futuristic.",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi, I'm your NEXUS concierge. Ask me anything — products, outfits, or where to find something in the mall." },
  ]);
  const [input, setInput] = useState("");
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
      const key = lower.includes("sneaker") || lower.includes("shoe") ? "sneakers"
        : lower.includes("watch") ? "watch"
        : lower.includes("gift") ? "gift"
        : lower.includes("outfit") ? "outfit" : null;
      const reply = key ? aiResponses[key] : "Let me help you with that. Try asking about sneakers, a watch, a gift idea, or an outfit.";
      const aiMsg: Message = {
        role: "ai",
        content: reply,
        products: key === "sneakers" ? products.filter((p) => p.tags.includes("sneakers")).slice(0, 2) : undefined,
      };
      setMessages((m) => [...m, aiMsg]);
    }, 800);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand to-emerald shadow-2xl shadow-brand/40 flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        <Sparkles className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[80vh] glass-strong rounded-3xl flex flex-col overflow-hidden shadow-2xl shadow-brand/20"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">NEXUS Concierge</h3>
                  <p className="text-[10px] text-white/50">Always online · Powered by N-9</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-brand to-emerald text-white"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {msg.content}
                    {msg.products && (
                      <div className="mt-2 space-y-2">
                        {msg.products.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => { setOpen(false); router.push(`/product/${p.id}`); }}
                            className="flex items-center gap-2 w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
                          >
                            <Image src={p.image} alt={p.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="text-left">
                              <div className="text-xs.font-medium truncate">{p.name}</div>
                              <div className="text-[10px] text-white/60">${p.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); if (input.trim()) send(input); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-brand/50"
                />
                <button type="submit" className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
