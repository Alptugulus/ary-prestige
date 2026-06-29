"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { HeroLayerConfig } from "@/lib/hero-scene/types";

interface SceneLayerProps {
  src: string;
  alt: string;
  layer: HeroLayerConfig;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  priority?: boolean;
}

export function SceneLayer({
  src,
  alt,
  layer,
  smoothX,
  smoothY,
  priority = false,
}: SceneLayerProps) {
  const translateX = useTransform(smoothX, (v) => v * layer.speed * 42);
  const translateY = useTransform(smoothY, (v) => v * layer.speed * 28);

  return (
    <motion.div
      className="absolute inset-0 will-change-transform preserve-3d"
      style={{
        z: layer.depth,
        x: translateX,
        y: translateY,
        opacity: layer.opacity ?? 1,
        scale: layer.scale,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover select-none pointer-events-none"
          style={{ objectPosition: layer.objectPosition ?? "center" }}
          sizes="100vw"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
