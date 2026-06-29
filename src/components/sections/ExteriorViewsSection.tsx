"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  exteriorViews,
  exteriorCategories,
  type ExteriorCategory,
} from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function ExteriorViewsSection() {
  const [activeCategory, setActiveCategory] = useState<ExteriorCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered =
    activeCategory === "all"
      ? exteriorViews
      : exteriorViews.filter((v) => v.category === activeCategory);

  const activeView = filtered[activeIndex] ?? filtered[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <>
      <section
        id="dis-gorunumler"
        className="py-24 md:py-32 lg:py-40 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,138,90,0.04),transparent_60%)]" />

        <div className="container mx-auto px-6 lg:px-10 relative">
          <SectionHeader
            subtitle="Dış Görünümler"
            title="Mimari Zarafet"
            description="Proje render görselleriyle ARY Prestige'in çağdaş mimarisini ve sosyal yaşam alanlarını keşfedin."
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
            {exteriorCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 md:px-7 py-2.5 text-[10px] md:text-xs tracking-[0.18em] uppercase transition-all duration-400 border",
                  activeCategory === cat.id
                    ? "bg-bronze text-background border-bronze"
                    : "bg-transparent text-silver/60 border-white/10 hover:border-bronze/40 hover:text-bronze"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Featured Image */}
            <motion.div
              layout
              className="lg:col-span-8 relative group cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView?.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden border border-white/5"
                >
                  {activeView && (
                    <Image
                      src={activeView.src}
                      alt={activeView.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Nav Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-background/50 backdrop-blur-sm text-white hover:border-bronze hover:text-bronze opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Önceki görsel"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-background/50 backdrop-blur-sm text-white hover:border-bronze hover:text-bronze opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Sonraki görsel"
                  >
                    →
                  </button>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="text-bronze text-[10px] tracking-[0.25em] uppercase">
                      {activeView &&
                        exteriorCategories.find(
                          (c) => c.id === activeView.category
                        )?.label}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl text-white font-light mt-1">
                      {activeView?.title}
                    </h3>
                    <p className="text-silver/40 text-xs mt-2 tracking-wider">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3 content-start">
              {filtered.map((view, index) => (
                <motion.button
                  key={view.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden border transition-all duration-400 group",
                    activeIndex === index
                      ? "border-bronze ring-1 ring-bronze/50"
                      : "border-white/5 hover:border-bronze/30 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={view.src}
                    alt={view.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-bronze/20 transition-opacity duration-300",
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="absolute bottom-1.5 left-2 text-[9px] text-white/80 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {view.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && activeView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-silver/60 hover:text-white border border-white/10 hover:border-bronze/40 transition-colors z-10"
              aria-label="Kapat"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white border border-white/20 hover:border-bronze transition-colors z-10"
              aria-label="Önceki"
            >
              ←
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-[92vw] max-w-6xl aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeView.src}
                alt={activeView.alt}
                fill
                className="object-contain"
                sizes="92vw"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white border border-white/20 hover:border-bronze transition-colors z-10"
              aria-label="Sonraki"
            >
              →
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="font-display text-xl text-white font-light">
                {activeView.title}
              </p>
              <p className="text-silver/50 text-xs tracking-wider mt-1">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(filtered.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
