"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Server, Activity, ArrowRight, ShieldCheck, Database } from "lucide-react";
import { ProjectData } from "@/lib/data";
import { playClickSound } from "@/lib/sounds";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0e14] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 text-zinc-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-semibold uppercase">
                  {project.category}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{project.timeframe}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{project.organization}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-1 font-mono">{project.subtitle}</p>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Impact Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            {project.impactMetrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
              >
                <div className="text-xs font-mono text-zinc-500 uppercase">{metric.label}</div>
                <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
                  {metric.value}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">{metric.subtext}</div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl bg-red-950/10 border border-red-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-400 uppercase mb-2">
                <Activity size={14} /> The Production Challenge
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{project.challenge}</p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase mb-2">
                <ShieldCheck size={14} /> Engineered Solution
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Breakdown */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase mb-2">
              <Server size={14} /> System Architecture & Implementation
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">{project.architecture}</p>
          </div>

          {/* Query Optimization Deep-Dive if available */}
          {project.queryBenchmark && (
            <div className="p-5 rounded-xl bg-cyan-950/15 border border-cyan-500/20 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase">
                  <Database size={14} /> Query Plan Transformation
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  {project.queryBenchmark.unindexedTime}ms → {project.queryBenchmark.indexedTime}ms (
                  {Math.round(
                    ((project.queryBenchmark.unindexedTime - project.queryBenchmark.indexedTime) /
                      project.queryBenchmark.unindexedTime) *
                      100
                  )}
                  % latency drop)
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/60 border border-red-500/20">
                  <div className="text-[10px] text-red-400 uppercase mb-1">
                    Before: Unindexed Subquery ({project.queryBenchmark.unindexedTime}ms)
                  </div>
                  <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px]">
                    {project.queryBenchmark.unindexedSql}
                  </pre>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-emerald-500/20">
                  <div className="text-[10px] text-emerald-400 uppercase mb-1">
                    After: Indexed Covering Optimization ({project.queryBenchmark.indexedTime}ms)
                  </div>
                  <pre className="text-cyan-300 whitespace-pre-wrap overflow-x-auto text-[11px]">
                    {project.queryBenchmark.indexedSql}
                  </pre>
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-400 font-mono">
                <span className="text-cyan-400">Strategy:</span>{" "}
                {project.queryBenchmark.optimizationTechnique}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase mb-2">Technologies Used</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

