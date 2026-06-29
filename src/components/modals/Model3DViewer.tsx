"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { CameraControls as CameraControlsRef } from "@react-three/drei";
import { useExperience, type ExperienceTab } from "@/context/ExploreContext";
import {
  exteriorViews,
  exteriorCategories,
  type ExteriorCategory,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import type * as THREE from "three";

const Model3DCanvas = dynamic(
  () => import("./Model3DScene").then((mod) => mod.Model3DCanvas),
  { ssr: false, loading: () => null }
);

const preloadModel3D = () =>
  import("./Model3DScene").then((mod) => mod.preloadModel3D());

const fitCameraToModel = (
  controls: CameraControlsRef | null,
  group: THREE.Group | null
) =>
  import("./Model3DScene").then((mod) => mod.fitCameraToModel(controls, group));

const zoomCameraRelative = (
  controls: CameraControlsRef | null,
  direction: "in" | "out"
) =>
  import("./Model3DScene").then((mod) => mod.zoomCameraRelative(controls, direction));

const tabs: { id: ExperienceTab; label: string; hint: string }[] = [
  {
    id: "3d",
    label: "3D Model",
    hint: "Sürükle · Sağ tık ile gez · Scroll ile yakınlaştır",
  },
  { id: "gallery", label: "Render Galerisi", hint: "Profesyonel dış cephe görselleri" },
];

function GalleryPanel({ startIndex }: { startIndex: number }) {
  const [category, setCategory] = useState<ExteriorCategory>("all");
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const filtered =
    category === "all"
      ? exteriorViews
      : exteriorViews.filter((v) => v.category === category);

  const current = filtered[activeIndex] ?? filtered[0];

  useEffect(() => {
    setActiveIndex(Math.min(startIndex, Math.max(filtered.length - 1, 0)));
  }, [startIndex, filtered.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  const goNext = () => setActiveIndex((i) => (i + 1) % filtered.length);
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0a0a]">
      <div className="flex gap-2 px-4 md:px-8 py-3 border-b border-white/5 flex-shrink-0 overflow-x-auto pointer-events-auto">
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

      <div className="relative flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain p-4 md:p-8"
                sizes="100vw"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/55 backdrop-blur border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors pointer-events-auto"
          aria-label="Önceki"
        >
          ←
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/55 backdrop-blur border border-white/10 text-white hover:border-bronze hover:text-bronze transition-colors pointer-events-auto"
          aria-label="Sonraki"
        >
          →
        </button>

        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-4 py-2 pointer-events-none">
          <p className="text-white text-sm">{current?.title}</p>
          <p className="text-white/40 text-xs mt-0.5">
            {String(activeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-white/5 px-4 md:px-8 py-3 overflow-x-auto pointer-events-auto">
        <div className="flex gap-2 min-w-max">
          {filtered.map((view, index) => (
            <button
              key={view.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-20 h-14 md:w-24 md:h-16 flex-shrink-0 overflow-hidden border transition-all",
                activeIndex === index
                  ? "border-bronze ring-1 ring-bronze/50 opacity-100"
                  : "border-white/10 opacity-45 hover:opacity-100"
              )}
            >
              <Image src={view.src} alt={view.title} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Model3DViewer() {
  const { isOpen, tab, galleryIndex, closeExperience, setTab } = useExperience();
  const controlsRef = useRef<CameraControlsRef | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setAutoRotate(false);
    setShowHint(true);
    setModelReady(false);
    preloadModel3D();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExperience();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeExperience]);

  useEffect(() => {
    if (!showHint || tab !== "3d") return;
    const t = setTimeout(() => setShowHint(false), 7000);
    return () => clearTimeout(t);
  }, [showHint, tab, isOpen]);

  const handleInteract = useCallback(() => {
    setAutoRotate(false);
    setShowHint(false);
  }, []);

  const resetCamera = useCallback(() => {
    void fitCameraToModel(controlsRef.current, modelGroupRef.current);
    setAutoRotate(false);
  }, []);

  const zoomIn = useCallback(() => {
    setAutoRotate(false);
    void zoomCameraRelative(controlsRef.current, "in");
  }, []);

  const zoomOut = useCallback(() => {
    setAutoRotate(false);
    void zoomCameraRelative(controlsRef.current, "out");
  }, []);

  const activeTabMeta = tabs.find((t) => t.id === tab)!;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col"
        >
          {/* Header — pointer-events-none except interactive children */}
          <header className="relative z-30 flex-shrink-0 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 pointer-events-none">
            <div>
              <p className="text-bronze/70 text-[9px] tracking-[0.28em] uppercase mb-1">
                ARY Grup · ARY Prestige
              </p>
              <h2 className="font-display text-xl md:text-2xl text-gold-gradient tracking-[0.06em] uppercase">
                360° Proje Keşfi
              </h2>
              <p className="text-white/40 text-xs mt-1 hidden sm:block">
                {activeTabMeta.hint}
              </p>
            </div>
            <button
              onClick={closeExperience}
              className="pointer-events-auto w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-bronze/50 transition-all"
              aria-label="Kapat"
            >
              ✕
            </button>
          </header>

          {/* Tabs */}
          <div className="relative z-30 flex-shrink-0 flex gap-2 px-4 md:px-8 py-3 border-b border-white/5 pointer-events-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-5 py-2 text-[10px] tracking-[0.18em] uppercase border transition-all duration-300",
                  tab === t.id
                    ? "bg-bronze text-background border-bronze"
                    : "border-white/10 text-white/50 hover:border-bronze/40 hover:text-bronze"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative flex-1 min-h-0">
            {tab === "3d" && (
              <>
                <div
                  ref={canvasHostRef}
                  className="model3d-canvas-host absolute inset-0 z-[1] touch-none overscroll-none"
                >
                  <Model3DCanvas
                    autoRotate={autoRotate}
                    onInteract={handleInteract}
                    onLoaded={() => setModelReady(true)}
                    controlsRef={controlsRef}
                    modelGroupRef={modelGroupRef}
                  />
                </div>

                <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

                {!modelReady && (
                  <div className="absolute inset-0 z-[3] flex items-center justify-center bg-[#080808] pointer-events-none">
                    <div className="w-8 h-8 border-2 border-bronze/30 border-t-bronze rounded-full animate-spin" />
                  </div>
                )}

                <AnimatePresence>
                  {showHint && modelReady && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[4] pointer-events-none"
                    >
                      <div className="px-5 py-3 bg-black/55 backdrop-blur border border-bronze/25 text-center">
                        <p className="text-white/80 text-xs tracking-wide">
                          Sol tık → döndür · Sağ tık → gez
                        </p>
                        <p className="text-bronze/70 text-[10px] tracking-[0.14em] uppercase mt-1">
                          Scroll / pinch → yakınlaştır · Detay için yaklaşın
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <footer className="absolute bottom-0 left-0 right-0 z-[5] px-4 md:px-8 pb-5 pointer-events-none">
                  <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-center gap-2 md:gap-3 pointer-events-auto">
                    <button
                      onClick={zoomOut}
                      className="w-10 h-10 flex items-center justify-center text-lg border border-white/15 text-white/70 hover:border-bronze/40 hover:text-bronze transition-all"
                      aria-label="Uzaklaştır"
                      title="Uzaklaştır"
                    >
                      −
                    </button>
                    <button
                      onClick={zoomIn}
                      className="w-10 h-10 flex items-center justify-center text-lg border border-white/15 text-white/70 hover:border-bronze/40 hover:text-bronze transition-all"
                      aria-label="Yakınlaştır"
                      title="Yakınlaştır"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setAutoRotate((v) => !v)}
                      className={cn(
                        "px-4 py-2 text-[10px] tracking-[0.16em] uppercase border transition-all",
                        autoRotate
                          ? "border-bronze/60 text-bronze bg-bronze/10"
                          : "border-white/15 text-white/55 hover:text-white"
                      )}
                    >
                      Otomatik Döndür
                    </button>
                    <button
                      onClick={resetCamera}
                      className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase border border-white/15 text-white/55 hover:border-bronze/40 hover:text-bronze transition-all"
                    >
                      Sıfırla
                    </button>
                  </div>
                </footer>
              </>
            )}

            {tab === "gallery" && (
              <div className="absolute inset-0 z-[1]">
                <GalleryPanel startIndex={galleryIndex} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
