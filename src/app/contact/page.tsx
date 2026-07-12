"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, Send, ArrowRight, Calendar, MapPin, Sparkle, Crown, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto">We&apos;re here 24/7. Real humans, real fast.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact cards */}
            <div className="space-y-4">
              {[
                { title: "Customer Support", desc: "Order help, returns, account questions", email: "support@nexus.com", phone: "+1 (888) NEXUS-1", icon: Sparkles, color: "brand" },
                { title: "Press & Media", desc: "Interviews, brand collaborations, news", email: "press@nexus.com", phone: "+1 (888) NEXUS-2", icon: Mail, color: "purple" },
                { title: "Partnerships", desc: "Brands, sellers, B2B inquiries", email: "partners@nexus.com", phone: "+1 (888) NEXUS-3", icon: Crown, color: "amber" },
              ].map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-6 hover:border-brand/30 transition">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 ${
                      d.color === "brand" ? "from-brand/20 to-emerald/20" :
                      d.color === "purple" ? "from-emerald/20 to-emerald-light/20" :
                      "from-amber-500/20 to-orange-500/20"
                    }`}>
                      <d.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">{d.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{d.desc}</p>
                    <div className="space-y-1 text-sm">
                      <div className="text-brand">{d.email}</div>
                      <div className="text-white/50">{d.phone}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-white/50 mb-8">We respond in under 15 minutes during business hours.</p>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/60 block mb-1.5">First Name</label>
                      <Input placeholder="Alex" />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1.5">Last Name</label>
                      <Input placeholder="Chen" />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1.5">Email</label>
                      <Input type="email" placeholder="alex@nexus.com" />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 block mb-1.5">Phone</label>
                      <Input placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 block mb-1.5">Category</label>
                    <select className="w-full glass px-4 py-2 rounded-xl text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/50">
                      <option value="">Select a topic</option>
                      <option value="order">Order & Delivery</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="payment">Payment & Billing</option>
                      <option value="account">Account & Security</option>
                      <option value="membership">Membership & Rewards</option>
                      <option value="partnership">Partnerships</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 block mb-1.5">Message</label>
                    <textarea rows={5} className="w-full glass px-4 py-3 rounded-xl text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none placeholder:text-white/30" placeholder="How can we help you?" />
                  </div>
                  <Button className="w-full sm:w-auto" size="lg">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}