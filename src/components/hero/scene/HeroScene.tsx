"use client";

import dynamic from "next/dynamic";
import { heroSceneConfig } from "@/lib/hero-scene/config";
import type { HeroSlide } from "@/lib/hero-scene/types";
import { HeroImageScene } from "./HeroImageScene";
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
  show3d: boolean;
  onClose3d: () => void;
}

export function HeroScene({
  slides,
  activeIndex,
  scrollScale,
  scrollY,
  show3d,
  onClose3d,
}: HeroSceneProps) {
  const { glb } = heroSceneConfig;

  return (
    <>
      {!show3d && (
        <HeroImageScene
          slides={slides}
          activeIndex={activeIndex}
          scrollScale={scrollScale}
          scrollY={scrollY}
        />
      )}

      {show3d && glb.enabled && (
        <GlbHeroScene
          glbConfig={glb}
          scrollScale={scrollScale}
          scrollY={scrollY}
          onClose={onClose3d}
        />
      )}
    </>
  );
}
