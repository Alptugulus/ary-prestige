"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import { motion, type MotionValue } from "framer-motion";
import * as THREE from "three";

interface GlbModelProps {
  url: string;
  onLoaded?: () => void;
}

function GlbModel({ url, onLoaded }: GlbModelProps) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    onLoaded?.();
  }, [scene, onLoaded]);

  return (
    <Center>
      <primitive object={scene.clone()} scale={0.012} />
    </Center>
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
      className="absolute inset-0"
      style={{
        rotateX,
        rotateY,
        scale: scrollScale,
        y: scrollY,
        transformStyle: "preserve-3d",
      }}
    >
      <Canvas
        camera={{ position: [5, 3, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <color attach="background" args={["#0E0E0E"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 14, 8]} intensity={1.3} />
        <directionalLight position={[-8, 6, -6]} intensity={0.45} />
        <Suspense fallback={null}>
          <GlbModel url={url} onLoaded={onLoaded} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

export function preloadGlb(url: string) {
  useGLTF.preload(url);
}
