"use client";

import { motion } from "framer-motion";
import {
  apartmentFeatures,
  bathroomTypes,
  extraFeatures,
} from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FloorPlanViewer } from "@/components/sections/FloorPlanViewer";

export function ApartmentSection() {
  return (
    <section id="daireler" className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Daire Deneyimi"
          title="Ayrıntılarda Saklı Konfor"
          description="Her metrekaresi özenle tasarlanmış 4+1 rezidans daireler, geniş yaşam alanları ve premium detaylarla üst segment konfor sunuyor."
        />

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
              Normal kat planı — Tip A ve Tip B daire seçenekleri
            </p>
          </div>

          <FloorPlanViewer />
        </motion.div>
      </div>
    </section>
  );
}
