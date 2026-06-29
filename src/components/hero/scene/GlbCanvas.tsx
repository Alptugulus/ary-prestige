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
      <primitive object={scene} scale={0.012} />
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
        camera={{ position: [4, 2.5, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <color attach="background" args={["#0E0E0E"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[8, 12, 6]} intensity={1.1} />
        <directionalLight position={[-6, 4, -4]} intensity={0.35} />
        <Suspense fallback={null}>
          <GlbModel url={url} onLoaded={onLoaded} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

useGLTF.preload("/models/ary-prestige.glb");
