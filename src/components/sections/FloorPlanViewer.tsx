"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { floorPlanTypes, floorPlanPdf } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FloorPlanViewer() {
  const [activeType, setActiveType] = useState(floorPlanTypes[1].id);
  const [zoom, setZoom] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const [activeRoom, setActiveRoom] = useState<number | null>(null);

  const plan = floorPlanTypes.find((t) => t.id === activeType) ?? floorPlanTypes[0];

  useEffect(() => {
    setZoom(1);
    setActiveRoom(null);
  }, [activeType]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox]);

  return (
    <>
      <div className="space-y-6">
        {/* Type Selector + Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {floorPlanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "px-5 py-2.5 border text-[10px] md:text-xs tracking-[0.15em] uppercase transition-all duration-300",
                  activeType === type.id
                    ? "bg-bronze text-background border-bronze"
                    : "border-white/10 text-silver/60 hover:border-bronze/40 hover:text-bronze"
                )}
              >
                {type.label}
                <span className="hidden sm:inline text-[10px] opacity-70 ml-2">
                  {type.subtitle}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={zoom <= 1}
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-silver/60 hover:border-bronze/40 hover:text-bronze disabled:opacity-30 transition-colors text-lg"
              aria-label="Uzaklaştır"
            >
              −
            </button>
            <span className="text-silver/40 text-xs w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 2.5}
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-silver/60 hover:border-bronze/40 hover:text-bronze disabled:opacity-30 transition-colors text-lg"
              aria-label="Yakınlaştır"
            >
              +
            </button>
            <button
              onClick={() => setLightbox(true)}
              className="px-4 py-2 border border-white/10 text-silver/60 hover:border-bronze/40 hover:text-bronze text-[10px] tracking-[0.15em] uppercase transition-colors"
            >
              Tam Ekran
            </button>
            <a
              href={floorPlanPdf}
              download="ARY-Prestige-Kat-Plani.pdf"
              className="px-4 py-2 border border-bronze/40 text-bronze hover:bg-bronze/10 text-[10px] tracking-[0.15em] uppercase transition-colors"
            >
              PDF İndir
            </a>
          </div>
        </div>

        {/* Viewer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Plan Image */}
          <div className="lg:col-span-8 relative bg-secondary/30 border border-white/5 overflow-hidden">
            <div className="overflow-auto max-h-[70vh] lg:max-h-[600px] cursor-grab active:cursor-grabbing">
              <motion.div
                animate={{ scale: zoom }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "top center" }}
                className="relative min-w-full"
              >
                <button
                  onClick={() => setLightbox(true)}
                  className="relative w-full block"
                >
                  <Image
                    key={plan.image}
                    src={plan.image}
                    alt={`ARY Prestige ${plan.label} kat planı`}
                    width={1190}
                    height={1546}
                    className="w-full h-auto"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </button>
              </motion.div>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-white/10">
              <span className="text-bronze text-[10px] tracking-[0.2em] uppercase">
                {plan.netArea}
              </span>
            </div>
          </div>

          {/* Room List */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="p-6 md:p-8 bg-secondary/50 border border-white/5 flex-1">
              <span className="text-bronze text-[10px] tracking-[0.25em] uppercase">
                {plan.label} — {plan.subtitle}
              </span>
              <h4 className="font-display text-xl md:text-2xl text-white font-light mt-2 mb-6">
                Oda Detayları
              </h4>

              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {plan.rooms.map((room, index) => (
                  <button
                    key={`${room.label}-${index}`}
                    onMouseEnter={() => setActiveRoom(index)}
                    onMouseLeave={() => setActiveRoom(null)}
                    onClick={() =>
                      setActiveRoom(activeRoom === index ? null : index)
                    }
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 border transition-all duration-300 text-left",
                      activeRoom === index
                        ? "border-bronze/40 bg-bronze/5"
                        : "border-transparent hover:border-white/5 hover:bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        activeRoom === index
                          ? "text-white"
                          : "text-silver/70"
                      )}
                    >
                      {room.label}
                    </span>
                    <span
                      className={cn(
                        "font-display text-base transition-colors",
                        activeRoom === index ? "text-bronze" : "text-silver/50"
                      )}
                    >
                      {room.area}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-5 border border-white/5 bg-background/50">
              <p className="text-silver/50 text-xs leading-relaxed">
                Renkli kat planı üzerinde odaların metrekare bilgileri
                gösterilmektedir. Detaylı plan için PDF indirebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5">
              <div>
                <span className="text-bronze text-[10px] tracking-[0.2em] uppercase">
                  {plan.label}
                </span>
                <p className="text-white text-sm mt-1">{plan.subtitle}</p>
              </div>
              <button
                onClick={() => setLightbox(false)}
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-silver/60 hover:text-white hover:border-bronze/40 transition-colors"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
              <Image
                src={plan.image}
                alt={`ARY Prestige ${plan.label} kat planı`}
                width={1190}
                height={1546}
                className="max-w-full h-auto"
                sizes="95vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
