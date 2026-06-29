"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroSlide } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { cn } from "@/lib/utils";

interface HeroImageSceneProps {
  slides: HeroSlide[];
  activeIndex: number;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
  dimmed?: boolean;
}

export function HeroImageScene({
  slides,
  activeIndex,
  scrollScale,
  scrollY,
  dimmed = false,
}: HeroImageSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, smoothX, smoothY } = useHeroParallax({
    containerRef,
    config: heroSceneConfig.parallax,
  });

  const imageX = useTransform(smoothX, (v) => v * 18);
  const imageY = useTransform(smoothY, (v) => v * 12);
  const activeSlide = slides[activeIndex];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-background"
      style={{ perspective: "1200px", perspectiveOrigin: "58% 45%" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          scale: scrollScale,
          y: scrollY,
        }}
      >
        <AnimatePresence mode="sync">
          {activeSlide && (
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                style={{ x: imageX, y: imageY }}
              >
                <Image
                  src={activeSlide.image}
                  alt={`ARY Prestige — ${activeSlide.label}`}
                  fill
                  priority={activeIndex === 0}
                  quality={92}
                  className="object-cover select-none pointer-events-none"
                  style={{ objectPosition: "62% center" }}
                  sizes="100vw"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 pointer-events-none bg-gradient-to-r transition-opacity duration-700",
          dimmed
            ? "from-black/70 via-black/20 to-transparent opacity-100"
            : "from-black/85 via-black/35 to-transparent"
        )}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-black/10 to-black/20" />
    </div>
  );
}
