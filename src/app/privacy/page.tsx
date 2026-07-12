"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Shield, Cookie, Share2, UserCheck, Mail, Scale, Bell } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const privacySections = [
  {
    id: "collected",
    title: "Information We Collect",
    icon: FileText,
    items: [
      "Account data: name, email, phone, hashed password, profile photo",
      "Transaction data: order history, payment methods (tokenized), shipping addresses",
      "Behavioral data: pages viewed, products clicked, search queries, time spent",
      "Device data: IP address, browser type, OS, device IDs, push tokens",
      "Location data: approximate location (IP-based), precise location (with consent)",
      "3D Mall data: avatar customizations, virtual space interactions, voice chat logs (opt-in)",
      "AI Concierge data: conversation history, preferences inferred, product recommendations shown",
      "Third-party data: social login profiles, referral sources, advertising IDs (with consent)",
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: Shield,
    items: [
      "Fulfill orders, process payments, arrange shipping, handle returns",
      "Personalize your experience: recommendations, search ranking, 3D Mall layout",
      "Power AI Concierge with context-aware responses and proactive suggestions",
      "Communicate: order updates, security alerts, marketing (with consent), feature announcements",
      "Improve our platform: analytics, A/B testing, bug detection, performance monitoring",
      "Fraud prevention: anomaly detection, account takeover protection, payment verification",
      "Legal compliance: tax records, regulatory reporting, law enforcement requests",
      "Business operations: analytics, capacity planning, vendor management, audits",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    icon: Cookie,
    items: [
      "Essential cookies: session management, authentication, security, cart persistence (always on)",
      "Analytics cookies: page views, funnels, feature adoption (opt-out available)",
      "Personalization cookies: recommendations, 3D Mall state, AI Concierge context (opt-out available)",
      "Marketing cookies: ad attribution, retargeting, lookalike audiences (opt-in only)",
      "Third-party cookies: payment processors, chat widgets, analytics providers (see list below)",
      "Local storage: 3D Mall assets, AI conversation cache, offline cart sync",
      "You can manage all non-essential cookies via the cookie banner or Account → Privacy Settings",
      "Do Not Track: we respect DNT headers and disable non-essential tracking automatically",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Sharing",
    icon: Share2,
    items: [
      "Payment processors: Razorpay, Stripe, PayPal (tokenized data only, PCI DSS Level 1)",
      "Shipping partners: Delhivery, Blue Dart, Ecom Express (name, address, phone for delivery)",
      "Analytics: Mixpanel, PostHog, Google Analytics (anonymized, IP masking enabled)",
      "AI/ML: OpenAI, Anthropic APIs (conversation content, no account identifiers)",
      "Marketing: Meta, Google Ads (hashed emails for matched audiences, opt-in only)",
      "Customer support: Intercom, Zendesk (ticket data, conversation history)",
      "Infrastructure: AWS, Vercel, Cloudflare (logs, performance metrics, no PII in logs)",
      "We never sell your personal data. All sharing is under strict DPAs with purpose limitation.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights & Controls",
    icon: UserCheck,
    items: [
      "Access: download all your data via Account → Privacy → Download Data (JSON/CSV, ready in 24h)",
      "Rectification: edit profile, addresses, preferences anytime in Account settings",
      "Erasure: request deletion via Account → Privacy → Delete Account (30-day process, legal holds apply)",
      "Portability: export in standard formats (JSON, CSV, VCF for contacts)",
      "Restriction: pause processing for marketing, analytics, AI training via Privacy Settings",
      "Objection: opt out of profiling, automated decisions, direct marketing at any time",
      "Consent withdrawal: revoke any consent (cookies, marketing, location) without affecting core service",
      "Complaints: contact our DPO at dpo@nexusmall.com or your local data protection authority",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    items: [
      "Data Protection Officer: dpo@nexusmall.com",
      "Privacy Team: privacy@nexusmall.com",
      "Postal: NEXUS MALL Privacy, 12th Floor, Nexus Tower, Bandra Kurla Complex, Mumbai 400051, India",
      "Response time: we acknowledge within 48 hours, resolve within 30 days per GDPR/PDPA",
      "For urgent security issues: security@nexusmall.com (PGP key available on request)",
      "This policy was last updated: July 8, 2026. Version 2.4. Changes are announced via email and in-app.",
    ],
  },
];

function PrivacySection({ section, isActive, onToggle }: { section: typeof privacySections[0]; isActive: boolean; onToggle: () => void }) {
  return (
    <Card className="group">
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center">
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
                    <div className="w-1.5 h-1.5 rounded-full bg-brand/20 mt-2.5 flex-shrink-0" />
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

export default function PrivacyPage() {
  const [openSections, setOpenSections] = useState<string[]>(["collected"]);

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
        <div className="orb w-[500px] h-[500px] bg-brand/20 -top-20 -left-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs"
          >
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span>LAST UPDATED JULY 8, 2026 · v2.4</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-black leading-[0.95] mb-6"
          >
            Privacy
            <br />
            <span className="text-gradient">Policy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Your data. Your control. We're transparent about every byte we collect and why.
          </motion.p>
        </div>
      </section>

      {/* TOC */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 mb-10"
          >
            <h3 className="font-semibold mb-4">Table of Contents</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {privacySections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSection(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition text-left ${
                    openSections.includes(s.id)
                      ? "bg-brand/10 border border-brand/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {privacySections.map((section) => (
              <PrivacySection
                key={section.id}
                section={section}
                isActive={openSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}