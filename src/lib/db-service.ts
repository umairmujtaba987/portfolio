import { prisma } from "./prisma";
import {
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  ProjectData,
  ExperienceData,
  SkillCategoryData,
} from "./data";

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    if (dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category as ProjectData["category"],
        role: p.role,
        featured: p.featured,
        order: p.order,
        timeframe: p.timeframe,
        organization: p.organization || "",
        summary: p.summary,
        challenge: p.challenge,
        solution: p.solution,
        architecture: p.architecture,
        impactMetrics: JSON.parse(p.impactMetrics || "[]"),
        technologies: JSON.parse(p.technologies || "[]"),
        githubUrl: p.githubUrl || undefined,
        liveUrl: p.liveUrl || undefined,
        systemDiagram: p.systemDiagram ? JSON.parse(p.systemDiagram) : undefined,
        queryBenchmark: p.queryBenchmark ? JSON.parse(p.queryBenchmark) : undefined,
      }));
    }
  } catch (err) {
    console.warn("Falling back to static project data:", err);
  }
  return PROJECTS;
}

export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getExperiences(): Promise<ExperienceData[]> {
  try {
    const dbExp = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    if (dbExp.length > 0) {
      return dbExp.map((e) => ({
        id: e.id,
        company: e.company,
        role: e.role,
        location: e.location,
        period: e.period,
        isCurrent: e.isCurrent,
        order: e.order,
        highlights: JSON.parse(e.highlights || "[]"),
        technologies: JSON.parse(e.technologies || "[]"),
      }));
    }
  } catch (err) {
    console.warn("Falling back to static experience data:", err);
  }
  return EXPERIENCES;
}

export async function getSkillCategories(): Promise<SkillCategoryData[]> {
  try {
    const dbCats = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
    });

    if (dbCats.length > 0) {
      return dbCats.map((c) => ({
        name: c.name,
        description: "",
        skills: JSON.parse(c.skills || "[]"),
      }));
    }
  } catch (err) {
    console.warn("Falling back to static skills data:", err);
  }
  return SKILL_CATEGORIES;
}

