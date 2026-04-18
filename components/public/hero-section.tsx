"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Hero3dScene = dynamic(
  () => import("@/components/public/hero-3d-scene").then((module) => module.Hero3dScene),
  {
    ssr: false,
    loading: () => <div className="h-56 w-full animate-pulse rounded-2xl border border-slate-700 bg-slate-900/70 md:h-72" />,
  },
);

type HeroSectionProps = {
  title: string;
  subtitle: string;
};

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="na-card rounded-2xl p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
          <p className="na-muted mt-4 max-w-3xl text-base md:text-lg">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          <Hero3dScene />
        </motion.div>
      </div>
    </section>
  );
}
