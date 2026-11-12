import { Suspense } from "react";
import { getProjects, getExperiences, getSkillCategories } from "@/lib/db-service";
import { PortfolioExperience } from "@/components/PortfolioExperience";

async function PortfolioContent() {
  const [projects, experiences, skillCategories] = await Promise.all([
    getProjects(),
    getExperiences(),
    getSkillCategories(),
  ]);

  return (
    <PortfolioExperience
      projects={projects}
      experiences={experiences}
      skillCategories={skillCategories}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07080b] flex items-center justify-center font-mono text-cyan-400 text-xs">
          INITIALIZING UMAIR_OS...
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
