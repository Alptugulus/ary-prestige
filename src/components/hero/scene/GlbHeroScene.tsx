"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroGlbConfig, HeroSlide } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { HeroImageScene } from "./HeroImageScene";
import { GlbCanvas } from "./GlbCanvas";
import type { MotionValue } from "framer-motion";

interface GlbHeroSceneProps {
  slides: HeroSlide[];
  activeIndex: number;
  glbConfig: HeroGlbConfig;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
  onClose: () => void;
}

export function GlbHeroScene({
  slides,
  activeIndex,
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
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-[5]"
      >
        <HeroImageScene
          slides={slides}
          activeIndex={activeIndex}
          scrollScale={scrollScale}
          scrollY={scrollY}
          dimmed
        />

        <GlbCanvas
          url={glbConfig.url}
          rotateX={rotateX}
          rotateY={rotateY}
          scrollScale={scrollScale}
          scrollY={scrollY}
          onLoaded={() => setLoaded(true)}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/88 via-black/25 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-black/10" />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: loaded ? 1 : 0, y: 0 }}
          className="absolute bottom-[10.5rem] md:bottom-48 right-6 md:right-12 z-20 hidden md:block pointer-events-none"
        >
          <p className="text-bronze/80 text-[9px] tracking-[0.22em] uppercase mb-1">
            İnteraktif 3D
          </p>
          <p className="text-white/35 text-[9px] tracking-wide">
            Mouse ile döndürün
          </p>
        </motion.div>

        {!loaded && (
          <div className="absolute inset-0 lg:left-[34%] flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-6 py-4 bg-black/50 backdrop-blur-sm border border-white/10 rounded-sm">
              <div className="w-7 h-7 border-2 border-bronze/30 border-t-bronze rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white/55 text-[10px] tracking-[0.18em] uppercase">
                3D model hazırlanıyor…
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
