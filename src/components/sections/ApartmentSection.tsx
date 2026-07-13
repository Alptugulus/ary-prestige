"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  apartmentFeatures,
  bathroomTypes,
  extraFeatures,
  interiorViews,
  interiorCategories,
  type InteriorCategory,
  siteConfig,
} from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FloorPlanViewer } from "@/components/sections/FloorPlanViewer";
import { cn } from "@/lib/utils";

function InteriorGallery() {
  const [category, setCategory] = useState<InteriorCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered =
    category === "all"
      ? interiorViews
      : interiorViews.filter((v) => v.category === category);

  const active = filtered[activeIndex] ?? filtered[0];

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
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, goNext, goPrev]);

  if (!active) return null;

  return (
    <>
      <div className="mb-20 md:mb-28">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-bronze text-[10px] tracking-[0.22em] uppercase mb-3">
            Daire Görselleri
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-white font-light mb-3">
            İç Mekân Yaşamı
          </h3>
          <p className="text-silver/60 text-sm max-w-xl mx-auto">
            {siteConfig.name} dairelerinin salon, mutfak, banyo ve antre
            detaylarını keşfedin.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
          {interiorCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-5 md:px-6 py-2 text-[10px] md:text-xs tracking-[0.18em] uppercase transition-all duration-300 border",
                category === cat.id
                  ? "bg-bronze text-background border-bronze"
                  : "bg-transparent text-silver/60 border-white/10 hover:border-bronze/40 hover:text-bronze"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          <div className="lg:col-span-8 relative group">
            <AnimatePresence mode="wait">
              <motion.button
                key={active.id}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                onClick={() => setLightboxOpen(true)}
                className="relative w-full aspect-[16/10] overflow-hidden border border-white/5 text-left"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-white text-sm md:text-base">{active.title}</p>
                    <p className="text-white/45 text-[10px] tracking-[0.16em] uppercase mt-1">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")}
                    </p>
                  </div>
                  <span className="text-bronze/80 text-[10px] tracking-[0.16em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Büyüt
                  </span>
                </div>
              </motion.button>
            </AnimatePresence>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/55 border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors"
              aria-label="Önceki"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/55 border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors"
              aria-label="Sonraki"
            >
              →
            </button>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5 md:gap-3 content-start max-h-[28rem] overflow-y-auto custom-scrollbar pr-1">
            {filtered.map((view, index) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[16/10] overflow-hidden border transition-all",
                  activeIndex === index
                    ? "border-bronze ring-1 ring-bronze/40 opacity-100"
                    : "border-white/10 opacity-55 hover:opacity-100"
                )}
              >
                <Image
                  src={view.src}
                  alt={view.title}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] bg-black/95 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5">
              <div>
                <p className="text-bronze text-[10px] tracking-[0.2em] uppercase">
                  {siteConfig.name}
                </p>
                <p className="text-white text-sm mt-1">{active.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-11 h-11 border border-white/15 text-white/60 hover:text-white hover:border-bronze/50 transition-colors"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            <div className="relative flex-1 min-h-0">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain p-4 md:p-8"
                sizes="100vw"
                priority
              />
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/55 border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors"
                aria-label="Önceki"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/55 border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors"
                aria-label="Sonraki"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ApartmentSection() {
  return (
    <section id="daireler" className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Daire Deneyimi"
          title="Ayrıntılarda Saklı Konfor"
          description="Her metrekaresi özenle tasarlanmış 4+1 rezidans daireler, geniş yaşam alanları ve premium detaylarla üst segment konfor sunuyor."
        />

        <InteriorGallery />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 md:mb-28">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {apartmentFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 bg-secondary/50 border border-white/5 hover:border-bronze/20 transition-colors duration-500"
              >
                <p className="text-bronze font-display text-2xl md:text-3xl font-light mb-2">
                  {feature.value}
                </p>
                <p className="text-silver/60 text-xs tracking-wider uppercase">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-4">
                Banyolar
              </h4>
              <div className="flex flex-wrap gap-3">
                {bathroomTypes.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-2 border border-white/10 text-silver/80 text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-4">
                Ek Özellikler
              </h4>
              <ul className="space-y-3">
                {extraFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-silver/70 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-bronze rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10 md:mb-12">
            <h3 className="font-display text-2xl md:text-3xl text-white font-light mb-3">
              Renkli Kat Planı
            </h3>
            <p className="text-silver/60 text-sm">
              Renkli kat planı ve oda metrekareleri
            </p>
          </div>

          <FloorPlanViewer />
        </motion.div>
      </div>
    </section>
  );
}
