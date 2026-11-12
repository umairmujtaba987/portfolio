"use client";

import { motion } from "framer-motion";
import { ArrowDown, Terminal, FileText, ChevronRight, Activity, ShieldCheck } from "lucide-react";
import { HeroNodesCanvas } from "@/components/canvas/HeroNodesCanvas";
import { playClickSound } from "@/lib/sounds";
import { PROFILE } from "@/lib/data";

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Spatial Node Core */}
      <HeroNodesCanvas />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span>SYSTEM ARCHITECT & BACKEND SPECIALIST</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">ISLAMABAD, PK</span>
        </motion.div>

        {/* Kinetic Hero Headline */}
        <div className="max-w-4xl space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Fault-Tolerant
            </span>{" "}
            Distributed Systems & High-Volume Databases.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed pt-2"
          >
            I am <span className="text-white font-medium">{PROFILE.name}</span>, a Software Engineer specializing in Laravel, Python (FastAPI/Django), PostgreSQL optimization, and mission-critical enterprise refactoring.
          </motion.p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10 font-mono text-xs"
        >
          <a
            href="#featured-projects"
            onClick={playClickSound}
            data-cursor="explore"
            className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:scale-[1.02]"
          >
            <span>Explore Case Studies</span>
            <ChevronRight size={14} />
          </a>

          <button
            onClick={() => {
              playClickSound();
              onOpenTerminal();
            }}
            data-cursor="run"
            className="px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-zinc-200 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Terminal size={14} className="text-cyan-400" />
            <span>Launch CLI Terminal</span>
            <kbd className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-zinc-400">⌘K</kbd>
          </button>

          <a
            href={PROFILE.resumePath}
            download="UmairMujtaba_SE_Resume.pdf"
            onClick={playClickSound}
            className="px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 text-zinc-200 hover:text-emerald-300 uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <FileText size={14} className="text-emerald-400" />
            <span>Download CV (PDF)</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-zinc-500 font-mono text-[11px]"
        >
          <span className="uppercase tracking-widest text-[10px]">SCROLL TO EXPLORE ARCHITECTURE</span>
          <ArrowDown size={14} className="animate-bounce text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}

