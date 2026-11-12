import { PrismaClient } from "@prisma/client";
import { PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with Umair Mujtaba's portfolio data...");

  // Clear existing
  await prisma.project.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.skillCategory.deleteMany({});

  // Seed Projects
  for (const p of PROJECTS) {
    await prisma.project.create({
      data: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        role: p.role,
        featured: p.featured,
        order: p.order,
        timeframe: p.timeframe,
        organization: p.organization,
        summary: p.summary,
        challenge: p.challenge,
        solution: p.solution,
        architecture: p.architecture,
        impactMetrics: JSON.stringify(p.impactMetrics),
        technologies: JSON.stringify(p.technologies),
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        systemDiagram: p.systemDiagram ? JSON.stringify(p.systemDiagram) : null,
        queryBenchmark: p.queryBenchmark ? JSON.stringify(p.queryBenchmark) : null,
      },
    });
  }
  console.log(`✓ Seeded ${PROJECTS.length} projects`);

  // Seed Experiences
  for (const exp of EXPERIENCES) {
    await prisma.experience.create({
      data: {
        id: exp.id,
        company: exp.company,
        role: exp.role,
        location: exp.location,
        period: exp.period,
        isCurrent: exp.isCurrent,
        order: exp.order,
        highlights: JSON.stringify(exp.highlights),
        technologies: JSON.stringify(exp.technologies),
      },
    });
  }
  console.log(`✓ Seeded ${EXPERIENCES.length} experiences`);

  // Seed Skill Categories
  for (let i = 0; i < SKILL_CATEGORIES.length; i++) {
    const cat = SKILL_CATEGORIES[i];
    await prisma.skillCategory.create({
      data: {
        id: `cat-${i}`,
        name: cat.name,
        order: i,
        skills: JSON.stringify(cat.skills),
      },
    });
  }
  console.log(`✓ Seeded ${SKILL_CATEGORIES.length} skill categories`);
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

