"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroGlbConfig } from "@/lib/hero-scene/types";
import { useHeroParallax } from "./useHeroParallax";
import { LayeredImageScene } from "./LayeredImageScene";
import type { HeroSlide } from "@/lib/hero-scene/types";
import type { MotionValue } from "framer-motion";

/**
 * GLB sahne — @react-three/fiber entegrasyonu için hazır iskelet.
 *
 * Kurulum (GLB hazır olduğunda):
 *   npm install three @react-three/fiber @react-three/drei
 *   @types/three -D
 *
 * Sonra bu dosyada Canvas + useGLTF ile modeli yükleyin.
 * Şimdilik yapılandırılmış fallback katman sahnesi gösterilir.
 */
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
  const { rotateX, rotateY } = useHeroParallax({
    containerRef,
    config: heroSceneConfig.parallax,
  });

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* GLB Canvas alanı — model eklendiğinde buraya taşınacak */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ rotateX, rotateY, perspective: 1200 }}
      >
        <div className="relative w-full h-full opacity-0 pointer-events-none" aria-hidden>
          {/* <Canvas>
               <PerspectiveCamera position={glbConfig.cameraPosition} />
               <ambientLight intensity={0.4} />
               <directionalLight position={[5, 8, 5]} intensity={1.2} />
               <Suspense fallback={null}>
                 <GlbModel url={glbConfig.url} />
               </Suspense>
               <Environment preset="night" />
             </Canvas> */}
        </div>
      </motion.div>

      {/* Geçiş dönemi: katmanlı render fallback */}
      <LayeredImageScene
        slides={slides}
        activeIndex={activeIndex}
        scrollScale={scrollScale}
        scrollY={scrollY}
      />

      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 border border-white/10 text-[9px] text-white/30 tracking-widest uppercase pointer-events-none">
          GLB: {glbConfig.url}
        </div>
      )}
    </div>
  );
}
