"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Database, Cpu, Wrench } from "lucide-react";
import { SkillCategoryData } from "@/lib/data";

interface SkillMatrixProps {
  categories: SkillCategoryData[];
}

export function SkillMatrix({ categories }: SkillMatrixProps) {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Code2;
      case 1:
        return Cpu;
      case 2:
        return Database;
      default:
        return Wrench;
    }
  };

  return (
    <section className="py-24 relative bg-[#080a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Terminal size={14} /> Technical Arsenal // Capabilities & Depth
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Competencies.
          </h2>
          <p className="text-zinc-400 max-w-xl mt-3 text-sm sm:text-base">
            Evaluated by deep production mastery, execution plan tuning, and enterprise service integration.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => {
            const Icon = getIcon(catIdx);
            return (
              <div
                key={catIdx}
                className="p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border border-white/[0.08] hover:border-cyan-500/20 transition-all space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                  <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">{category.name}</h3>
                    <p className="text-xs text-zinc-500">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">{skill.name}</span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-500">
                        <span>{skill.highlight}</span>
                        <span className="text-zinc-400 text-[10px] uppercase">{skill.proficiency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

