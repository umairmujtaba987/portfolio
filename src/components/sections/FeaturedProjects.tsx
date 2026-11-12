"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ArrowUpRight, Cpu, Activity, Database, Check } from "lucide-react";
import { ProjectData } from "@/lib/data";
import { playClickSound } from "@/lib/sounds";

interface FeaturedProjectsProps {
  projects: ProjectData[];
  onSelectProject: (project: ProjectData) => void;
}

export function FeaturedProjects({ projects, onSelectProject }: FeaturedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Distributed Systems", "Enterprise Legacy", "Workflow Automation", "AI & Integration"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="featured-projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              <Layers size={14} /> 01. Case Studies // Production Systems
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Architectural Blueprints.
            </h2>
            <p className="text-zinc-400 max-w-xl mt-3 text-sm sm:text-base">
              Real-world systems engineered for scale, zero-loss immunization telemetry, mission-critical healthcare disease surveillance, and automated state machines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-400 text-zinc-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                    : "bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                data-cursor="view"
                onClick={() => {
                  playClickSound();
                  onSelectProject(project);
                }}
                className="group relative rounded-2xl bg-[#0c0e14] border border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-[0_0_30px_-10px_rgba(0,242,254,0.2)] hover:-translate-y-1"
              >
                {/* Top Badge & Time */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-4">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-300">
                      {project.category}
                    </span>
                    <span>{project.timeframe}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={18}
                      className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Impact & Tech */}
                <div className="pt-4 border-t border-white/[0.06] space-y-4">
                  {/* Highlight Metric */}
                  {project.impactMetrics.length > 0 && (
                    <div className="flex items-center justify-between font-mono text-xs bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                      <span className="text-zinc-500 uppercase">{project.impactMetrics[0].label}</span>
                      <span className="text-cyan-300 font-bold">{project.impactMetrics[0].value}</span>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

