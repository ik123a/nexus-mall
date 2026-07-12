"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Package, Truck, RotateCcw, CheckCircle, Clock, Mail, ArrowRight, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const returnSteps = [
  {
    number: "01",
    title: "Start Your Return",
    desc: "Go to Account → Orders, select items, choose a reason. Get an instant QR code — no printer needed.",
    icon: Package,
  },
  {
    number: "02",
    title: "Drop Off or Schedule Pickup",
    desc: "Drop at 50,000+ partner points or schedule free doorstep pickup (Silver+ members). We handle the rest.",
    icon: Truck,
  },
  {
    number: "03",
    title: "Get Your Refund",
    desc: "Gold/Platinum: instant refund on pickup scan. Others: 3-5 business days after we receive it. Original payment method or NEXUS Wallet.",
    icon: RotateCcw,
  },
];

const returnFAQs = [
  {
    question: "What items can be returned?",
    answer: "Most items within 30 days, unworn with tags and original packaging. Beauty must be sealed. Personalized, final sale, and intimate items are non-returnable. 3D Mall virtual try-on items: 14-day window.",
  },
  {
    question: "Is return shipping free?",
    answer: "Yes, always free for standard returns within 30 days. Exchange shipping is also free both ways. Silver+ members get free doorstep pickup. Gold/Platinum get instant refunds upon carrier pickup scan.",
  },
  {
    question: "How long do refunds take?",
    answer: "Gold/Platinum: instant on pickup scan. Silver: 1-2 business days after pickup. Bronze: 3-5 business days after we receive and inspect at our facility. Refunds go to original payment method or NEXUS Wallet (your choice).",
  },
  {
    question: "Can I exchange instead of return?",
    answer: "Absolutely. Select 'Exchange' when starting your return. Choose size/color variant. We'll ship the replacement immediately — no waiting for the return to arrive. Free shipping both ways.",
  },
  {
    question: "What if I received a damaged/incorrect item?",
    answer: "Report within 48 hours via Account → Orders → Report Issue. Upload photos. We'll send a replacement immediately (no return needed for items under ₹5,000) and cover all shipping. Full refund if out of stock.",
  },
  {
    question: "Do I need the original box?",
    answer: "Preferred but not required. Any sturdy packaging works. Just include all tags, accessories, and documentation. For shoes: include the shoe box if possible — it protects the product in transit.",
  },
];

function FAQItem({ faq }: { faq: typeof returnFAQs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="group">
      <CardContent className="p-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        >
          <span className="font-medium text-lg pr-10">{faq.question}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40 flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6 pt-2 border-t border-white/5"
            >
              <p className="text-white/60 leading-relaxed">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function ReturnsPage() {
  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-blue-500/20 -top-20 -left-20" />
        <div className="orb w-[400px] h-[400px] bg-purple-500/20 top-40 -right-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-green-400" />
            <span>30-DAY FREE RETURNS · NO QUESTIONS ASKED</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-8"
          >
            Easy
            <br />
            <span className="text-gradient">Returns.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Not quite right? Send it back. Free shipping, instant refunds for Gold+, no hassle.
          </motion.p>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Three Steps to
              <span className="text-gradient">Zero Stress.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {returnSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative glass rounded-3xl p-8"
              >
                <div className="absolute -top-4 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-black text-white shadow-lg">
                  {step.number}
                </div>
                <div className="pt-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4 font-semibold">Common Questions</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black">
              Returns
              <span className="text-gradient">FAQ.</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {returnFAQs.map((faq, i) => (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <FAQItem faq={faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-black mb-6">
                Ready to start a
                <span className="text-gradient"> return?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Head to your orders page, select the items, and get your QR code instantly.
              </p>
              <Button size="xl" variant="premium" className="gap-3" asChild>
                <a href="/account/orders">
                  <RotateCcw className="w-5 h-5" />
                  Start a Return
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}