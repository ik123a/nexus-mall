"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { floors } from "@/constants/floors";
import Image from "next/image";
import dynamic from "next/dynamic";

const MallExplorerScene = dynamic(
  () => import("@/components/three/mall-explorer-scene").then((mod) => mod.MallExplorerScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] text-white/40 text-sm">
        <span className="w-2 h-2 rounded-full bg-brand mr-2 animate-ping" />
        Initializing 3D Mall Explorer...
      </div>
    ),
  }
);

export default function MallPage() {
  const [selectedFloor, setSelectedFloor] = useState(0);

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-6xl font-display font-black mb-3">
            Explore the <span className="text-gradient">3D Mall</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">Interact with the model · Click a floor · Visit any store</p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative" style={{ height: "70vh", minHeight: 500 }}>
        <MallExplorerScene />

        {/* HUD overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
          <div className="glass-strong rounded-2xl p-4 pointer-events-auto">
            <div className="text-xs text-brand font-semibold mb-1">SELECTED FLOOR</div>
            <div className="text-lg font-bold">{floors[selectedFloor]?.name || "Mall"}</div>
            <div className="text-xs text-white/50 mt-1 max-w-xs">{floors[selectedFloor]?.description}</div>
          </div>
          <div className="glass-strong rounded-2xl p-3 pointer-events-auto flex gap-2">
            <button
              onClick={() => setSelectedFloor(0)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 border border-brand/30 text-sm font-bold hover:from-brand/30 hover:to-brand/20 transition"
            >B</button>
            <button
              onClick={() => setSelectedFloor(1)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 border border-brand/30 text-sm font-bold hover:from-brand/30 hover:to-brand/20 transition"
            >G</button>
            <button
              onClick={() => setSelectedFloor(2)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald/20 to-emerald/10 border border-emerald/30 text-sm font-bold hover:from-emerald/30 hover:to-emerald/20 transition"
            >1</button>
            <button
              onClick={() => setSelectedFloor(3)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-light/20 to-emerald-light/10 border border-emerald-light/30 text-sm font-bold hover:from-emerald-light/30 hover:to-emerald-light/20 transition"
            >2</button>
          </div>
        </div>
      </div>

      {/* Floor list */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {floors.map((floor, i) => (
            <motion.div
              key={floor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-3xl p-6 cursor-pointer transition-all ${
                selectedFloor === i ? "border-brand/40 shadow-lg shadow-brand/10" : "hover:border-white/20"
              }`}
              onClick={() => setSelectedFloor(i)}
            >
              <div className="text-3xl mb-3 font-bold text-gradient">{floor.id === -1 ? "P" : floor.id}</div>
              <h3 className="font-bold mb-2">{floor.name}</h3>
              <p className="text-sm text-white/50 mb-4">{floor.description}</p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{floor.stores.length} stores</span>
                <MapPin className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stores on selected floor */}
        {floors[selectedFloor] && (
          <motion.div key={selectedFloor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Stores on {floors[selectedFloor].name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {floors[selectedFloor].stores.map((store) => (
                <Link
                  key={store.id}
                  href={`/stores/${store.id}`}
                  className="glass rounded-2xl p-4 text-center hover:border-brand/30 transition group"
                >
                  <div className="aspect-square rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-brand/10 to-emerald/10">
                    {store.image && (
                      <Image src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                    )}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-brand transition">{store.name}</h3>
                  <p className="text-[10px] text-white/40 mt-1 line-clamp-2">{store.description}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-yellow-400">
                    ⭐ {store.rating}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}