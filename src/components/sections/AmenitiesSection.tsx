"use client";

import { motion } from "framer-motion";
import { socialAmenities } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

const iconPaths: Record<string, React.ReactNode> = {
  pool: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 14h16M4 18h16M8 10h8M12 6v4"
    />
  ),
  fitness: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12h12M8 8v8M16 8v8M4 10h2M18 10h2M4 14h2M18 14h2"
    />
  ),
  sauna: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16c0-2 2-4 4-4s4 2 4 4M12 8V4M10 6h4"
    />
  ),
  hamam: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 14c2-4 4-6 6-6s4 2 6 6M12 4v2"
    />
  ),
  basketball: (
    <circle cx="12" cy="12" r="8" strokeLinecap="round" />
  ),
  tennis: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8z"
    />
  ),
  volleyball: (
    <circle cx="12" cy="12" r="8" strokeLinecap="round" />
  ),
  playground: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16l4-8 4 8M6 16h12"
    />
  ),
  walk: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20l4-8 4 4 4-12 4 16"
    />
  ),
  gazebo: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 14l8-6 8 6M6 14v4h12v-4"
    />
  ),
  landscape: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 18c4-8 8-8 12 0s8 8 12 0"
    />
  ),
};

function AmenityIcon({ icon }: { icon: string }) {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      {iconPaths[icon]}
    </svg>
  );
}

export function SocialLifeSection() {
  return (
    <section
      id="sosyal-yasam"
      className="py-24 md:py-32 lg:py-40 bg-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,138,90,0.05),transparent_60%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <SectionHeader
          subtitle="Sosyal Yaşam"
          title="Ayrıcalıklı Yaşam Alanları"
          description="Fitness merkezinden tenis kortuna, açık havuzdan peyzaj alanlarına — ARY Prestige sakinleri için tasarlanmış kapsamlı sosyal tesisler."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {socialAmenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 md:p-8 bg-background/50 border border-white/5 hover:border-bronze/30 transition-all duration-500 cursor-default"
            >
              <div className="text-bronze/60 group-hover:text-bronze transition-colors duration-500 mb-4">
                <AmenityIcon icon={amenity.icon} />
              </div>
              <h3 className="text-white text-sm md:text-base font-light tracking-wide group-hover:text-bronze transition-colors duration-500">
                {amenity.title}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-bronze group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnicalSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Teknik Donanım"
          title="Üst Segment Altyapı"
          description="Her detayı düşünülmüş teknik altyapı ile kesintisiz, güvenli ve konforlu bir yaşam."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[
            "Merkezi Isıtma",
            "Yerden Isıtma",
            "Ses Yalıtımı",
            "Isı Yalıtımı",
            "Klima Altyapısı",
            "Galvaniz Havalandırma Sistemi",
            "Jeneratör",
            "Yedek Su Deposu",
            "Hidrofor Sistemi",
            "Elektrikli Araç Şarj İstasyonu",
            "Otomatik Yangın Söndürme Sistemi",
            "Yangın Çıkışları",
            "Sığınaklar",
            "Güvenli Alanlar",
            "Yük Asansörü",
            "Yolcu Asansörü",
            "7/24 Güvenlik",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="flex items-center gap-4 p-4 md:p-5 border border-white/5 hover:border-bronze/20 bg-secondary/30 transition-colors duration-500 group"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-bronze/30 text-bronze text-xs group-hover:bg-bronze/10 transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-silver/80 text-sm group-hover:text-white transition-colors duration-500">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ParkingSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            subtitle="Otopark"
            title="Her Daire İçin Özel Otopark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 bg-background border border-white/5 hover:border-bronze/20 transition-colors duration-500"
            >
              <div className="font-display text-5xl md:text-6xl text-bronze font-light mb-4">
                2
              </div>
              <p className="text-white text-lg md:text-xl font-light mb-2">
                Kapalı Otopark
              </p>
              <p className="text-silver/60 text-sm">Her daire için ayrılmış</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-10 md:p-12 bg-background border border-white/5 hover:border-bronze/20 transition-colors duration-500"
            >
              <div className="font-display text-5xl md:text-6xl text-bronze font-light mb-4">
                1
              </div>
              <p className="text-white text-lg md:text-xl font-light mb-2">
                Açık Otopark
              </p>
              <p className="text-silver/60 text-sm">Her daire için ayrılmış</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
