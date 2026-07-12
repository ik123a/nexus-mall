"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { floors } from "@/constants/floors";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function FloatingStore({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const ref = useRef<THREE.Group>(null);

  return (
    <Float key={label} speed={1.5} position={position} floatIntensity={1.5}>
      <group ref={ref}>
        <mesh>
          <coneGeometry args={[0.5, 1.2, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

function MallMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floor rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, i * 2 - 2, 0]}>
          <ringGeometry args={[3 - i * 0.2, 3.5 + (3 - i) * 0.15, 64]} />
          <meshStandardMaterial
            color={["#b8763e", "#10b981", "#34d399", "#10b981"][i]}
            emissive={["#b8763e", "#10b981", "#34d399", "#10b981"][i]}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Stores per floor */}
      {floors.map((floor, fi) =>
        floor.stores.map((store, si) => {
          const angle = (si / floor.stores.length) * Math.PI * 2 + fi * 0.2;
          const r = 2.5;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          const y = floor.id * 1.8 + 0.5;
          const color = ["#3b82f6", "#a855f7", "#00ffff", "#ec4899", "#8b5cf6"][si % 5];
          return <FloatingStore key={store.id} position={[x, y, z]} color={color} label={store.name} />;
        }),
      )}

      {/* Central spire */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.1, 0.3, 12, 32]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 11, 0]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [12, 8, 12], fov: 45 }}>
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 20, 50]} />

          <ambientLight intensity={0.3} />
          <pointLight position={[0, 15, 0]} intensity={3} color="#10b981" distance={30} />
          <pointLight position={[10, 5, 10]} intensity={2} color="#b8763e" />
          <pointLight position={[-10, 5, -10]} intensity={2} color="#34d399" />

          <Suspense fallback={null}>
            <MallMesh />
            <Stars radius={50} depth={50} count={1500} factor={4} fade speed={1} />
            <Environment preset="night" />
            <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={20} blur={2} far={10} />
          </Suspense>

          <EffectComposer>
            <Bloom intensity={1} luminanceThreshold={0.4} luminanceSmoothing={0.4} mipmapBlur />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>

          <OrbitControls enableZoom enablePan={false} minDistance={8} maxDistance={25} maxPolarAngle={Math.PI / 1.6} autoRotate autoRotateSpeed={0.5} />
        </Canvas>

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