export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Distributed Systems" | "Enterprise Legacy" | "Workflow Automation" | "AI & Integration";
  role: string;
  featured: boolean;
  order: number;
  timeframe: string;
  organization: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: string;
  impactMetrics: Array<{ label: string; value: string; subtext: string }>;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  queryBenchmark?: {
    unindexedSql: string;
    unindexedTime: number; // ms
    indexedSql: string;
    indexedTime: number; // ms
    optimizationTechnique: string;
    rowsAffected: string;
  };
  systemDiagram?: {
    nodes: Array<{ id: string; label: string; type: "ingress" | "service" | "cache" | "database" | "worker" }>;
    connections: Array<{ from: string; to: string; label: string }>;
  };
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  order: number;
  highlights: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  proficiency: "Production Master" | "Advanced" | "Core Competency";
  highlight: string;
  level: number; // 0-100
}

export interface SkillCategoryData {
  name: string;
  description: string;
  skills: SkillItem[];
}

export const METRICS = [
  { label: "Records Ingested & Synced", value: "5M+", change: "+140%", subtext: "Across district-level health & surveillance networks" },
  { label: "Average Query Latency Drop", value: "-74%", change: "Optimized", subtext: "Composite indexing, CTE refactoring, and partition pruning" },
  { label: "Production Deployments", value: "8+", change: "Zero Downtime", subtext: "Enterprise healthcare, booking, and administrative platforms" },
  { label: "Legacy LoC Refactored", value: "150K+", change: "PHP 5.6 -> Modern", subtext: "Preserved business logic while resolving critical bottlenecks" },
];

export const PROJECTS: ProjectData[] = [
  {
    id: "smc-zd-tracker",
    slug: "smc-zd-tracker",
    title: "SMC/ZD Tracker",
    subtitle: "District-Scale Child Immunization Telemetry & Real-Time Aggregation",
    category: "Distributed Systems",
    role: "Backend Architect & Database Engineer",
    featured: true,
    order: 1,
    timeframe: "2026 – Present",
    organization: "Micromerger",
    summary:
      "A mission-critical zero-dose child immunization tracking platform engineered with FastAPI, Django, and PostgreSQL. Enables real-time record ingestion, district-level data synchronization, and analytical dashboard metrics with sub-50ms query latency.",
    challenge:
      "Healthcare workers in remote districts submit hundreds of thousands of child immunization logs simultaneously with intermittent connectivity. Previous analytical aggregations locked database tables, causing dashboard timeouts and desynchronized records.",
    solution:
      "Engineered high-throughput asynchronous REST ingestion endpoints using FastAPI. Redesigned PostgreSQL schemas with partial composite indexes and materialized rollups, implementing a custom synchronization pipeline ensuring zero record loss across health operations.",
    architecture:
      "FastAPI ingestion gateway coupled with Django ORM administrative controls, streaming into PostgreSQL with automated materialized view refreshes and Redis cache invalidation.",
    impactMetrics: [
      { label: "Query Latency", value: "32ms", subtext: "Down from 1,280ms on district rollup" },
      { label: "Data Integrity", value: "99.99%", subtext: "Zero-loss record reconciliation" },
      { label: "Throughput", value: "4,500 req/s", subtext: "Peak burst ingestion capacity" },
    ],
    technologies: ["FastAPI", "Django", "Python", "PostgreSQL", "Redis", "Docker", "REST APIs"],
    queryBenchmark: {
      unindexedSql: `SELECT district_id, COUNT(record_id), AVG(dose_interval_days)
FROM child_immunization_records
WHERE status = 'administered' AND vaccination_date >= '2025-01-01'
GROUP BY district_id;`,
      unindexedTime: 1280,
      indexedSql: `SELECT district_id, verified_count, avg_interval
FROM mv_district_immunization_rollups
WHERE last_sync_date >= '2025-01-01'
/* Covering index on (status, vaccination_date) INCLUDE (district_id, dose_interval_days) */`,
      indexedTime: 32,
      optimizationTechnique: "Materialized concurrent views + partial covering index on administered status",
      rowsAffected: "1,240,000 rows scanned -> 120 bucketed rows returned",
    },
    systemDiagram: {
      nodes: [
        { id: "mobile-clients", label: "Field Health Workers (Offline-First)", type: "ingress" },
        { id: "api-gw", label: "FastAPI Async Ingestion API", type: "service" },
        { id: "redis-cache", label: "Redis State & Rate Limiter", type: "cache" },
        { id: "postgres-primary", label: "PostgreSQL Primary (Schema Sharded)", type: "database" },
        { id: "agg-worker", label: "Cron Aggregation & Rollup Engine", type: "worker" },
        { id: "dashboard", label: "Analytical Health Dashboard", type: "service" },
      ],
      connections: [
        { from: "mobile-clients", to: "api-gw", label: "Encrypted Batch JSON" },
        { from: "api-gw", to: "redis-cache", label: "Session & Token Auth" },
        { from: "api-gw", to: "postgres-primary", label: "ACID Batch Writes" },
        { from: "postgres-primary", to: "agg-worker", label: "Continuous CDC / Polling" },
        { from: "agg-worker", to: "postgres-primary", label: "Materialized Rollup Refresh" },
        { from: "postgres-primary", to: "dashboard", label: "Sub-50ms Analytical Reads" },
      ],
    },
  },
  {
    id: "idims-disease-surveillance",
    slug: "idims-disease-surveillance",
    title: "IDIMS Healthcare",
    subtitle: "Enterprise Disease Surveillance System & Legacy Modernization",
    category: "Enterprise Legacy",
    role: "Lead Backend Refactoring Engineer",
    featured: true,
    order: 2,
    timeframe: "2024 – Present",
    organization: "Micromerger",
    summary:
      "Public health disease-surveillance application serving regional epidemiological centers. Maintained, stabilized, and refactored core legacy PHP 5.6 and CodeIgniter 2 backends, modernizing database access layers and eliminating production deadlocks.",
    challenge:
      "A massive 15-year-old codebase running PHP 5.6 and CodeIgniter 2 suffered from unindexed N+1 queries, unescaped raw SQL statements, and memory exhaustions whenever health ministries ran multi-district outbreak reports.",
    solution:
      "Methodically refactored legacy query builders into optimized MySQL joins and indexed views without breaking fragile legacy workflows. Implemented query caching, strict sanitization, and structured error boundaries.",
    architecture:
      "Legacy CodeIgniter 2 architecture wrapped with modern defensive middleware, optimized MySQL 8 storage engine adapters, and decoupled reporting workers.",
    impactMetrics: [
      { label: "Memory Footprint", value: "-68%", subtext: "Streamed query cursors vs buffered arrays" },
      { label: "Report Execution", value: "4.2s", subtext: "Down from 95s timeouts" },
      { label: "Uptime", value: "99.95%", subtext: "Eliminated production lock contention" },
    ],
    technologies: ["PHP 5.6 - 8.x", "CodeIgniter 2", "CodeIgniter 4", "MySQL", "Query Optimization", "AJAX"],
    queryBenchmark: {
      unindexedSql: `SELECT * FROM outbreaks o
WHERE (SELECT COUNT(*) FROM case_logs c WHERE c.outbreak_id = o.id) > 10
ORDER BY o.reported_date DESC;`,
      unindexedTime: 3420,
      indexedSql: `SELECT o.id, o.district, o.disease_code, c.case_count
FROM outbreaks o
INNER JOIN (
    SELECT outbreak_id, COUNT(*) AS case_count
    FROM case_logs
    GROUP BY outbreak_id
    HAVING COUNT(*) > 10
) c ON c.outbreak_id = o.id
ORDER BY o.reported_date DESC;`,
      indexedTime: 48,
      optimizationTechnique: "Correlated subquery conversion to pre-aggregated derived table + B-tree composite index",
      rowsAffected: "840,000 subquery evaluations reduced to single hash join",
    },
  },
  {
    id: "hmc-contract-inventory",
    slug: "hmc-contract-inventory",
    title: "HMC Booking & Inventory",
    subtitle: "Automated Contract Lifecycle, Geospatial Routing & Inventory Engine",
    category: "Workflow Automation",
    role: "Backend & System Integration Engineer",
    featured: true,
    order: 3,
    timeframe: "2024",
    organization: "Micromerger",
    summary:
      "High-volume inventory management and automated contract booking platform built with Laravel and MySQL. Integrates Google Maps API for geospatial logistics, digital contract signing workflows, automated cron jobs, and real-time alerts.",
    challenge:
      "Manual contract generation and inventory locking created race conditions where multiple clients could simultaneously reserve identical equipment warehouses across overlapping delivery schedules.",
    solution:
      "Architected pessimistic database locking in Laravel Eloquent transactions, paired with automated cron schedulers that release expired reservations and dispatch multi-channel notifications (Laravel Notifications, SMS, Email).",
    architecture:
      "Laravel 11 backend service with Redis queue workers, Google Maps distance matrix integration, PDF contract generation micro-service, and MySQL transactional safety.",
    impactMetrics: [
      { label: "Booking Race Conditions", value: "0", subtext: "Pessimistic mutex locks on reservation window" },
      { label: "Automation Ratio", value: "92%", subtext: "Contract generation, dispatch, & reminders" },
      { label: "Notification Latency", value: "< 2s", subtext: "Queue-backed async dispatch" },
    ],
    technologies: ["Laravel", "PHP 8.x", "MySQL", "Google Maps API", "Cron Jobs", "Queue Workers"],
    queryBenchmark: {
      unindexedSql: `SELECT * FROM inventory_reservations
WHERE status = 'pending' AND created_at < NOW() - INTERVAL 30 MINUTE;`,
      unindexedTime: 480,
      indexedSql: `SELECT id, item_id, quantity FROM inventory_reservations
FORCE INDEX (idx_status_created)
WHERE status = 'pending' AND created_at < NOW() - INTERVAL 30 MINUTE;`,
      indexedTime: 14,
      optimizationTechnique: "Selective index on (status, created_at) with lock-free reading for release worker",
      rowsAffected: "250,000 rows filtered down to exactly 12 expired locks",
    },
  },
  {
    id: "primero-cpmis",
    slug: "primero-cpmis",
    title: "Primero CPMIS Integration",
    subtitle: "Enterprise Child Protection Information Management & Role-Based Analytics",
    category: "AI & Integration",
    role: "Full-Stack Integration Specialist",
    featured: false,
    order: 4,
    timeframe: "2024",
    organization: "Micromerger",
    summary:
      "Integrated backend reporting and permissions infrastructure bridging Ruby on Rails, React, and Frappe framework. Configured granular RBAC security models, automated reporting modules, and synchronized child protection dashboards.",
    challenge:
      "Multiple international agencies required unified dashboard analytics while strictly adhering to data sovereignty and field-officer role-based privacy restrictions.",
    solution:
      "Developed Frappe application reporting pipelines in Python, integrated with Ruby on Rails REST endpoints, and built React dashboard widgets for real-time case triage.",
    architecture:
      "Frappe (Python) data layer coupled with Ruby on Rails APIs and React frontend analytical views.",
    impactMetrics: [
      { label: "Role Perms Configured", value: "48+", subtext: "Strict data privacy boundaries" },
      { label: "Report Generation", value: "Instant", subtext: "Pre-computed analytical facets" },
    ],
    technologies: ["Frappe Framework", "Python", "Ruby on Rails", "React", "REST APIs"],
  },
  {
    id: "dtb-booking-system",
    slug: "dtb-booking-system",
    title: "DTB Booking Engine",
    subtitle: "Multi-Node Booking Engine with Real-Time State Synchronization",
    category: "Workflow Automation",
    role: "Backend Engineer",
    featured: false,
    order: 5,
    timeframe: "2024",
    organization: "Micromerger",
    summary:
      "Tailored booking platform with complex event-driven cron jobs, real-time database synchronization across connected legacy nodes, and custom reservation business rules.",
    challenge:
      "Synchronizing appointment schedules across diverse third-party external services without data collisions or stale status states.",
    solution:
      "Created an idempotent webhook integration layer with retry queues and transaction rollbacks on failure.",
    architecture: "Laravel, MySQL, Redis Pub/Sub, Cron Job automation.",
    impactMetrics: [
      { label: "Sync Reliability", value: "99.98%", subtext: "Idempotent event dispatcher" },
    ],
    technologies: ["Laravel", "MySQL", "REST APIs", "Cron"],
  },
  {
    id: "kp-cpmis-helpline",
    slug: "kp-cpmis-helpline",
    title: "KP CPMIS Helpline",
    subtitle: "Emergency Response & Case Management Helpline System",
    category: "Enterprise Legacy",
    role: "Backend Engineer",
    featured: false,
    order: 6,
    timeframe: "2024",
    organization: "Micromerger",
    summary:
      "Helpline management platform featuring dynamic intake forms, automated triage dispatch, caller history analytics, and executive reporting modules built with CodeIgniter 4 and MySQL.",
    challenge:
      "Rapidly intake emergency calls and route incidents to the correct municipal field officer in under 60 seconds.",
    solution:
      "Engineered dynamic schema-driven form generators, instant query indexing for phone lookup, and high-contrast administrative dashboards.",
    architecture: "CodeIgniter 4, MySQL, AJAX, DataTables, Bootstrap/Custom CSS.",
    impactMetrics: [
      { label: "Triage Time", value: "< 45s", subtext: "From incoming call to officer dispatch" },
    ],
    technologies: ["CodeIgniter 4", "PHP 8.x", "MySQL", "AJAX", "DataTables"],
  },
  {
    id: "convobot",
    slug: "convobot",
    title: "ConvoBot Automated Agent",
    subtitle: "AI-Powered Call Center Conversation & Intent Router",
    category: "AI & Integration",
    role: "Sole Creator",
    featured: false,
    order: 7,
    timeframe: "2024",
    organization: "Independent Achievement",
    summary:
      "Engineered an automated call center conversation bot in Python that parses customer intent, streamlines interactive inquiry handling, and slashes agent response times.",
    challenge:
      "High volume of repetitive Tier-1 customer calls clogging human support desks during peak business hours.",
    solution:
      "Developed intent recognition algorithms, state machine dialogue flows, and automated CRM ticket creation in Python.",
    architecture: "Python, REST APIs, JSON State Machine, Async IO.",
    impactMetrics: [
      { label: "Call Resolution Time", value: "-62%", subtext: "Automated Tier-1 deflection" },
    ],
    technologies: ["Python", "AsyncIO", "REST APIs", "NLP State Machine"],
  },
];

export const EXPERIENCES: ExperienceData[] = [
  {
    id: "micromerger",
    company: "Micromerger",
    role: "Associate Software Engineer",
    location: "Islamabad, Pakistan",
    period: "Dec 2024 – Present",
    isCurrent: true,
    order: 1,
    highlights: [
      "Engineer scalable backend systems and high-throughput RESTful APIs using Laravel, CodeIgniter 4, and Python (Frappe & FastAPI) across concurrent enterprise client projects.",
      "Maintain, optimize, and extend IDIMS, an enterprise healthcare disease-surveillance system (CodeIgniter 2 / Core PHP 5.6) — optimizing legacy MySQL queries and resolving mission-critical production bottlenecks.",
      "Architect backend REST APIs and schema indexing for the SMC Zero Dose Tracker, powering real-time child immunization telemetry and analytical dashboard metrics.",
      "Design and optimize high-concurrency MySQL and PostgreSQL databases, drastically reducing query latency and eliminating table locks.",
      "Collaborate tightly with frontend engineering teams (React / Next.js) to deliver cohesive, resilient, API-driven web applications.",
    ],
    technologies: ["Laravel", "CodeIgniter 2/4", "FastAPI", "Django", "Python", "PostgreSQL", "MySQL", "Docker", "REST APIs"],
  },
  {
    id: "lala-group",
    company: "Lala Group of Companies",
    role: "PHP Developer",
    location: "Pakistan",
    period: "Jun 2024 – Dec 2024",
    isCurrent: false,
    order: 2,
    highlights: [
      "Developed and maintained mission-critical backend modules using PHP, ensuring high application scalability and fault tolerance.",
      "Engineered and normalized relational database schemas, writing complex SQL queries and tuning execution plans for data integrity.",
      "Designed and integrated RESTful APIs enabling bi-directional communication between internal ERP systems and third-party gateways.",
      "Automated business reporting workflows, batch data processing, and asynchronous invoice generation pipelines.",
      "Enforced defensive error handling, strict input sanitization, CSRF protections, and secure coding practices.",
    ],
    technologies: ["PHP", "MySQL", "REST APIs", "DataTables", "AJAX", "Database Tuning", "System Architecture"],
  },
  {
    id: "reax",
    company: "Reax",
    role: "Laravel Intern",
    location: "Remote",
    period: "Mar 2024 – Jun 2024",
    isCurrent: false,
    order: 3,
    highlights: [
      "Assisted in architecting backend domain modules using Laravel and Eloquent ORM with clean MVC and service patterns.",
      "Implemented structured REST APIs and integrated them with dynamic frontend components.",
      "Contributed to database schema design, migration writing, and MySQL query optimization.",
      "Gained deep hands-on expertise with Laravel controllers, middleware pipelines, service providers, and event listeners.",
    ],
    technologies: ["Laravel", "Eloquent ORM", "PHP", "MySQL", "Git", "REST APIs"],
  },
  {
    id: "bahria-university",
    company: "Bahria University",
    role: "Bachelor of Science in Computer Science",
    location: "Islamabad, Pakistan",
    period: "2020 – 2024",
    isCurrent: false,
    order: 4,
    highlights: [
      "Graduated with comprehensive coursework in Distributed Systems, Database Management Systems, Operating Systems, Computer Networks, and Object-Oriented Analysis & Design.",
      "Engineered automated systems, including the ConvoBot Python automation project, demonstrating practical application of backend engineering principles.",
      "Developed strong foundation in algorithmic complexity, data structures, and relational calculus.",
    ],
    technologies: ["Computer Science", "Algorithms", "Database Architecture", "Networking", "Distributed Systems"],
  },
];

export const SKILL_CATEGORIES: SkillCategoryData[] = [
  {
    name: "Languages & Core",
    description: "Languages for high-throughput backend services and systems integration.",
    skills: [
      { name: "PHP (5.6 – 8.x)", proficiency: "Production Master", highlight: "Modern OOP, Legacy Refactoring, Memory Optimization", level: 96 },
      { name: "Python", proficiency: "Production Master", highlight: "FastAPI, Django, Frappe, AsyncIO, Scripting", level: 92 },
      { name: "SQL (PostgreSQL / MySQL)", proficiency: "Production Master", highlight: "Execution Plans, Indexing, Partitioning, CTEs", level: 95 },
      { name: "JavaScript / TypeScript", proficiency: "Advanced", highlight: "Next.js, React, Node.js, Strict Typings", level: 88 },
      { name: "HTML5 / CSS3 / Tailwind", proficiency: "Advanced", highlight: "GPU-composited CSS, Responsive Systems", level: 90 },
    ],
  },
  {
    name: "Frameworks & Backend Ecosystem",
    description: "Battle-tested backend frameworks and API architectures.",
    skills: [
      { name: "Laravel (8 – 11)", proficiency: "Production Master", highlight: "Eloquent, Queues, Service Architecture, Events", level: 95 },
      { name: "FastAPI", proficiency: "Production Master", highlight: "Async Endpoints, Pydantic, OpenAPI, Microservices", level: 90 },
      { name: "CodeIgniter (2 & 4)", proficiency: "Production Master", highlight: "Legacy Modernization, Lightweight MVC, Fast I/O", level: 94 },
      { name: "Django", proficiency: "Advanced", highlight: "ORM, Admin, Security Middleware, Auth", level: 86 },
      { name: "Frappe Framework", proficiency: "Advanced", highlight: "ERP & CPMIS Dashboard Integration, DocTypes", level: 85 },
      { name: "Ruby on Rails Integration", proficiency: "Core Competency", highlight: "Cross-platform API integration & data hooks", level: 78 },
    ],
  },
  {
    name: "Databases & Performance Engineering",
    description: "Relational persistence, query optimization, and latency reduction.",
    skills: [
      { name: "PostgreSQL", proficiency: "Production Master", highlight: "EXPLAIN ANALYZE, Covering Indexes, Materialized Views", level: 94 },
      { name: "MySQL / MariaDB", proficiency: "Production Master", highlight: "InnoDB Tuning, Deadlock Resolution, B-Tree Indexes", level: 96 },
      { name: "Query Optimization", proficiency: "Production Master", highlight: "N+1 elimination, Hash Joins, Query Profiling", level: 98 },
      { name: "Redis Caching", proficiency: "Advanced", highlight: "Sliding-window rate limiting, key invalidation, pub/sub", level: 88 },
      { name: "Database Schema Design", proficiency: "Production Master", highlight: "3NF Normalization, Denormalized read-models", level: 95 },
    ],
  },
  {
    name: "APIs, Tools & Operations",
    description: "System integration protocols, automation, and tooling.",
    skills: [
      { name: "RESTful API Architecture", proficiency: "Production Master", highlight: "Idempotent design, OpenAPI specs, Versioning", level: 96 },
      { name: "Cron Jobs & Queue Workers", proficiency: "Production Master", highlight: "Scheduled batching, retry strategies, event hooks", level: 94 },
      { name: "Google Maps API", proficiency: "Advanced", highlight: "Geospatial routing, distance matrix, dynamic pins", level: 88 },
      { name: "Postman & API Testing", proficiency: "Production Master", highlight: "Automated test suites, environment variables", level: 92 },
      { name: "Git / GitHub Version Control", proficiency: "Production Master", highlight: "Trunk-based development, rebase, branching strategies", level: 92 },
      { name: "Docker & Containerization", proficiency: "Advanced", highlight: "Multi-stage builds, compose networks, dev parity", level: 85 },
    ],
  },
];

export const PROFILE = {
  name: "Umair Mujtaba",
  title: "Software Engineer",
  tagline: "Architecting high-throughput backend systems, bulletproof databases & low-latency APIs.",
  bio: "Backend-focused Software Engineer with deep expertise across Laravel, Python (FastAPI/Django), and CodeIgniter. Proven track record in optimizing enterprise databases, modernizing mission-critical legacy healthcare platforms (IDIMS), and engineering real-time data ingestion pipelines (SMC/ZD Tracker). Based in Islamabad, building globally.",
  email: "umairmujtaba123@gmail.com",
  phone: "+92 342 4215464",
  location: "Islamabad, Pakistan",
  timezone: "UTC+05:00 (PKT)",
  status: "Available for Senior Backend Roles & Strategic Consulting",
  github: "https://github.com",
  linkedin: "https://linkedin.com/in/umair-mujtaba-425981181",
  resumePath: "/UmairMujtaba_SE_Resume.pdf",
};

