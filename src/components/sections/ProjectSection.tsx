"use client";

import { motion } from "framer-motion";
import { corporatePartners, projectFeatures } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProjectSection() {
  return (
    <section id="proje" className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Proje"
          title="Mimari Mükemmellik"
          description="16 katlı 3 blok, 6 ticari villa ve panoramik Ankara manzaralı 4+1 rezidans dairelerden oluşan ARY Prestige, Yenibağlıca'nın en prestijli adresi olmaya aday."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {projectFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative p-8 md:p-10 bg-secondary/50 border border-white/5 hover:border-bronze/30 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-bronze/0 via-bronze/50 to-bronze/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <span className="font-display text-3xl text-bronze/30 group-hover:text-bronze/60 transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-white text-lg md:text-xl font-light tracking-wide">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CorporateSection() {
  return (
    <section id="kurumsal" className="py-24 md:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Kurumsal"
          title="Güçlü İş Ortaklıkları"
          description="ARY Prestige, sektörün önde gelen firmalarının güç birliğiyle hayata geçirilmektedir."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {corporatePartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative overflow-hidden"
            >
              <div className="relative p-10 md:p-12 h-full bg-background border border-white/5 hover:border-bronze/20 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-bronze/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  <div className="w-12 h-px bg-bronze mb-8" />
                  <h3 className="font-display text-2xl md:text-3xl text-white font-light mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-bronze text-xs tracking-[0.2em] uppercase mb-6">
                    {partner.role}
                  </p>
                  <p className="text-silver/70 text-sm leading-relaxed font-light">
                    {partner.description}
                  </p>
                </div>

                <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-bronze/10 group-hover:border-bronze/30 transition-colors duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
