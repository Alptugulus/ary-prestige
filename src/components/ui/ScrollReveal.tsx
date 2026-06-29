"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
  id?: string;
}

/** Bölüm kaydırılırken yumuşak şekilde görünür */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
}: ScrollRevealProps) {
  const Component = motion[as];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 48,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease, delay },
    },
  };

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px", amount: 0.08 }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease, delay: 0.1 },
  },
};

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

export function ScrollSection({
  children,
  className,
  showDivider = true,
}: ScrollSectionProps) {
  return (
    <div className={cn("relative", className)}>
      {showDivider && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={lineVariants}
          className="h-px w-full bg-gradient-to-r from-transparent via-bronze/30 to-transparent origin-left"
        />
      )}
      <ScrollReveal>{children}</ScrollReveal>
    </div>
  );
}

export function HeroScrollBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative h-24 md:h-32 -mt-24 md:-mt-32 pointer-events-none z-20"
    >
      <motion.div
        style={{ height, opacity }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent via-background/80 to-background"
      />
      <motion.div
        style={{ scaleX: lineScale, opacity: lineOpacity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-bronze origin-center"
      />
    </div>
  );
}
