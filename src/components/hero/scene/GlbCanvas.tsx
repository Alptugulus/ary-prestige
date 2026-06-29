"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { motion, type MotionValue } from "framer-motion";
import * as THREE from "three";

interface GlbModelProps {
  url: string;
  onLoaded?: () => void;
}

function enhanceMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat) => {
      if (!(mat instanceof THREE.MeshStandardMaterial)) return;
      mat.envMapIntensity = 1.2;
      mat.roughness = Math.min(mat.roughness, 0.82);
      mat.metalness = Math.max(mat.metalness, 0.05);
      mat.needsUpdate = true;
    });
  });
}

function GlbModel({ url, onLoaded }: GlbModelProps) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    enhanceMaterials(cloned);
    return cloned;
  }, [scene]);

  useEffect(() => {
    onLoaded?.();
  }, [model, onLoaded]);

  return (
    <Bounds fit clip observe margin={1.05} maxDuration={0}>
      <Center>
        <group rotation={[0, -0.35, 0]}>
          <primitive object={model} />
        </group>
      </Center>
    </Bounds>
  );
}

interface GlbCanvasProps {
  url: string;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
  onLoaded?: () => void;
}

export function GlbCanvas({
  url,
  rotateX,
  rotateY,
  scrollScale,
  scrollY,
  onLoaded,
}: GlbCanvasProps) {
  return (
    <motion.div
      className="absolute inset-0 lg:inset-y-[-2%] lg:left-[34%] lg:right-[-4%]"
      style={{
        rotateX,
        rotateY,
        scale: scrollScale,
        y: scrollY,
        transformStyle: "preserve-3d",
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 32, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        shadows
        className="w-full h-full touch-none"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <GlbModel url={url} onLoaded={onLoaded} />
        </Suspense>

        <ambientLight intensity={0.85} />
        <directionalLight
          position={[12, 18, 10]}
          intensity={1.6}
          color="#fff8ee"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-10, 8, -6]}
          intensity={0.55}
          color="#c5a059"
        />
        <hemisphereLight
          args={["#87aecf", "#1a1208", 0.45]}
        />
        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.45}
          scale={28}
          blur={2.2}
          far={12}
          color="#000000"
        />
        <Environment preset="city" />
      </Canvas>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 55% 48%, transparent 35%, rgba(14,14,14,0.55) 100%)",
        }}
      />
    </motion.div>
  );
}

export function preloadGlb(url: string) {
  useGLTF.preload(url);
}
