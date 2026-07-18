"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeroScene } from "@/components/hero/scene";
import { useExplore } from "@/context/ExploreContext";
import { heroSlides, heroFeatures, siteConfig } from "@/lib/data";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { openExperience } = useExplore();

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
        className="relative flex flex-col min-h-[100svh] md:min-h-screen overflow-hidden"
      >
        <HeroScene
          slides={heroSlides}
          activeIndex={currentSlide}
          scrollScale={imageScale}
          scrollY={imageY}
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative flex-1 flex items-center pt-28 md:pt-32 pb-8 md:pb-10 will-change-transform z-10"
        >
          <div className="container mx-auto px-6 lg:px-10">
            <div className="max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="tag-outline">Bağlıca · Etimesgut · Ankara</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-6 md:mt-8 mb-4 md:mb-5"
              >
                <Image
                  src={siteConfig.logoLight}
                  alt={siteConfig.nameUpper}
                  width={520}
                  height={560}
                  className="h-[4.5rem] sm:h-[5.5rem] md:h-[6.5rem] lg:h-[7.25rem] w-auto object-contain object-left drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                  priority
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-sans text-base md:text-lg lg:text-xl text-white/90 font-light tracking-[0.04em] mb-5 md:mb-6 italic"
              >
                {siteConfig.slogan}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="font-sans text-white/75 text-sm md:text-[15px] leading-relaxed max-w-lg mb-8 md:mb-10 font-light"
              >
                185 m² net yaşam alanına sahip 4+1 rezidans daireler, panoramik
                Ankara manzarası ve ayrıcalıklı sosyal yaşam konseptiyle
                Bağlıca&apos;da yükseliyor.
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
                <button
                  type="button"
                  onClick={() => openExperience("3d")}
                  className="btn-ghost w-full sm:w-auto"
                >
                  3D Modeli İncele
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M12 22V12M21 7L12 12M3 7L12 12" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 360° 3D + zaman modları */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-0.5 p-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full"
        >
          <button
            onClick={() => openExperience("3d")}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-300 rounded-full text-bronze bg-bronze/15 ring-1 ring-bronze/30"
            aria-label="360° 3D Model"
            title="360° 3D Model"
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

        {/* Scroll + slayt önizlemeleri + pusula — normal akışta, içerikle çakışmaz */}
        <div className="relative z-10 container mx-auto px-6 lg:px-10 flex items-end justify-between gap-5 md:gap-8 pb-5 md:pb-6">
          <div className="flex items-end gap-5 md:gap-8">
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
            className="flex items-end gap-3 md:gap-4"
          >
            {heroSlides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(index)}
                className="group flex flex-col items-start gap-1.5"
                aria-label={s.label}
              >
                <div
                  className={cn(
                    "relative w-20 sm:w-24 md:w-28 aspect-[16/10] overflow-hidden rounded-sm border transition-all duration-400",
                    index === currentSlide
                      ? "border-bronze ring-1 ring-bronze/40 opacity-100"
                      : "border-white/15 opacity-50 group-hover:opacity-80 group-hover:border-white/30"
                  )}
                >
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <span
                  className={cn(
                    "font-sans text-[9px] md:text-[10px] tracking-[0.14em] uppercase transition-colors duration-300",
                    index === currentSlide
                      ? "text-bronze"
                      : "text-white/30 group-hover:text-white/55"
                  )}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </motion.div>
          </div>

          {/* Pusula */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="hidden lg:block opacity-50"
          >
            <CompassIcon />
          </motion.div>
        </div>

        {/* Özellik barı — ikon üstte, metin altta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10"
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
