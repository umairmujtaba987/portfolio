"use client";

import { useState, useEffect } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MagneticCursor } from "@/components/motion/MagneticCursor";
import { NoiseOverlay } from "@/components/canvas/NoiseOverlay";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { QueryProfiler } from "@/components/sections/QueryProfiler";
import { ArchitectureSandbox } from "@/components/sections/ArchitectureSandbox";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillMatrix } from "@/components/sections/SkillMatrix";
import { ContactConsole } from "@/components/sections/ContactConsole";
import { Footer } from "@/components/ui/Footer";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { TerminalPlayground } from "@/components/ui/TerminalPlayground";
import { ProjectData, ExperienceData, SkillCategoryData } from "@/lib/data";

interface PortfolioExperienceProps {
  projects: ProjectData[];
  experiences: ExperienceData[];
  skillCategories: SkillCategoryData[];
}

export function PortfolioExperience({
  projects,
  experiences,
  skillCategories,
}: PortfolioExperienceProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SmoothScroll>
      {/* Visual & Kinetic Overlays */}
      <NoiseOverlay />
      <MagneticCursor />

      {/* Global Navigation */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Experience Stream */}
      <main className="relative z-10 flex flex-col">
        {/* 00. Hero Canvas & Identity */}
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* 01. Telemetry Metrics Strip */}
        <MetricsStrip />

        {/* 02. Flagship Case Studies */}
        <FeaturedProjects
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 03. High-Throughput SQL Query Profiler */}
        <QueryProfiler />

        {/* 04. System Topology & Architecture Engine Room */}
        <ArchitectureSandbox />

        {/* 05. Production Experience Provenance */}
        <ExperienceTimeline experiences={experiences} />

        {/* 06. Skill Arsenal & Mastery Grid */}
        <SkillMatrix categories={skillCategories} />

        {/* 07. Embedded Interactive Terminal Section */}
        <section className="py-20 bg-[#06080c] border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Interactive Shell Interface
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Direct Command-Line Access
              </h2>
            </div>
            <TerminalPlayground isModal={false} />
          </div>
        </section>

        {/* 08. Dispatch Console & Contact Server Action */}
        <ContactConsole />
      </main>

      {/* Footer Colophon */}
      <Footer />

      {/* Architecture Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global Command Palette / Terminal Modal */}
      <TerminalPlayground
        isModal={true}
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </SmoothScroll>
  );
}

