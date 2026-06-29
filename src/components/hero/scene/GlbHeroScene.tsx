"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroGlbConfig, HeroSlide } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { LayeredImageScene } from "./LayeredImageScene";
import { GlbCanvas } from "./GlbCanvas";
import type { MotionValue } from "framer-motion";

interface GlbHeroSceneProps {
  slides: HeroSlide[];
  activeIndex: number;
  glbConfig: HeroGlbConfig;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
}

export function GlbHeroScene({
  slides,
  activeIndex,
  glbConfig,
  scrollScale,
  scrollY,
}: GlbHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { rotateX, rotateY } = useHeroParallax({
    containerRef,
    config: heroSceneConfig.parallax,
  });

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!loaded && (
        <LayeredImageScene
          slides={slides}
          activeIndex={activeIndex}
          scrollScale={scrollScale}
          scrollY={scrollY}
        />
      )}

      <GlbCanvas
        url={glbConfig.url}
        rotateX={rotateX}
        rotateY={rotateY}
        scrollScale={scrollScale}
        scrollY={scrollY}
        onLoaded={() => setLoaded(true)}
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/75 via-black/15 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-black/20" />

      {!loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 border border-white/10 text-[10px] text-white/50 tracking-widest uppercase"
        >
          3D model yükleniyor…
        </motion.div>
      )}
    </div>
  );
}
