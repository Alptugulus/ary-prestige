"use client";

import { motion } from "framer-motion";
import { deliveryTimeline, paymentPlans } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function DeliveryTimeline() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Teslim Takvimi"
          title="Planlı Teslimat"
          description="Aralık ayında başlayan inşaat süreci, blok bazında planlı teslimat takvimiyle tamamlanacaktır."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-bronze/50 via-bronze/20 to-transparent md:-translate-x-px" />

            {deliveryTimeline.map((item, index) => (
              <motion.div
                key={item.block}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={cn(
                  "relative flex items-center gap-8 mb-12 last:mb-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className="hidden md:block flex-1" />

                <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center bg-background border-2 border-bronze rounded-full">
                  <span className="font-display text-xl text-bronze">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1 p-8 bg-secondary/50 border border-white/5 hover:border-bronze/20 transition-colors duration-500">
                  <span className="text-bronze/60 text-xs tracking-[0.2em] uppercase">
                    {item.label}
                  </span>
                  <h3 className="font-display text-2xl text-white font-light mt-2 mb-3">
                    {item.block}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl text-bronze font-light">
                      {item.months}
                    </span>
                    <span className="text-silver/60 text-sm">Ay</span>
                  </div>

                  <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.months / 36) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.2 + 0.3 }}
                      className="h-full bg-gradient-to-r from-bronze to-bronze/50 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PaymentPlans() {
  return (
    <section id="odeme-plani" className="py-24 md:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="Ödeme Planları"
          title="Esnek Finansman Seçenekleri"
          description="Size en uygun ödeme planını birlikte belirleyelim. Kişiye özel finansman çözümleri sunuyoruz."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "group relative p-8 md:p-10 h-full flex flex-col transition-all duration-500",
                plan.highlight
                  ? "bg-background border-2 border-bronze/50"
                  : "bg-background/50 border border-white/5 hover:border-bronze/30"
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 px-4 py-1 bg-bronze text-background text-[10px] tracking-[0.2em] uppercase">
                  Popüler
                </span>
              )}

              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl text-white font-light mb-4 group-hover:text-bronze transition-colors duration-500">
                  {plan.title}
                </h3>
                <p className="text-silver/60 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-2 text-bronze text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all duration-300"
                >
                  Detaylı Bilgi
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
