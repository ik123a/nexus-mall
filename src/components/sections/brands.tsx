"use client";

import { motion } from "framer-motion";

const brands = [
  "QUANTUM", "LUXE", "PULSE", "SOLIS", "AURA", "MAISON NOIR", "STUDIO", "NEO",
  "NOVA", "NEXUS", "SKYFOOD", "GALAXY", "SPECTRA", "ORBITAL", "LUNAR", "COSMOS",
];

export function BrandsMarquee() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/30 tracking-[0.3em] uppercase"
        >
          Featured Brands in the Mall
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient edge overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -100 * brands.length] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-16 whitespace-nowrap"
          style={{ width: `${brands.length * 200}px` }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              <span className="text-lg font-bold text-white/10 hover:text-white/30 transition select-none tracking-wider">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}