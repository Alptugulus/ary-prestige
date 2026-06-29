"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useExplore, type ExploreMode } from "@/context/ExploreContext";
import { exteriorViews, exteriorCategories, type ExteriorCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const modeLabels: Record<ExploreMode, { title: string; subtitle: string }> = {
  "360": {
    title: "360° Proje Turu",
    subtitle: "Sürükleyerek keşfedin — tüm açılardan ARY Prestige",
  },
  "3d": {
    title: "Projeyi 3D Keşfet",
    subtitle: "Dış görünümler ve mimari detaylar",
  },
};

export function ProjectExploreModal() {
  const { isOpen, mode, startIndex, closeExplore } = useExplore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1.2);
  const [category, setCategory] = useState<ExteriorCategory>("all");

  const filtered =
    category === "all"
      ? exteriorViews
      : exteriorViews.filter((v) => v.category === category);

  const current = filtered[activeIndex] ?? filtered[0];

  useEffect(() => {
    if (isOpen && mode) {
      setCategory("all");
      setActiveIndex(Math.min(startIndex, exteriorViews.length - 1));
      setZoom(1.2);
    }
  }, [isOpen, mode, startIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExplore();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, closeExplore, goNext, goPrev]);

  if (!mode) return null;

  const labels = modeLabels[mode];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 flex-shrink-0">
            <div>
              <span className="text-bronze text-[10px] tracking-[0.25em] uppercase">
                ARY Prestige
              </span>
              <h2 className="font-display text-xl md:text-2xl text-white font-light mt-1">
                {labels.title}
              </h2>
              <p className="text-silver/50 text-xs mt-1 hidden sm:block">
                {labels.subtitle}
              </p>
            </div>
            <button
              onClick={closeExplore}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-silver/60 hover:text-white hover:border-bronze/40 transition-colors"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 px-4 md:px-8 py-3 border-b border-white/5 flex-shrink-0 overflow-x-auto">
            {exteriorCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap border transition-colors",
                  category === cat.id
                    ? "bg-bronze text-background border-bronze"
                    : "border-white/10 text-silver/50 hover:border-bronze/30 hover:text-bronze"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main viewer — drag to pan */}
          <div className="flex-1 relative overflow-hidden bg-secondary/20">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    drag
                    dragConstraints={{ left: -200, right: 200, top: -120, bottom: 120 }}
                    dragElastic={0.15}
                    style={{ scale: zoom }}
                    className="relative w-full h-full max-w-6xl max-h-[70vh] cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      className="object-contain pointer-events-none select-none"
                      sizes="100vw"
                      priority
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/60 backdrop-blur-sm border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors z-10"
              aria-label="Önceki"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/60 backdrop-blur-sm border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors z-10"
              aria-label="Sonraki"
            >
              →
            </button>

            {/* Caption */}
            <div className="absolute bottom-4 left-4 md:left-8 bg-background/70 backdrop-blur-md border border-white/10 px-5 py-3">
              <p className="text-white text-sm font-light">{current?.title}</p>
              <p className="text-silver/50 text-xs mt-0.5">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(filtered.length).padStart(2, "0")}
              </p>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 md:right-8 flex items-center gap-2 bg-background/70 backdrop-blur-md border border-white/10 p-2">
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
                className="w-8 h-8 flex items-center justify-center text-silver/60 hover:text-bronze transition-colors"
                aria-label="Uzaklaştır"
              >
                −
              </button>
              <span className="text-silver/40 text-xs w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
                className="w-8 h-8 flex items-center justify-center text-silver/60 hover:text-bronze transition-colors"
                aria-label="Yakınlaştır"
              >
                +
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex-shrink-0 border-t border-white/5 px-4 md:px-8 py-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {filtered.map((view, index) => (
                <button
                  key={view.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative w-20 h-14 md:w-24 md:h-16 flex-shrink-0 overflow-hidden border transition-all duration-300",
                    activeIndex === index
                      ? "border-bronze ring-1 ring-bronze/50"
                      : "border-white/10 opacity-50 hover:opacity-100"
                  )}
                >
                  <Image
                    src={view.src}
                    alt={view.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
