import { parseConfig } from "#/lib/config";

const config = parseConfig({
  site: {
    url: "https://awolverp.github.io/portfolio",
    displayName: "A.Wolver.P",
    keywords:
      "Ali Pooralijan, A.Wolver.P, software engineer, full-stack, Rust, Python, FastAPI, PyO3, cachebox, HeroAI",
    twitter: "@awolverp",
  },
  profile: {
    name: "Ali Pooralijan",
    email: "awolverp@gmail.com",
    jobTitle: "Full-Stack Web & Rust Developer",
  },
  hero: {
    headline: "Your Next Developer",
    tagline:
      "I build high-performance backends and full-stack systems that scale. From PyO3 to production AI APIs.",
  },
  socials: [
    {
      name: "X",
      handle: "@awolverp",
      href: "https://x.com/awolverp",
      iconSrc: "/portfolio/icons/x.svg",
    },
    {
      name: "Telegram",
      handle: "@awolverp",
      href: "https://t.me/awolverp",
      iconSrc: "/portfolio/icons/telegram.svg",
    },
    {
      name: "Github",
      handle: "github.com/awolverp",
      href: "https://github.com/awolverp",
      iconSrc: "/portfolio/icons/github.svg",
    },
    {
      name: "LinkedIn",
      handle: "linkedin.com/in/ali-pooralijan-awolverp",
      href: "https://www.linkedin.com/in/ali-pooralijan-awolverp",
      iconSrc: "/portfolio/icons/linkedin.svg",
    },
  ],
  pages: {
    home: {
      title: "Ali Pooralijan | A.Wolver.P",
      description:
        "Portfolio of Ali Pooralijan (A.Wolver.P), a full-stack developer & rust developer focused on performance, scalable systems, and modern web applications.",
    },
    projects: {
      title: "Projects | A.Wolver.P",
      description:
        "Selected software projects by Ali Pooralijan (A.Wolver.P): HeroAI, cachebox, high-performance backends, and production APIs.",
    },
    resume: {
      title: "Resume | A.Wolver.P",
      description:
        "Resume of Ali Pooralijan (A.Wolver.P), software engineer focused on performance, scalable systems, and modern web applications.",
    },
  },
  projects: [
    {
      id: "heroai",
      name: "HeroAI",
      headline: "Unified AI Gateway API",
      tagline:
        "A production AI gateway over 170+ models behind OpenAI- and Gemini-compatible REST APIs.",
      description:
        "Built the HeroAI backend in FastAPI and SQLAlchemy: a production AI gateway over 170+ models (OpenAI, Gemini, Claude, DeepSeek, xAI).",
      highlights: [
        "Shipped OpenAI- and Gemini-compatible REST APIs so existing SDKs and apps integrate with little or no code changes.",
        "Implemented API key management, reseller APIs, org/team admin, enterprise data policies, and credit-based billing.",
        "Supported 20K+ users and 1M+ monthly API requests; used by WordPress plugins and third-party integrations.",
      ],
      type: "contract",
      role: "Backend Developer",
      startDate: "2024-12",
      endDate: null,
      metrics: [
        { value: "170+", label: "AI Models" },
        { value: "20K+", label: "Users" },
        { value: "1M+", label: "Monthly Requests" },
      ],
      stack: [
        {
          name: "Python",
          iconSrc: "https://cdn.simpleicons.org/python/3776AB",
        },
        {
          name: "FastAPI",
          iconSrc: "https://cdn.simpleicons.org/fastapi/009688",
        },
        {
          name: "SQLAlchemy",
          iconSrc: "https://cdn.simpleicons.org/sqlalchemy/D71F00",
        },
        {
          name: "PostgreSQL",
          iconSrc: "https://cdn.simpleicons.org/postgresql/4169E1",
        },
        { name: "Redis", iconSrc: "https://cdn.simpleicons.org/redis/FF4438" },
        {
          name: "Docker",
          iconSrc: "https://cdn.simpleicons.org/docker/2496ED",
        },
        { name: "S3" },
      ],
      image: {
        src: "/portfolio/images/heroai-showcase.jpg",
        alt: "HeroAI API Reference",
      },
      link: {
        label: "Live",
        href: "https://api.heroai.ir/docs",
      },
    },
    {
      id: "cachebox",
      name: "cachebox",
      headline: "High-performance Python cache (Rust / PyO3)",
      tagline:
        "A thread-safe in-memory cache and memoization library for Python, implemented in Rust with PyO3.",
      description:
        "Designed and maintain cachebox, a thread-safe in-memory cache and memoization library for Python, implemented in Rust with PyO3.",
      highlights: [
        "Reached 400+ GitHub stars and 13M+ PyPI downloads per month; ship CPython and PyPy wheels through Maturin and GitHub Actions.",
        "Implemented FIFO, LRU, TTL, and other eviction policies with a low memory footprint; public benchmarks show 10-50x vs common Python caches.",
      ],
      type: "open-source",
      role: "Open Source Developer",
      startDate: "2024-01",
      endDate: null,
      metrics: [
        { value: "400+", label: "GitHub Stars" },
        { value: "13M+", label: "PyPI Downloads / Mo" },
        { value: "10-50x", label: "vs Common Caches" },
      ],
      stack: [
        {
          name: "Python",
          iconSrc: "https://cdn.simpleicons.org/python/3776AB",
        },
        { name: "Rust", iconSrc: "https://cdn.simpleicons.org/rust/fff" },
        {
          name: "GitHub Actions",
          iconSrc: "https://cdn.simpleicons.org/githubactions/2088FF",
        },
      ],
      image: {
        src: "/portfolio/images/cachebox-showcase.png",
        alt: "cachebox Example",
      },
      link: {
        label: "GitHub",
        href: "https://github.com/awolverp/cachebox",
      },
    },
    {
      id: "portfolio",
      name: "Portfolio",
      headline: "My Personal Portfolio Website",
      tagline: "You're here, looking at it.",
      description:
        "A simple and customizable personal portfolio website, using Tanstack Start SSG.",
      highlights: [],
      type: "personal",
      role: "Frontend Developer",
      startDate: "2026-08",
      endDate: "2026-09",
      metrics: [],
      stack: [
        {
          name: "TypeScript",
          iconSrc: "https://cdn.simpleicons.org/typescript/3178C6",
        },
        {
          name: "Tanstack Start",
          iconSrc: "https://cdn.simpleicons.org/tanstack/EAB308",
        },
        {
          name: "GitHub Actions",
          iconSrc: "https://cdn.simpleicons.org/githubactions/2088FF",
        },
      ],
      image: {
        src: "/portfolio/images/portfolio-showcase.png",
        alt: "Screenshot",
      },
      link: {
        label: "GitHub",
        href: "https://github.com/awolverp/portfolio",
      },
    },
  ],
  resume: {
    pdfUrl: "/portfolio/resume.pdf",
    experience: [
      {
        startDate: "2023-08",
        endDate: null,
        role: "Backend Developer",
        type: "Contract",
        company: "Private Company (NDA)",
        description:
          "Design and ship production REST APIs in FastAPI used by commercial products. Model and evolve complex relational schemas so they stay maintainable as requirements grow. Build S3 / object-storage pipelines and work across multiple product codebases in the same group.",
      },
      {
        startDate: "2025-08",
        endDate: null,
        role: "Full-Stack Engineer",
        type: "Freelance",
        company: null,
        description:
          "Deliver independent freelance products: FastAPI and Actix Web backends plus working web UIs. Ship interfaces with TanStack Start or Next.js when the product needs more than an API. Take selected builds from idea to a usable web app: API, data model, and frontend.",
      },
      {
        startDate: "2023-08",
        endDate: null,
        role: "Open Source Developer",
        type: "Self-employed",
        company: null,
        description:
          "Author and maintain Rust-backed Python libraries on PyPI using PyO3 and Maturin. Also maintain markupever (HTML/XML parser, 35+ stars, 360K+ downloads) and rapidquery (SQL query builder on SeaQuery).",
      },
    ],
    skills: [
      {
        category: "Languages",
        items: [
          {
            name: "Python",
            iconSrc: "https://cdn.simpleicons.org/python/3776AB",
            journeys: ["full-stack"],
          },
          {
            name: "Rust",
            iconSrc: "https://cdn.simpleicons.org/rust/fff",
            journeys: ["rust"],
          },
          {
            name: "TypeScript",
            iconSrc: "https://cdn.simpleicons.org/typescript/3178C6",
            journeys: ["full-stack"],
          },
          { name: "SQL", journeys: ["rust", "full-stack"] },
        ],
      },
      {
        category: "Frameworks",
        items: [
          {
            name: "FastAPI",
            iconSrc: "https://cdn.simpleicons.org/fastapi/009688",
            journeys: ["full-stack"],
          },
          {
            name: "Actix Web",
            iconSrc: "https://cdn.simpleicons.org/actix/fff",
            journeys: ["rust"],
          },
          { name: "Axum" },
          {
            name: "Tanstack Start",
            iconSrc: "https://cdn.simpleicons.org/tanstack/EAB308",
            journeys: ["full-stack"],
          },
          {
            name: "Next.js",
            iconSrc: "https://cdn.simpleicons.org/nextdotjs/fff",
            journeys: ["full-stack"],
          },
          {
            name: "React",
            iconSrc: "https://cdn.simpleicons.org/react/61DAFB",
          },
        ],
      },
      {
        category: "Developer Tools",
        items: [
          { name: "Git", iconSrc: "https://cdn.simpleicons.org/git/F05032" },
          {
            name: "Docker",
            iconSrc: "https://cdn.simpleicons.org/docker/2496ED",
            journeys: ["full-stack"],
          },
          {
            name: "Nginx",
            iconSrc: "https://cdn.simpleicons.org/nginx/009639",
            journeys: ["full-stack"],
          },
          {
            name: "Github Actions",
            iconSrc: "https://cdn.simpleicons.org/githubactions/2088FF",
            journeys: ["full-stack"],
          },
          { name: "Orval" },
          { name: "S3" },
        ],
      },
      {
        category: "Databases",
        items: [
          {
            name: "PostgreSQL",
            iconSrc: "https://cdn.simpleicons.org/postgresql/4169E1",
            journeys: ["full-stack"],
          },
          {
            name: "Redis",
            iconSrc: "https://cdn.simpleicons.org/redis/FF4438",
          },
          { name: "Dragonfly" },
          {
            name: "MongoDB",
            iconSrc: "https://cdn.simpleicons.org/mongodb/47A248",
          },
        ],
      },
      {
        category: "Libraries",
        items: [
          { name: "PyO3", journeys: ["rust"] },
          {
            name: "Tokio",
            iconSrc: "https://cdn.simpleicons.org/tokio/fff",
            journeys: ["rust"],
          },
          { name: "html5ever" },
          { name: "SQLAlchemy" },
        ],
      },
    ],
    tools: [
      { name: "Zed", caption: "Code Editor", src: "/portfolio/images/zed.png" },
      {
        name: "Github",
        caption: "Code Hosting Platform",
        src: "/portfolio/images/github.png",
      },
      {
        name: "Figma",
        caption: "Collaborative Design Platform",
        src: "/portfolio/images/figma.png",
      },
      {
        name: "VS Code",
        caption: "Code Editor",
        src: "/portfolio/images/vscode.png",
      },
      {
        name: "Yaak",
        caption: "API Testing Tool",
        src: "/portfolio/images/yaak.png",
      },
      {
        name: "APIDog",
        caption: "API Design Tool",
        src: "/portfolio/images/apidog.png",
      },
      {
        name: "Grok Build",
        caption: "Coding Agent",
        src: "/portfolio/images/grok.png",
      },
    ],
    education: [
      {
        startDate: "2023-09",
        endDate: "2028-01",
        school: "Payame Noor University",
        degree: "Engineer",
        field: "Computer Engineering",
      },
    ],
  },
});

export default config;
