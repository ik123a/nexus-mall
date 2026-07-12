"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, FileText, Shield, Gavel, Lock, UserCheck, AlertTriangle, Clock, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";

const termsSections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
    items: [
      "By accessing or using NEXUS MALL (website, app, 3D Mall, AI Concierge), you agree to these Terms.",
      "If you disagree with any part, you may not use our services.",
      "We may update these Terms. Continued use after changes constitutes acceptance.",
      "Material changes are announced via email and in-app 30 days before taking effect.",
      "These Terms apply to all users: shoppers, sellers, brand partners, and visitors.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Eligibility",
    icon: UserCheck,
    items: [
      "You must be 18+ (or age of majority in your jurisdiction) to create an account.",
      "You're responsible for maintaining account security and all activity under your account.",
      "Provide accurate, current information. We may verify identity at any time.",
      "One account per person. Multiple accounts may be merged or closed.",
      "Accounts inactive for 24 months may be archived. Data retained per Privacy Policy.",
      "You may close your account anytime via Account → Settings. Orders history is anonymized.",
    ],
  },
  {
    id: "orders",
    title: "Orders & Pricing",
    icon: Shield,
    items: [
      "All orders are subject to acceptance and availability. We may cancel orders for pricing errors, fraud, or stock issues.",
      "Prices shown in INR (₹) include applicable taxes. International orders show local currency estimate.",
      "Payment is captured at order confirmation. BNPL/emi charges per provider terms.",
      "Promotional codes: one per order, non-stackable, exclude certain brands. We reserve the right to invalidate abused codes.",
      "3D Mall instant purchases are binding upon virtual checkout confirmation.",
      "Price matching: see FAQ. Applies only to identical products from authorized retailers.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping, Delivery & Risk",
    icon: Globe,
    items: [
      "Shipping timelines are estimates, not guarantees. Force majeure events excuse delays.",
      "Risk transfers to you upon delivery (or pickup scan for locker/partner pickup).",
      "International orders: you're the importer of record. Duties/taxes are your responsibility.",
      "Address accuracy is your responsibility. Re-shipping fees apply for failed deliveries due to incorrect addresses.",
      "Package insurance included up to ₹50,000. Higher values require declared value at checkout.",
      "Digital goods (gift cards, subscriptions) delivered instantly via email/app. Non-refundable once delivered.",
    ],
  },
  {
    id: "returns",
    title: "Returns, Refunds & Exchanges",
    icon: AlertTriangle,
    items: [
      "30-day return window for most physical goods. 14 days for 3D Mall virtual try-on items.",
      "Items must be unused, with tags, original packaging. Beauty: sealed only. Personalized/final sale: non-returnable.",
      "Free return shipping. Gold/Platinum: instant refund on pickup scan. Others: 3-5 business days after receipt.",
      "Refunds to original payment method. NEXUS Wallet credits expire 1 year from issuance.",
      "Exchanges: free shipping both ways. Size/color swaps prioritized over refunds.",
      "We reserve the right to refuse returns showing wear, damage, or missing components.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: Lock,
    items: [
      "All content, design, code, 3D assets, AI models, brand curation: © NEXUS MALL or licensors.",
      "Brand logos, product images, descriptions used with permission. Respective owners retain rights.",
      "You may not scrape, reproduce, distribute, or create derivative works without written consent.",
      "Your content (reviews, photos, avatar): you grant us a worldwide, royalty-free license to use, display, modify for service operation.",
      "We respect IP rights. DMCA/IT Act takedown requests: ip@nexusmall.com. Repeat infringers: account termination.",
    ],
  },
  {
    id: "conduct",
    title: "User Conduct & Prohibited Activities",
    icon: Gavel,
    items: [
      "No bots, scrapers, automated purchasing, or API abuse without written permission.",
      "No fraud, fake reviews, review manipulation, or coordinated inauthentic behavior.",
      "No harassment, hate speech, or illegal content in reviews, chats, 3D Mall, or AI interactions.",
      "No reverse engineering, decompiling, or attempting to extract source code or AI model weights.",
      "No reselling NEXUS-exclusive products commercially without authorization.",
      "Violations may result in warnings, suspensions, bans, or legal action.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: AlertTriangle,
    items: [
      "Services provided 'as is' and 'as available'. No warranties: merchantability, fitness, non-infringement.",
      "We're not liable for: indirect, incidental, special, consequential, or punitive damages.",
      "Not liable for: lost profits, data, goodwill, service interruptions, third-party actions.",
      "Total liability capped at the greater of: fees paid in prior 12 months or ₹10,000.",
      "Some jurisdictions don't allow liability limits. In those, liability is limited to the max extent permitted.",
      "This section survives termination.",
    ],
  },
  {
    id: "disputes",
    title: "Dispute Resolution & Governing Law",
    icon: Gavel,
    items: [
      "Governing law: Republic of India. Exclusive jurisdiction: Mumbai courts.",
      "Informal resolution first: contact support@nexusmall.com. We'll respond within 15 days.",
      "If unresolved: binding arbitration under Arbitration & Conciliation Act, 1996. Seat: Mumbai. Language: English.",
      "Class actions/joinder waived to the fullest extent permitted by law.",
      "Consumer protection rights under applicable law are not waived.",
    ],
  },
  {
    id: "general",
    title: "General Provisions",
    icon: Clock,
    items: [
      "Entire agreement: these Terms + Privacy Policy + any referenced policies constitute the full agreement.",
      "Severability: if any provision is unenforceable, the rest remains in effect.",
      "No waiver: failure to enforce a right doesn't waive it.",
      "Assignment: we may assign these Terms. You may not assign without our consent.",
      "Force majeure: we're not liable for delays/failures beyond our reasonable control.",
      "Contact: legal@nexusmall.com for questions about these Terms.",
    ],
  },
];

function TermsSection({ section, isActive, onToggle }: { section: typeof termsSections[0]; isActive: boolean; onToggle: () => void }) {
  return (
    <Card className="group">
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <section.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-lg">{section.title}</span>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40 flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6 pt-2 border-t border-white/5"
            >
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-start gap-3 text-white/70 leading-relaxed"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function TermsPage() {
  const [openSections, setOpenSections] = useState<string[]>(["acceptance"]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

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
            <Gavel className="w-3.5 h-3.5 text-amber-400" />
            <span>LAST UPDATED JULY 8, 2026 · v2.4</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-6"
          >
            Terms of
            <br />
            <span className="text-gradient">Service.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            The rules of engagement. Clear, fair, and binding. Please read carefully.
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {termsSections.map((section) => (
              <TermsSection
                key={section.id}
                section={section}
                isActive={openSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </motion.div>

          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-strong rounded-3xl p-8 text-center border border-blue-400/20"
          >
            <h3 className="text-xl font-bold mb-4">By using NEXUS MALL, you agree to these Terms.</h3>
            <p className="text-white/60 mb-6">Questions? Email <a href="mailto:legal@nexusmall.com" className="text-blue-400 hover:underline">legal@nexusmall.com</a></p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}