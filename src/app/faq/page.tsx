"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Package, Truck, RotateCcw, CreditCard, User, Crown, HelpCircle, MessageSquare, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqCategories = [
  { id: "all", label: "All", icon: HelpCircle },
  { id: "orders", label: "Orders", icon: Package },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "returns", label: "Returns", icon: RotateCcw },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "account", label: "Account", icon: User },
  { id: "membership", label: "Membership", icon: Crown },
];

const faqs = [
  {
    category: "orders",
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive an email with a tracking link. You can also view tracking info in your Account → Orders section. For 3D Mall orders, tracking shows the virtual-to-physical handoff in real time.",
  },
  {
    category: "orders",
    question: "Can I modify or cancel my order?",
    answer: "You have a 15-minute window after placing an order to modify or cancel it from your Order Details page. After that, the order enters our fulfillment pipeline and can't be changed. For 3D Mall instant purchases, the window is 5 minutes.",
  },
  {
    category: "orders",
    question: "What if my order arrives damaged?",
    answer: "We're sorry! Report it within 48 hours via Account → Orders → Report Issue. Upload photos and we'll process a replacement or full refund within 24 hours — no return required for items under ₹5,000.",
  },
  {
    category: "orders",
    question: "Do you offer price matching?",
    answer: "Yes. If you find the same product at a lower price from an authorized retailer within 14 days, we'll match it and refund the difference plus 10% as NEXUS credits. Excludes flash sales and marketplace sellers.",
  },
  {
    category: "shipping",
    question: "What are your shipping options?",
    answer: "Standard (3-5 days, free over ₹2,999), Express (1-2 days, ₹299), and Instant (2-4 hours in 12 metros, ₹499). 3D Mall purchases ship from the nearest physical partner store for fastest delivery.",
  },
  {
    category: "shipping",
    question: "Do you ship internationally?",
    answer: "We currently ship to 47 countries. Duties and taxes are calculated at checkout for most regions. Delivery times: 5-10 business days for major markets, 10-20 for others. Check the shipping calculator at checkout for your exact timeline.",
  },
  {
    category: "shipping",
    question: "Can I change my delivery address after ordering?",
    answer: "Yes, if the order hasn't shipped yet. Go to Account → Orders → Change Address. For Instant delivery, you have 5 minutes. For Standard/Express, up to 2 hours after ordering.",
  },
  {
    category: "shipping",
    question: "What if I'm not home for delivery?",
    answer: "Our partners attempt delivery twice. After that, the package goes to the nearest pickup point for 7 days. You'll get SMS/WhatsApp notifications with the pickup code. For Instant delivery, we call you 10 minutes before arrival.",
  },
  {
    category: "returns",
    question: "What's your return policy?",
    answer: "30-day free returns on most items. Items must be unworn, with tags and original packaging. Beauty products must be unopened. 3D Mall virtual try-on items have a 14-day return window since fit is pre-verified.",
  },
  {
    category: "returns",
    question: "How do I start a return?",
    answer: "Go to Account → Orders → Start Return. Select items, choose reason, pick pickup or drop-off. We'll email a QR code — no printer needed. Refunds process within 3-5 business days after we receive the return.",
  },
  {
    category: "returns",
    question: "Are return shipping fees free?",
    answer: "Yes, for all standard returns within 30 days. Exchange shipping is always free. For membership tiers Silver and above, we also offer doorstep pickup at no cost. Gold/Platinum get instant refunds upon pickup scan.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer: "UPI, all major cards (Visa, Mastercard, Amex, RuPay), Net Banking, Wallets (Paytm, PhonePe, Google Pay), BNPL (Simpl, LazyPay, ZestMoney, Ola Money), and NEXUS Wallet balance. Crypto payments (USDC, ETH) for Gold+ members.",
  },
  {
    category: "payment",
    question: "Is my payment info secure?",
    answer: "Absolutely. We're PCI DSS Level 1 certified. Card details are tokenized — we never see your full number. UPI uses NPCI's secure rails. All transactions are encrypted end-to-end with 256-bit TLS.",
  },
  {
    category: "payment",
    question: "Can I split payment across methods?",
    answer: "Yes. At checkout, choose 'Split Payment' to combine NEXUS Wallet, cards, UPI, and BNPL in one order. Great for using expiring credits or gift cards alongside your primary method.",
  },
  {
    category: "payment",
    question: "Do you offer EMI options?",
    answer: "No-cost EMI on orders above ₹5,000 with most major banks (3, 6, 9, 12 months). No-cost means zero interest — the brand absorbs the cost. Instant approval at checkout. Gold+ members get 18/24 month options.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page. Enter your email/phone — we'll send a magic link (no password needed) or an OTP. Links expire in 15 minutes for security.",
  },
  {
    category: "account",
    question: "Can I have multiple addresses?",
    answer: "Yes. Save unlimited addresses in Account → Addresses. Set a default, add nicknames (Home, Office, Mom's), and choose per-order at checkout. We also auto-detect from your last 5 orders.",
  },
  {
    category: "account",
    question: "How do I delete my account?",
    answer: "Go to Account → Settings → Delete Account. We'll confirm via email and process within 30 days. Order history is anonymized but retained for legal compliance. NEXUS Wallet balance is refunded to source.",
  },
  {
    category: "membership",
    question: "What are the membership tiers?",
    answer: "Bronze (free), Silver (₹999/yr), Gold (₹2,999/yr), Platinum (₹9,999/yr or invite-only). Each tier unlocks progressively better perks: free express shipping, early access, concierge, events, and more.",
  },
  {
    category: "membership",
    question: "Can I upgrade/downgrade anytime?",
    answer: "Upgrade anytime — prorated charge, instant benefits. Downgrade at renewal. Platinum is invite-only and can't be purchased directly. No penalties, no lock-ins.",
  },
  {
    category: "membership",
    question: "Do membership benefits apply to 3D Mall?",
    answer: "Yes, and then some. Gold+ members get a personal 3D Mall guide, exclusive virtual showrooms, and priority access to limited drops in the metaverse. Silver gets free 3D Mall navigation.",
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="group">
      <CardContent className="p-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        >
          <span className="font-medium text-lg pr-10">{faq.question}</span>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/40 text-sm font-mono">{faq.category}</span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/40"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
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

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredFAQs = faqs.filter((f) => {
    const matchesCat = activeCategory === "all" || f.category === activeCategory;
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-blue-500/20 -top-20 -left-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>{faqs.length} QUESTIONS ANSWERED</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-6"
          >
            Frequently Asked
            <br />
            <span className="text-gradient">Questions.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Can't find what you're looking for? Our AI Concierge is available 24/7.
          </motion.p>
        </div>
      </section>

      {/* Search + Category Pills */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-2xl mx-auto mb-10"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <Input
              placeholder="Search FAQs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "glass border border-white/10 text-white/60 hover:text-white hover:border-blue-400/20"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 max-w-4xl mx-auto"
          >
            {filteredFAQs.map((faq, i) => (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <FAQItem faq={faq} />
              </motion.div>
            ))}
            {filteredFAQs.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No FAQs match your search.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-display font-black mb-4">Still need help?</h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Our support team responds in under 2 minutes during business hours. Or chat with our AI Concierge instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="premium" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat with AI Concierge
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="w-5 h-5" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

