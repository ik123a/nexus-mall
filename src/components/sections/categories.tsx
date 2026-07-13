"use client";

import { motion } from "framer-motion";
import { categories } from "@/constants/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Zap, Gamepad2, Utensils, Film } from "lucide-react";
import Link from "next/link";

const floorIcons = {
  luxury: Crown,
  electronics: Zap,
  fashion: Crown,
  sports: Gamepad2,
  kids: Gamepad2,
  books: Film,
  home: Crown,
  jewelry: Crown,
  supermarket: Utensils,
  food: Utensils,
  gaming: Gamepad2,
  cinema: Film,
  parking: Crown,
  beauty: Crown,
  tech: Zap,
  auto: Crown,
} as const;

function FloorIcon({ icon }: { icon: keyof typeof floorIcons }) {
  const Icon = floorIcons[icon] || Crown;
  return <Icon className="w-6 h-6 text-white" />;
}

export function CategoryShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-black/20 to-transparent border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Explore by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">16 curated categories across 5 immersive floors</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <Link href={`/shop?category=${cat.slug}`}>
                <Card className="p-4 text-center hover:border-blue-400/30 transition-colors group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition">
                    <FloorIcon icon={cat.slug as keyof typeof floorIcons} />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-blue-400 transition">{cat.name}</h3>
                  <p className="text-[10px] text-white/40 mt-0.5">{cat.productCount.toLocaleString()} items</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="premium" size="lg">
            <Link href="/mall">
              Enter 3D Mall
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}