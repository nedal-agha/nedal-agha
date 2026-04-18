"use client";

import { useRef } from "react";
import type { Mesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function AnimatedShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.7}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#6dd6ff" emissive="#0f2f4a" emissiveIntensity={0.45} roughness={0.35} metalness={0.2} />
      </mesh>
    </Float>
  );
}

export function Hero3dScene() {
  return (
    <div className="h-56 w-full overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 md:h-72">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.2], fov: 45 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 2, 2]} intensity={1.05} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
