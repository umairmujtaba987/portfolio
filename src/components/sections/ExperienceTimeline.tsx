"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { ExperienceData } from "@/lib/data";

interface ExperienceTimelineProps {
  experiences: ExperienceData[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Briefcase size={14} /> 04. Career Track // Production Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Provenance.
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            From enterprise healthcare disease surveillance to high-concurrency booking engines and distributed APIs.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  exp.isCurrent
                    ? "bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.8)]"
                    : "bg-[#07080b] border-zinc-600"
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border border-white/[0.08] group-hover:border-cyan-500/30 transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 font-mono mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-zinc-500" />
                      {exp.period}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-zinc-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="text-cyan-400 shrink-0 mt-0.5"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] font-mono text-[11px] text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

