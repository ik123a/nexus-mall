"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { floors } from "@/constants/floors";

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
        })
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

export function MallExplorerScene() {
  return (
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
  );
}
