"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function MallBuilding() {
  const group = useRef<THREE.Group>(null);
  const floors = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  // Generate store cubes per floor
  const floorConfigs = useMemo(() => ([
    { y: 0, radius: 3.5, count: 8, color: "#b8763e" },
    { y: 1.4, radius: 3.2, count: 7, color: "#10b981" },
    { y: 2.8, radius: 3, count: 6, color: "#34d399" },
    { y: 4.2, radius: 2.8, count: 5, color: "#8b5cf6" },
  ]), []);

  return (
    <group ref={group}>
      {/* Central atrium core — glowing */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 5.5, 32]} />
        <meshStandardMaterial
          color="#b8763e"
          emissive="#b8763e"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Glowing core sphere */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3} />
      </mesh>

      <group ref={floors}>
        {floorConfigs.map((floor, fi) => (
          <group key={fi} position={[0, floor.y, 0]}>
            {/* Floor plate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[floor.radius, floor.radius + 0.15, 64]} />
              <meshStandardMaterial
                color={floor.color}
                emissive={floor.color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Floor base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
              <circleGeometry args={[floor.radius, 64]} />
              <meshStandardMaterial
                color="#0a0a0a"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Store kiosks */}
            {Array.from({ length: floor.count }).map((_, i) => {
              const angle = (i / floor.count) * Math.PI * 2;
              const x = Math.cos(angle) * (floor.radius - 0.7);
              const z = Math.sin(angle) * (floor.radius - 0.7);
              return (
                <group key={i} position={[x, 0.4, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
                  <mesh>
                    <boxGeometry args={[1.1, 0.8, 0.7]} />
                    <meshStandardMaterial
                      color="#0a0a12"
                      emissive={floor.color}
                      emissiveIntensity={0.3}
                      transparent
                      opacity={0.85}
                      metalness={0.8}
                      roughness={0.2}
                    />
                  </mesh>
                  {/* Glowing storefront strip */}
                  <mesh position={[0, 0.45, 0.36]}>
                    <boxGeometry args={[0.9, 0.05, 0.02]} />
                    <meshStandardMaterial color={floor.color} emissive={floor.color} emissiveIntensity={3} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>

      {/* Glass dome on top */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#10b981"
          transparent
          opacity={0.15}
          roughness={0}
          metalness={0.5}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}

function FloatingProduct({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={position}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = Math.random() * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      const pos = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#60a5fa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x += (state.pointer.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (5 + state.pointer.y * 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 2, 0);
  });
  return null;
}

export function MallScene({ interactive = false }: { interactive?: boolean }) {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[7, 5, 7]} fov={45} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 6, 0]} intensity={3} color="#10b981" distance={20} />
      <pointLight position={[5, 3, 5]} intensity={2} color="#b8763e" />
      <pointLight position={[-5, 2, -5]} intensity={2} color="#34d399" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={0.5} intensity={2} color="#ffffff" castShadow />

      <Suspense fallback={null}>
        <MallBuilding />
        <FloatingProduct position={[4, 2, 3]} color="#b8763e" />
        <FloatingProduct position={[-4, 3, -3]} color="#10b981" />
        <FloatingProduct position={[3, 4, -4]} color="#34d399" scale={0.7} />
        <FloatingProduct position={[-3, 1.5, 4]} color="#ec4899" scale={0.6} />
        <Particles count={250} />
        <Environment preset="night" />
        <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2} far={10} color="#000000" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.4} mipmapBlur />
        <ChromaticAberration offset={[0.0005, 0.0012]} radialModulation={false} modulationOffset={0} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>

      {interactive ? (
        <OrbitControls enableZoom enablePan={false} minDistance={5} maxDistance={15} maxPolarAngle={Math.PI / 2.2} />
      ) : (
        <Rig />
      )}
    </Canvas>
  );
}