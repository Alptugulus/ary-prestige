"use client";

import { motion } from "framer-motion";
import { locationDistances } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function LocationSection() {
  return (
    <section id="lokasyon" className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Lokasyon"
          title="Şehrin Merkezine Yakın, Kalabalığa Uzak"
          description="Yenibağlıca'nın stratejik konumunda, ulaşım ağlarına dakikalar mesafede, doğayla iç içe prestijli bir adres."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-4">
            {locationDistances.map((item, index) => (
              <motion.div
                key={item.destination}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center justify-between p-6 md:p-8 border border-white/5 hover:border-bronze/20 bg-secondary/30 transition-all duration-500"
              >
                <span className="text-silver/80 text-base md:text-lg group-hover:text-white transition-colors">
                  {item.destination}
                </span>
                <span className="font-display text-xl md:text-2xl text-bronze font-light whitespace-nowrap ml-4">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-[4/5] bg-secondary border border-white/5 overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 border border-bronze/40 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-bronze"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white font-light mb-2">
                  Yenibağlıca
                </h3>
                <p className="text-silver/60 text-sm">Ankara</p>
              </div>
            </div>

            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-bronze/30 rounded-full"
                  style={{
                    width: `${(i + 1) * 20}%`,
                    height: `${(i + 1) * 20}%`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function InvestmentSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,138,90,0.08),transparent_70%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="block text-bronze text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
            Yatırım
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight mb-8">
            Bugünün Yaşamı,
            <br />
            <span className="text-bronze">Yarının Değeri</span>
          </h2>
          <p className="text-silver/70 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Yenibağlıca&apos;nın gelişen aksında yükselen ARY Prestige, yaşam
            kalitesi ve yatırım potansiyelini aynı projede buluşturuyor.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "185 m²", label: "Net Yaşam Alanı" },
              { value: "4+1", label: "Rezidans Daire" },
              { value: "3 Cephe", label: "Panoramik Manzara" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 border border-white/5 bg-background/50"
              >
                <p className="font-display text-3xl text-bronze font-light mb-2">
                  {item.value}
                </p>
                <p className="text-silver/60 text-sm tracking-wider uppercase">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
