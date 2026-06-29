"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HeroScene } from "@/components/hero/scene";
import { useExplore } from "@/context/ExploreContext";
import { heroSlides, heroFeatures } from "@/lib/data";
import {
  ArrowIcon,
  CompassIcon,
  HeroFeatureIcons,
  Icon360,
  ScrollMouseIcon,
  SunIcon,
} from "@/components/ui/Icons";
import { HeroScrollBridge } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const { openExplore } = useExplore();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-12%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="anasayfa"
        className="relative h-screen min-h-[720px] overflow-hidden"
      >
        <HeroScene
          slides={heroSlides}
          activeIndex={currentSlide}
          scrollScale={imageScale}
          scrollY={imageY}
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex items-center pt-28 pb-52 md:pb-56 will-change-transform"
        >
          <div className="container mx-auto px-6 lg:px-10">
            <div className="max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="tag-outline">Ankara Yenibağlıca</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] text-gold-gradient font-medium tracking-[0.04em] leading-[1.05] mt-6 md:mt-8 mb-4 md:mb-5"
              >
                ARY PRESTIGE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-display text-xl md:text-2xl lg:text-[1.65rem] text-white font-normal tracking-wide mb-5 md:mb-6"
              >
                Ankara&apos;nın Yeni Prestij Noktası
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="font-sans text-white/75 text-sm md:text-[15px] leading-relaxed max-w-lg mb-8 md:mb-10 font-light"
              >
                185 m² net yaşam alanına sahip 4+1 rezidans daireler, panoramik
                Ankara manzarası ve ayrıcalıklı sosyal yaşam konseptiyle
                Yenibağlıca&apos;da yükseliyor.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <Link href="#proje" className="btn-gold">
                  Projeyi Keşfet
                  <ArrowIcon />
                </Link>
                <Link href="#iletisim" className="btn-ghost">
                  Bilgi Talep Et
                  <ArrowIcon />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 360° + zaman modları */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-0.5 p-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full"
        >
          <button
            onClick={() => openExplore("360", currentSlide)}
            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-bronze transition-colors"
            aria-label="360° Proje Turu"
          >
            <Icon360 />
          </button>
          <div className="w-5 h-px bg-white/15 my-0.5" />
          {heroSlides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-9 h-9 flex items-center justify-center transition-colors duration-300 rounded-full",
                index === currentSlide
                  ? "text-bronze bg-bronze/15"
                  : "text-white/40 hover:text-white/70"
              )}
              aria-label={s.label}
            >
              {s.id === "day" && <SunIcon />}
              {s.id === "sunset" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
                </svg>
              )}
              {s.id === "panorama" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 9h16M4 15h16M7 6v12M17 6v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ))}
        </motion.div>

        {/* Pusula */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[9.5rem] md:bottom-44 right-5 md:right-10 hidden lg:block opacity-50"
        >
          <CompassIcon />
        </motion.div>

        {/* Scroll + slayt numaraları */}
        <div className="absolute bottom-[9.5rem] md:bottom-44 left-6 md:left-10 flex items-end gap-6 md:gap-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="hidden sm:flex flex-col items-center gap-2"
          >
            <ScrollMouseIcon />
            <span className="text-white/40 text-[9px] tracking-luxury uppercase font-sans">
              Aşağı kaydırın
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex items-center gap-3 md:gap-4"
          >
            {heroSlides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(index)}
                className="group flex items-center gap-2"
                aria-label={`Slayt ${index + 1}`}
              >
                <span
                  className={cn(
                    "font-sans text-xs md:text-sm font-medium transition-colors duration-300",
                    index === currentSlide
                      ? "text-bronze"
                      : "text-white/25 group-hover:text-white/50"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index === currentSlide && (
                  <motion.span
                    layoutId="slide-indicator"
                    className="hidden sm:block w-6 h-px bg-bronze"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Özellik barı — ikon üstte, metin altta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <div className="bg-black/60 backdrop-blur-md border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6 lg:px-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {heroFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex flex-col items-center justify-center gap-2 py-5 md:py-6 px-2 border-r border-white/5 last:border-r-0 group"
                  >
                    <HeroFeatureIcons
                      icon={feature.icon}
                      className="text-bronze/80 group-hover:text-bronze transition-colors w-6 h-6 md:w-7 md:h-7"
                    />
                    <span className="text-white/70 group-hover:text-white text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-center leading-snug font-sans font-medium transition-colors duration-300">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <HeroScrollBridge />
    </>
  );
}
