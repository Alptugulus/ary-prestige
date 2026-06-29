"use client";

import dynamic from "next/dynamic";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroSlide } from "@/lib/hero-scene/types";
import { LayeredImageScene } from "./LayeredImageScene";
import type { MotionValue } from "framer-motion";

const GlbHeroScene = dynamic(
  () => import("./GlbHeroScene").then((m) => m.GlbHeroScene),
  { ssr: false }
);

interface HeroSceneProps {
  slides: HeroSlide[];
  activeIndex: number;
  scrollScale?: MotionValue<number>;
  scrollY?: MotionValue<string>;
}

export function HeroScene({
  slides,
  activeIndex,
  scrollScale,
  scrollY,
}: HeroSceneProps) {
  const { mode, glb } = heroSceneConfig;

  if (mode === "glb" && glb.enabled) {
    return (
      <GlbHeroScene
        slides={slides}
        activeIndex={activeIndex}
        glbConfig={glb}
        scrollScale={scrollScale}
        scrollY={scrollY}
      />
    );
  }

  return (
    <LayeredImageScene
      slides={slides}
      activeIndex={activeIndex}
      scrollScale={scrollScale}
      scrollY={scrollY}
    />
  );
}
