"use client";

import dynamic from "next/dynamic";
import type { HeroSlide } from "@/lib/hero-scene/types";
import { HeroImageScene } from "./HeroImageScene";
import type { MotionValue } from "framer-motion";

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
  return (
    <HeroImageScene
      slides={slides}
      activeIndex={activeIndex}
      scrollScale={scrollScale}
      scrollY={scrollY}
    />
  );
}
