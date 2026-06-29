"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useModel3D } from "@/context/Model3DContext";
import { cn } from "@/lib/utils";

const Model3DCanvas = dynamic(
  () => import("./Model3DScene").then((m) => m.Model3DCanvas),
  { ssr: false }
);

const preloadModel3D = () =>
  import("./Model3DScene").then((m) => m.preloadModel3D());

export function Model3DViewer() {
  const { isOpen, closeModel3D } = useModel3D();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setAutoRotate(true);
    setShowHint(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModel3D();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeModel3D]);

  const handleInteract = useCallback(() => {
    setAutoRotate(false);
    setShowHint(false);
  }, []);

  const resetCamera = useCallback(() => {
    controlsRef.current?.reset();
    setAutoRotate(true);
  }, []);

  const handlePointerEnter = () => {
    preloadModel3D();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] bg-[#060606]"
          onPointerEnter={handlePointerEnter}
        >
          <div className="absolute inset-0">
            <Model3DCanvas
              autoRotate={autoRotate}
              onInteract={handleInteract}
              controlsRef={controlsRef}
            />
          </div>

          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/40" />

          <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-10 py-5 md:py-7">
            <div>
              <p className="text-bronze/70 text-[9px] md:text-[10px] tracking-[0.28em] uppercase mb-1">
                ARY Grup
              </p>
              <h2 className="font-display text-xl md:text-2xl text-gold-gradient tracking-[0.08em] uppercase">
                ARY Prestige · 3D
              </h2>
            </div>
            <button
              onClick={closeModel3D}
              className="pointer-events-auto w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-bronze/50 transition-all duration-300 rounded-sm"
              aria-label="Kapat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              >
                <div className="px-6 py-4 bg-black/45 backdrop-blur-md border border-white/10 text-center">
                  <p className="text-white/75 text-xs md:text-sm tracking-wide mb-1">
                    Sürükleyerek döndürün
                  </p>
                  <p className="text-white/35 text-[10px] tracking-[0.16em] uppercase">
                    Scroll ile yakınlaştırın
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-10 pb-6 md:pb-8">
            <div className="mx-auto max-w-3xl pointer-events-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-black/55 backdrop-blur-xl border border-white/10 rounded-sm">
                <p className="text-white/40 text-[10px] tracking-[0.18em] uppercase text-center sm:text-left">
                  İnteraktif mimari model
                </p>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={() => setAutoRotate((v) => !v)}
                    className={cn(
                      "px-4 py-2 text-[10px] tracking-[0.16em] uppercase border transition-all duration-300",
                      autoRotate
                        ? "border-bronze/60 text-bronze bg-bronze/10"
                        : "border-white/15 text-white/55 hover:border-white/30 hover:text-white/80"
                    )}
                  >
                    Otomatik Döndür
                  </button>
                  <button
                    onClick={resetCamera}
                    className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase border border-white/15 text-white/55 hover:border-bronze/40 hover:text-bronze transition-all duration-300"
                  >
                    Sıfırla
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
