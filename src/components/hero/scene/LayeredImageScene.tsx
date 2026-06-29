"use client";

import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroSlide } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { SceneLayer } from "./SceneLayer";

interface LayeredImageSceneProps {
  slides: HeroSlide[];
  activeIndex: number;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
}

export function LayeredImageScene({
  slides,
  activeIndex,
  scrollScale,
  scrollY,
}: LayeredImageSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, smoothX, smoothY } = useHeroParallax({
    containerRef,
    config: heroSceneConfig.parallax,
  });

  const highlightX = useTransform(smoothX, (v) => v * 1.1 * 42);
  const highlightY = useTransform(smoothY, (v) => v * 1.1 * 28);

  const activeSlide = slides[activeIndex];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
    >
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
        <AnimatePresence mode="sync">
          {activeSlide && (
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {heroSceneConfig.layers.map((layer) => (
                <SceneLayer
                  key={`${activeSlide.id}-${layer.id}`}
                  src={layer.src ?? activeSlide.image}
                  alt={`ARY Prestige ${activeSlide.label} — ${layer.id}`}
                  layer={layer}
                  smoothX={smoothX}
                  smoothY={smoothY}
                  priority={layer.id === "building"}
                />
              ))}

              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                style={{
                  z: 120,
                  x: highlightX,
                  y: highlightY,
                  background:
                    "radial-gradient(ellipse 55% 45% at 62% 38%, rgba(197,160,89,0.14) 0%, transparent 65%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-black/25" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
