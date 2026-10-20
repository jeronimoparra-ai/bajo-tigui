"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

function Dish({ tilt }: { tilt: { x: number; y: number } }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x = tilt.y * 0.4;
      ref.current.rotation.z = tilt.x * 0.4;
    }
  });
  return (
    <group position={[0, 0, 0]}>
      {/* Parabólica: semiesfera abierta */}
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#8FCCF0"
          metalness={0.6}
          roughness={0.3}
          side={2}
        />
      </mesh>
      {/* Soporte */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#002E84" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function SignalArcs() {
  const group = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {[1.6, 2.0, 2.4].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.02, 8, 64, Math.PI]} />
          <meshBasicMaterial color="#8FCCF0" transparent opacity={0.6 - i * 0.15} />
        </mesh>
      ))}
    </group>
  );
}

function House() {
  return (
    <group position={[3, -0.5, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.2]} />
        <meshStandardMaterial color="#F7F4EC" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[1.1, 0.8, 4]} />
        <meshStandardMaterial color="#FE6301" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      className="hero-3d-canvas"
      style={{ width: "100%", height: "420px", position: "relative" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x, y });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} color="#8FCCF0" />
        <directionalLight position={[-5, -2, 2]} intensity={0.4} color="#A1D9D4" />
        <Suspense fallback={null}>
          <Dish tilt={tilt} />
          <SignalArcs />
          <House />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
