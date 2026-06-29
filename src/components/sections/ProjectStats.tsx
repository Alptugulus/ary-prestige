"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useModel3D } from "@/context/Model3DContext";
import { projectStats, heroSlides } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { PlayIcon, StatIcons } from "@/components/ui/Icons";

function StatCounter({
  value,
  suffix,
  label,
  icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center group px-3 md:px-4"
    >
      <StatIcons
        icon={icon}
        className="text-bronze/70 group-hover:text-bronze transition-colors duration-500 mb-3 md:mb-4 w-7 h-7 md:w-9 md:h-9"
      />
      <div className="font-display text-2xl md:text-3xl lg:text-[2rem] text-white font-medium mb-1 tracking-tight">
        {formatNumber(count)}
        <span className="text-bronze">{suffix}</span>
      </div>
      <div className="text-white/45 text-[9px] md:text-[10px] tracking-[0.18em] uppercase font-sans font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function ProjectStats() {
  const { openModel3D } = useModel3D();

  return (
    <section className="relative bg-secondary border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2 py-10 md:py-12 lg:py-11">
            {projectStats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-64 xl:w-72 flex-shrink-0 border border-white/5 lg:border-l lg:border-t-0 border-t m-4 lg:m-0 lg:my-4 lg:mr-4"
          >
            <button
              type="button"
              onClick={openModel3D}
              className="group relative w-full h-full min-h-[160px] lg:min-h-full overflow-hidden"
              aria-label="Projeyi 3D Keşfet"
            >
              <div className="relative w-full h-full min-h-[160px] lg:min-h-[200px]">
                <Image
                  src={heroSlides[2].image}
                  alt="ARY Prestige 3D Keşfet"
                  fill
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                  sizes="288px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5">
                <div className="text-bronze group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-9 h-9 md:w-10 md:h-10" />
                </div>
                <span className="text-white text-[10px] tracking-[0.2em] uppercase text-center font-sans font-medium">
                  Projeyi 3D Keşfet
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
