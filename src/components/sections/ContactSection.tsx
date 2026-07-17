"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }

      setStatus("success");
      setFormState({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="iletisim" className="py-24 md:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          subtitle="İletişim"
          title="Bilgi Talep Edin"
          description={`${siteConfig.name} hakkında detaylı bilgi almak ve size özel ödeme planı oluşturmak için formu doldurun.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-silver/60 text-xs tracking-[0.15em] uppercase mb-3"
              >
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-bronze text-white text-base outline-none transition-colors duration-300 placeholder:text-silver/30"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-silver/60 text-xs tracking-[0.15em] uppercase mb-3"
              >
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formState.phone}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-bronze text-white text-base outline-none transition-colors duration-300 placeholder:text-silver/30"
                placeholder="0 (5XX) XXX XX XX"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-silver/60 text-xs tracking-[0.15em] uppercase mb-3"
              >
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-bronze text-white text-base outline-none transition-colors duration-300 placeholder:text-silver/30"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-silver/60 text-xs tracking-[0.15em] uppercase mb-3"
              >
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-bronze text-white text-base outline-none transition-colors duration-300 placeholder:text-silver/30 resize-none"
                placeholder="Mesajınız..."
              />
            </div>

            {(status === "error" || status === "success") && (
              <p
                className={
                  status === "success"
                    ? "text-bronze text-sm"
                    : "text-red-400 text-sm"
                }
                role="status"
              >
                {status === "success"
                  ? "Talebiniz alındı. En kısa sürede dönüş yapacağız."
                  : errorMessage}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1 sm:flex-none"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Gönderiliyor..."
                  : status === "success"
                    ? "Gönderildi ✓"
                    : "Gönder"}
              </Button>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Merhaba, ${siteConfig.name} hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-green-600/40 text-green-500 hover:bg-green-600/10 text-xs md:text-sm tracking-wider uppercase transition-all duration-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <p className="pt-2 text-[11px] leading-relaxed text-silver/40">
              Formu göndererek{" "}
              <Link
                href="/kvkk"
                className="text-silver/60 underline underline-offset-2 transition-colors hover:text-bronze"
              >
                KVKK Aydınlatma Metni
              </Link>
              &apos;ni okuduğunuzu kabul etmiş olursunuz.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="group relative aspect-video overflow-hidden border border-bronze/30 bg-[#12100e]">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "sepia(0.35) saturate(1.2) hue-rotate(-12deg) brightness(0.88) contrast(1.08)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} Konum`}
                className="absolute inset-0 scale-[1.03] transition-transform duration-700 group-hover:scale-[1.06]"
              />

              {/* Warm ARY wash */}
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(197,160,89,0.22) 0%, transparent 42%, rgba(18,16,14,0.55) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(12,10,8,0.72)_100%)]" />

              {/* Architectural gold corners */}
              <div className="pointer-events-none absolute inset-0 z-[4]">
                <span className="absolute left-4 top-4 h-10 w-10 border-l border-t border-bronze" />
                <span className="absolute right-4 top-4 h-10 w-10 border-r border-t border-bronze" />
                <span className="absolute bottom-16 left-4 h-10 w-10 border-l border-b border-bronze" />
                <span className="absolute bottom-16 right-4 h-10 w-10 border-r border-b border-bronze" />
              </div>

              {/* Custom gold pin */}
              <div className="pointer-events-none absolute left-1/2 top-[44%] z-[5] -translate-x-1/2 -translate-y-full">
                <div className="relative flex flex-col items-center drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze bg-gradient-to-b from-[#E8C872] to-[#A67C3D] shadow-[0_0_24px_rgba(197,160,89,0.45)]">
                    <span className="font-display text-sm font-medium tracking-wide text-[#1c1916]">
                      A
                    </span>
                  </div>
                  <div className="h-4 w-px bg-gradient-to-b from-bronze to-transparent" />
                  <div className="h-1.5 w-1.5 rounded-full bg-bronze/80" />
                </div>
              </div>

              {/* Brand bar */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] border-t border-bronze/25 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/95 to-transparent px-5 pb-4 pt-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-bronze">
                      {siteConfig.company} · Satış Ofisi
                    </p>
                    <p className="mt-1 font-display text-lg text-white font-light">
                      {siteConfig.addressLabel}
                    </p>
                  </div>
                  <span className="mb-0.5 text-xs tracking-[0.16em] uppercase text-bronze transition-colors group-hover:text-[#E8C872]">
                    Yol Tarifi →
                  </span>
                </div>
              </div>

              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`${siteConfig.addressLabel} — Google Maps'te yol tarifi al`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/50 border border-white/5">
                <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-3">
                  {siteConfig.addressLabel}
                </h4>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver/70 hover:text-white text-sm transition-colors underline-offset-4 hover:underline"
                >
                  {siteConfig.address}
                </a>
              </div>
              <div className="p-6 bg-secondary/50 border border-white/5">
                <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-3">
                  Telefon
                </h4>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-silver/70 hover:text-white text-sm transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="p-6 bg-secondary/50 border border-white/5 sm:col-span-2">
                <h4 className="text-bronze text-xs tracking-[0.2em] uppercase mb-3">
                  E-posta
                </h4>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-silver/70 hover:text-white text-sm transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
