# Umair Mujtaba — Principal Systems & Backend Software Engineer Portfolio

An Awwwards/FWA-grade personal portfolio website showcasing distributed systems engineering, high-throughput database optimization, and modern creative frontend craft.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Three.js WebGL**, **GSAP + ScrollTrigger**, **Lenis Smooth Scroll**, **Prisma ORM**, and **Tailwind CSS**.

---

## ⚡ Live Demos & Architecture

- **GitHub Repository:** [https://github.com/umairmujtaba987/portfolio](https://github.com/umairmujtaba987/portfolio)
- **Live Preview:** [https://portfolio-phi-flame-1tt6j1177z.vercel.app/](https://portfolio-phi-flame-1tt6j1177z.vercel.app/)
- **Local Dev:** `http://localhost:3000`

---

## 🛠️ Key Architectural Highlights

### 1. The Query Profiler (`/components/sections/QueryProfiler.tsx`)
Interactive database query latency benchmark component simulating real production queries from Umair's work (e.g. **SMC/ZD Tracker** district child immunization rollups and **IDIMS** disease surveillance outbreaks). Visually benchmarks unindexed table scans vs covering indexes and materialized views in real time.

### 2. Interactive WebGL Spatial Node Core (`/components/canvas/HeroNodesCanvas.tsx`)
GPU-composited Three.js particle mesh with 90 spatial nodes representing distributed backend microservices and database shards. Particles dynamically react to mouse proximity with gravitational damping and connective laser links.

### 3. Interactive CLI Terminal (`/components/ui/TerminalPlayground.tsx`)
Interactive shell session (`umair@systems:~$`) embedded on the page and accessible globally via `Cmd+K` / `Ctrl+K`.
Supported commands:
- `help` — Index of available system commands
- `projects` — Output flagship case studies and tech stacks
- `skills` — Categorized competencies and mastery scores
- `experience` — Career timeline and production roles
- `cat resume` — View technical resume summary
- `benchmark` — Trigger simulated query plan evaluation
- `download` — Download `UmairMujtaba_SE_Resume.pdf`
- `contact` — Show direct contact links

### 4. Interactive Cluster Topology Sandbox (`/components/sections/ArchitectureSandbox.tsx`)
Interactive visualization of distributed service topologies: Ingress API Gateway $\rightarrow$ Redis Ephemeral Locks $\rightarrow$ PostgreSQL Primary $\rightarrow$ Cron Workers $\rightarrow$ Analytical Health Dashboard.

### 5. Production Full-Stack Architecture
- **Prisma ORM (`/prisma/schema.prisma`):** Dynamic schema with seed data matching Umair's actual CV. SQLite for local zero-dependency dev; seamlessly switches to PostgreSQL in production via `DATABASE_URL`.
- **Type-Safe Server Action (`/server/actions/contact.ts`):** Zod-validated contact form with sliding-window rate limiting to prevent spam, and optional Resend transactional email dispatch.
- **Synthesized Audio Engine (`/lib/sounds.ts`):** Tactile mechanical click, hover, and success feedback synthesized in real time via the browser Web Audio API with zero audio assets to download.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/umairmujtaba987/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize and Seed the Database:**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Build & Deployment

To test the optimized production build:
```bash
npm run build
npm run start
```

### Deploying to Vercel (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy with:
   ```bash
   vercel
   ```
3. Set optional environment variables in your Vercel project settings:
   - `DATABASE_URL` (e.g. Neon Postgres or Supabase connection string)
   - `RESEND_API_KEY` (for transactional contact form emails)

---

## 👤 Author

**Umair Mujtaba**
- **Role:** Software Engineer — Backend & Distributed Systems Specialist
- **Location:** Islamabad, Pakistan
- **LinkedIn:** [linkedin.com/in/umair-mujtaba-425981181](https://linkedin.com/in/umair-mujtaba-425981181)
- **Email:** [umairmujtaba123@gmail.com](mailto:umairmujtaba123@gmail.com)
