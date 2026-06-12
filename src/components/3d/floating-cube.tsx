"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { useMousePosition } from "@/hooks/use-mouse-position";
import * as THREE from "three";

function getParticlePositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  return pos;
}

const particlePositions = getParticlePositions(200);

const SECTION_SCALES: Record<string, number> = {
  hero: 1.8,
  about: 1.1,
  skills: 1.4,
  experience: 0.9,
  education: 1.2,
  projects: 0.7,
  certifications: 1.0,
  achievements: 1.1,
  contact: 1.6,
};

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();
  const target = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1.8);

  useFrame(() => {
    if (!meshRef.current) return;
    const x = (mouse.x / window.innerWidth) * 2 - 1;
    const y = -(mouse.y / window.innerHeight) * 2 + 1;
    target.current.x += (x * 0.5 - target.current.x) * 0.05;
    target.current.y += (y * 0.5 - target.current.y) * 0.05;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.position.x = target.current.x * 0.3;
    meshRef.current.position.y = target.current.y * 0.3;

    // Smooth scroll-based scale scaling
    let activeSec = "hero";
    if (typeof window !== "undefined") {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = [
        "hero",
        "about",
        "skills",
        "experience",
        "education",
        "projects",
        "certifications",
        "achievements",
        "contact",
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeSec = section;
          }
        }
      }
    }

    const baseTarget = SECTION_SCALES[activeSec] || 1.8;
    currentScale.current += (baseTarget - currentScale.current) * 0.05;
    meshRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003;
      ref.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Rings() {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.002;
      ref.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.8, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[3.2, 3.5, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function FloatingCube() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#818cf8" />
        <Cube />
        <Particles />
        <Rings />
      </Canvas>
    </div>
  );
}
