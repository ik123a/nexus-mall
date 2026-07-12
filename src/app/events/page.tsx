"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Image from "next/image";

const events = [
  { title: "Fashion Week Runway 2026", category: "Fashion", date: "Jul 12, 2026", time: "7:00 PM", location: "Atrium, 5th Floor", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", att: 2400 },
  { title: "Quantum Lens AR Launch", category: "Tech", date: "Jul 14, 2026", time: "6:30 PM", location: "NE0 Arcade", image: "https://images.unsplash.com/photo-1572635196237-34b9ada94842?w=800&q=80", att: 1200 },
  { title: "Beauty Masterclass with Aura", category: "Beauty", date: "Jul 16, 2026", time: "11:00 AM", location: "Aura Studio", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab9be?w=800&q=80", att: 850 },
  { title: "Michelin Chefs Tasting Night", category: "Food", date: "Jul 18, 2026", time: "7:30 PM", location: "Skyfood Court", image: "https://images.unsplash.com/photo-1517248135467-3c73898e0a05?w=800&q=80", att: 320 },
  { title: "Diamond Atelier Reveal", category: "Jewelry", date: "Jul 20, 2026", time: "5:00 PM", location: "Solis Jewels", image: "https://images.unsplash.com/photo-1515562140728-774106c84e0c?w=800&q=80", att: 240 },
  { title: "Running Masterclass with Pro Athletes", category: "Sports", date: "Jul 22, 2026", time: "9:00 AM", location: "Pulse Atrium", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", att: 560 },
];

const categories = ["All", "Fashion", "Tech", "Beauty", "Food", "Jewelry", "Sports"];

export default function EventsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? events : events.filter((e) => e.category === active);

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-display font-black mb-4">
              Upcoming <span className="text-gradient">Events</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto">Runway shows, exclusive launches, tastings & masterclasses</p>
          </motion.div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 rounded-full text-sm transition ${
                active === c ? "bg-gradient-to-r from-brand to-emerald text-white shadow-lg" : "glass border border-white/10 text-white/60 hover:text-white"
              }`}>{c}</button>
            ))}
          </div>

          {/* Events grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-0 overflow-hidden hover:border-brand/30 transition group cursor-pointer">
                  <div className="relative aspect-[16/10]">
                    <Image src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-brand to-emerald text-[10px] font-bold">{event.category}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/70"><Calendar className="w-4 h-4 text-brand" /> {event.date} · {event.time}</div>
                    <div className="flex items-center gap-2 text-sm text-white/70"><MapPin className="w-4 h-4 text-emerald" /> {event.location}</div>
                    <div className="flex items-center gap-2 text-sm text-white/70"><Filter className="w-4 h-4 text-emerald-light" /> {event.att.toLocaleString()} attending</div>
                    <Button className="w-full mt-3" size="sm">Get Tickets <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <CommandMenu />
      <Toaster />
    </main>
  );
}