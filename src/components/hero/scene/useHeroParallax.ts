"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { HeroParallaxConfig } from "@/lib/hero-scene/types";

interface UseHeroParallaxOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  config: HeroParallaxConfig;
  disabled?: boolean;
}

export interface HeroParallaxMotion {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

export function useHeroParallax({
  containerRef,
  config,
  disabled = false,
}: UseHeroParallaxOptions): HeroParallaxMotion {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: config.springStiffness,
    damping: config.springDamping,
  });
  const smoothY = useSpring(mouseY, {
    stiffness: config.springStiffness,
    damping: config.springDamping,
  });

  const rotateX = useTransform(
    smoothY,
    [-1, 1],
    [config.maxRotateX, -config.maxRotateX]
  );
  const rotateY = useTransform(
    smoothX,
    [-1, 1],
    [-config.maxRotateY, config.maxRotateY]
  );

  useEffect(() => {
    if (disabled) return;

    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isCoarse) return;
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onLeave);
    };
  }, [containerRef, disabled, mouseX, mouseY]);

  return { smoothX, smoothY, rotateX, rotateY };
}
