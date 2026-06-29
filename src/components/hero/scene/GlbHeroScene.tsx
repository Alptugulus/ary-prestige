"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroGlbConfig } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { GlbCanvas } from "./GlbCanvas";
import type { MotionValue } from "framer-motion";

interface GlbHeroSceneProps {
  glbConfig: HeroGlbConfig;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
  onClose: () => void;
}

export function GlbHeroScene({
  glbConfig,
  scrollScale,
  scrollY,
  onClose,
}: GlbHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { rotateX, rotateY } = useHeroParallax({
    containerRef,
    config: heroSceneConfig.parallax,
  });

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-[5] bg-background"
      >
        <GlbCanvas
          url={glbConfig.url}
          rotateX={rotateX}
          rotateY={rotateY}
          scrollScale={scrollScale}
          scrollY={scrollY}
          onLoaded={() => setLoaded(true)}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-black/15" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-bronze/30 border-t-bronze rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase">
                3D model yükleniyor…
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-28 md:top-32 right-5 md:right-10 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-bronze/50 text-[10px] tracking-[0.16em] uppercase transition-all duration-300"
          aria-label="Render görünümüne dön"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Render Görünümü
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
