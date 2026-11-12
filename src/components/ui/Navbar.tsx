"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Terminal, Volume2, VolumeX, Download, ArrowUpRight } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, playClickSound } from "@/lib/sounds";
import { PROFILE } from "@/lib/data";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [audioActive, setAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setAudioActive(isSoundEnabled());

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAudio = () => {
    const next = !audioActive;
    setAudioActive(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07080b]/80 backdrop-blur-md border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={playClickSound}
            className="flex items-center gap-2 group font-mono text-sm tracking-tight text-white font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
            <span className="text-zinc-100 group-hover:text-cyan-300 transition-colors">
              UMAIR.MUJTABA
            </span>
            <span className="hidden sm:inline text-xs text-zinc-500 font-normal">
              // SYS.ENG
            </span>
          </Link>

          {/* Time & Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] font-mono text-[11px] text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PKT {currentTime || "12:00:00"}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">ISLAMABAD</span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider uppercase text-zinc-400">
          <a
            href="#featured-projects"
            onClick={playClickSound}
            className="hover:text-cyan-300 transition-colors"
          >
            01. Case Studies
          </a>
          <a
            href="#query-profiler"
            onClick={playClickSound}
            className="hover:text-cyan-300 transition-colors"
          >
            02. Profiler
          </a>
          <a
            href="#architecture"
            onClick={playClickSound}
            className="hover:text-cyan-300 transition-colors"
          >
            03. Architecture
          </a>
          <a
            href="#experience"
            onClick={playClickSound}
            className="hover:text-cyan-300 transition-colors"
          >
            04. Experience
          </a>
          <a
            href="#contact"
            onClick={playClickSound}
            className="hover:text-cyan-300 transition-colors"
          >
            05. Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            title={audioActive ? "Mute interactive audio feedback" : "Enable tactile sound feedback"}
            className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-cyan-300 transition-all"
            aria-label="Toggle Sound"
          >
            {audioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Terminal / CLI Trigger */}
          <button
            onClick={() => {
              playClickSound();
              onOpenTerminal?.();
            }}
            title="Open Interactive Command Terminal (Cmd+K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.08] hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-all group"
          >
            <Terminal size={13} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>CLI</span>
            <kbd className="text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded text-zinc-400 border border-white/[0.06]">
              ⌘K
            </kbd>
          </button>

          {/* Resume PDF Download */}
          <a
            href={PROFILE.resumePath}
            download="UmairMujtaba_SE_Resume.pdf"
            onClick={playClickSound}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-xs font-mono font-semibold tracking-tight transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)]"
          >
            <Download size={13} />
            <span className="hidden sm:inline">RESUME</span>
            <ArrowUpRight size={13} className="hidden sm:inline" />
          </a>
        </div>
      </div>
    </header>
  );
}

