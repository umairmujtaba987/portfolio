"use client";

import { motion } from "framer-motion";
import { METRICS } from "@/lib/data";

export function MetricsStrip() {
  return (
    <section className="relative z-20 border-y border-white/[0.08] bg-[#090b10]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col border-l border-white/[0.08] pl-4 sm:pl-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-semibold">
                  {metric.change}
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-zinc-300 mt-1 uppercase">
                {metric.label}
              </span>
              <span className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                {metric.subtext}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

