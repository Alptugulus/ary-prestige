"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 md:mb-20",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {subtitle && (
        <span className="block text-bronze text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans">
          {subtitle}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-silver/80 text-base md:text-lg leading-relaxed font-light">
          {description}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-8 h-px w-16 bg-gradient-to-r from-bronze to-transparent origin-left",
          align === "center" && "mx-auto origin-center"
        )}
      />
    </motion.div>
  );
}
