import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Bakım | ${siteConfig.name}`,
  description: `${siteConfig.name} sitesi kısa süreliğine bakımda.`,
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(197,160,89,0.18), transparent 60%), linear-gradient(180deg, #141414 0%, #0E0E0E 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
        <Image
          src={siteConfig.logoLight}
          alt={siteConfig.name}
          width={220}
          height={80}
          className="mb-10 h-auto w-[180px] md:w-[220px]"
          priority
        />

        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-bronze">
          Kısa bir ara
        </p>

        <h1 className="font-display text-3xl font-light tracking-tight text-white md:text-5xl">
          Bakımdayız
        </h1>

        <p className="mt-6 max-w-md text-base font-light leading-relaxed text-silver/70 md:text-lg">
          {siteConfig.name} sitesini yeniliyoruz. Kısa süre içinde tekrar
          buradayız.
        </p>

        <div className="mt-10 h-px w-16 bg-bronze/50" />

        <div className="mt-10 space-y-2 text-sm text-silver/60">
          <p>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="text-bronze transition-colors hover:text-bronze/80"
            >
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-bronze"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="pt-2 text-xs tracking-wide text-silver/40">
            {siteConfig.company}
          </p>
        </div>
      </div>
    </div>
  );
}
