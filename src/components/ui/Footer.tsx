"use client";

import { ArrowUp, Terminal, Shield, Heart } from "lucide-react";
import { playClickSound } from "@/lib/sounds";
import { PROFILE } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-16 relative font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>UMAIR.MUJTABA // ARCHITECT</span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-[11px]">
              Engineered with precision for high-throughput distributed architectures, zero-downtime legacy refactoring, and database query optimization.
            </p>
          </div>

          {/* Architecture Specs */}
          <div className="space-y-2">
            <div className="text-zinc-400 uppercase font-semibold text-[11px]">Runtime Specification</div>
            <ul className="text-zinc-500 text-[11px] space-y-1">
              <li>Framework: Next.js 16 (App Router)</li>
              <li>Type System: TypeScript (Strict)</li>
              <li>Animation: GSAP + Lenis + R3F</li>
              <li>Data Layer: Prisma + SQLite/Postgres</li>
            </ul>
          </div>

          {/* Navigation Anchors */}
          <div className="space-y-2">
            <div className="text-zinc-400 uppercase font-semibold text-[11px]">Index Directory</div>
            <ul className="text-zinc-500 text-[11px] space-y-1">
              <li><a href="#featured-projects" className="hover:text-cyan-300">01. Case Studies</a></li>
              <li><a href="#query-profiler" className="hover:text-cyan-300">02. Query Profiler</a></li>
              <li><a href="#architecture" className="hover:text-cyan-300">03. Systems Architecture</a></li>
              <li><a href="#experience" className="hover:text-cyan-300">04. Production Provenance</a></li>
              <li><a href="#contact" className="hover:text-cyan-300">05. Dispatch Console</a></li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-cyan-300 transition-all uppercase tracking-wider"
            >
              <span>RETURN TO APEX</span>
              <ArrowUp size={13} />
            </button>
            <div className="text-zinc-600 text-[10px] mt-4">
              STATUS: 60FPS STABLE // GPU BUFFER
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
              LinkedIn
            </a>
            <span>•</span>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-cyan-300">
              Email
            </a>
            <span>•</span>
            <a href={PROFILE.resumePath} download="UmairMujtaba_SE_Resume.pdf" className="hover:text-cyan-300">
              Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

