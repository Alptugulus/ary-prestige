"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo, PhoneIcon } from "@/components/ui/Icons";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("anasayfa");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-2.5"
            : "bg-gradient-to-b from-background/85 to-transparent py-4 lg:py-5"
        )}
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-5 xl:gap-8">
            <Link href="#anasayfa" className="flex-shrink-0">
              <Logo compact />
            </Link>

            <nav className="hidden lg:flex items-center justify-center flex-nowrap gap-[clamp(0.65rem,1.1vw,1.35rem)] min-w-0 overflow-hidden">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative whitespace-nowrap flex-shrink-0",
                      "text-[clamp(8.5px,0.62vw,10px)] font-medium tracking-[0.1em] xl:tracking-[0.12em] uppercase",
                      "transition-colors duration-300 py-1",
                      isActive
                        ? "text-bronze"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-bronze"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-3 flex-shrink-0">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="hidden md:inline-flex items-center gap-2 px-3 lg:px-4 xl:px-5 py-1.5 xl:py-2 border border-bronze/50 text-bronze hover:bg-bronze/10 text-[10px] xl:text-[11px] font-medium tracking-[0.14em] transition-all duration-300 rounded-sm whitespace-nowrap"
              >
                <PhoneIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden xl:inline">{siteConfig.phone}</span>
                <span className="xl:hidden tabular-nums">Ara</span>
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                aria-label="Menü"
              >
                <span
                  className={cn(
                    "block w-6 h-px bg-bronze transition-all duration-300",
                    isMobileOpen && "rotate-45 translate-y-[3.5px]"
                  )}
                />
                <span
                  className={cn(
                    "block w-6 h-px bg-bronze transition-all duration-300",
                    isMobileOpen && "-rotate-45 -translate-y-[3.5px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="font-display text-2xl text-white hover:text-bronze transition-colors tracking-wider"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-3 px-8 py-3 border border-bronze text-bronze text-sm tracking-wider"
              >
                <PhoneIcon />
                {siteConfig.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5 py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-silver/60 text-sm leading-relaxed max-w-xs mt-4">
              Ankara Yenibağlıca&apos;da yükselen prestijli yaşam projesi.
              {siteConfig.company} güvencesiyle.
            </p>
          </div>

          <div>
            <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-6">
              Hızlı Erişim
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-silver/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-6">
              İletişim
            </h4>
            <div className="space-y-3 text-silver/60 text-sm">
              <p>{siteConfig.address}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-silver/40 text-xs">
            © {new Date().getFullYear()} {siteConfig.company}. Tüm hakları
            saklıdır.
          </p>
          <p className="text-silver/40 text-xs tracking-wider">
            {siteConfig.name} — Ankara&apos;nın Yeni Prestij Noktası
          </p>
        </div>
      </div>
    </footer>
  );
}
