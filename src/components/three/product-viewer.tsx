"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

type ShapeKind = "octahedron" | "box" | "sphere" | "torus" | "cone";

function ProductMesh({ kind, color }: { kind: ShapeKind; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      const targetScale = hovered ? 1.15 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const geom = () => {
    switch (kind) {
      case "box": return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case "sphere": return <sphereGeometry args={[0.8, 64, 64]} />;
      case "torus": return <torusGeometry args={[0.6, 0.25, 32, 100]} />;
      case "cone": return <coneGeometry args={[0.7, 1.4, 32]} />;
      default: return <octahedronGeometry args={[0.9, 0]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geom()}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Glow ring base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <ringGeometry args={[1, 1.3, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export function ProductViewer3D({ color = "#b8763e", kind = "octahedron" }: { color?: string; kind?: ShapeKind }) {
  return (
    <div className="w-full h-[400px] sm:h-[500px] relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [3, 2, 3], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={2.5} color={color} castShadow />
        <pointLight position={[-5, 2, -5]} intensity={1.5} color="#10b981" />
        <pointLight position={[5, 2, 5]} intensity={1.5} color="#34d399" />

        <Suspense fallback={<Html center><div className="text-white/50 text-sm">Loading 3D…</div></Html>}>
          <ProductMesh kind={kind} color={color} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.6} scale={10} blur={2.5} far={5} color="#000000" />
        </Suspense>

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.4} mipmapBlur />
        </EffectComposer>

        <OrbitControls enableZoom enablePan={false} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={1} />
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full text-[10px] text-white/60 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}