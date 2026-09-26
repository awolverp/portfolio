import { parseConfig } from "#/lib/config";

const config = parseConfig({
  site: {
    url: "https://awolverp.github.io/portfolio",
    displayName: "A.Wolver.P",
    keywords:
      "Ali Pooralijan, A.Wolver.P, Rust engineer, PyO3, cachebox, markupever, performance libraries, backend engineer, Python, systems engineer",
    twitter: "@awolverp",
  },
  profile: {
    name: "Ali Pooralijan",
    email: "awolverp@gmail.com",
    jobTitle: "Rust & Backend Systems Engineer",
  },
  hero: {
    headline: "Backend Systems Engineer",
    tagline:
      "I build products end-to-end, with the center of gravity on backend systems in Python and Rust: PyO3-powered libraries and production AI infrastructure serving millions of requests a month.",
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
      handle: "@awolverp",
      href: "https://github.com/awolverp",
      iconSrc: "/portfolio/icons/github.svg",
    },
    {
      name: "LinkedIn",
      handle: "in/ali-pooralijan-awolverp",
      href: "https://www.linkedin.com/in/ali-pooralijan-awolverp",
      iconSrc: "/portfolio/icons/linkedin.svg",
    },
  ],
  pages: {
    home: {
      title: "Ali Pooralijan | Rust & Backend Systems Engineer",
      description:
        "Portfolio of Ali Pooralijan (A.Wolver.P), a Rust engineer building performance-sensitive libraries with PyO3, including cachebox and markupever, plus production backends.",
    },
    projects: {
      title: "Projects | A.Wolver.P",
      description:
        "Selected work by Ali Pooralijan (A.Wolver.P): cachebox, markupever, and production backends such as HeroAI.",
    },
    resume: {
      title: "Resume | A.Wolver.P",
      description:
        "Resume of Ali Pooralijan (A.Wolver.P), a Rust and backend systems engineer. Maintainer of cachebox and markupever, with production API experience.",
    },
  },
  projects: [
    {
      id: "cachebox",
      name: "cachebox",
      headline: "High-performance Python cache",
      tagline:
        "A thread-safe in-memory cache and memoization library for Python, implemented in Rust with PyO3.",
      description:
        "Designed and maintain cachebox, a thread-safe in-memory cache and memoization library for Python, implemented in Rust with PyO3.",
      highlights: [
        "Reached 428 GitHub stars and 13M+ PyPI downloads per month; ship CPython and PyPy wheels through Maturin and GitHub Actions.",
        "Implemented FIFO, LRU, TTL, and other eviction policies with a low memory footprint. Public results in cachebox-benchmark show 10-50x vs common Python caches.",
      ],
      type: "open-source",
      role: "Open Source Developer",
      startDate: "2024-01",
      endDate: null,
      metrics: [
        { value: "428", label: "GitHub Stars" },
        { value: "13M+", label: "Downloads / Mo" },
      ],
      stack: [
        {
          name: "Python",
          iconSrc: "https://cdn.simpleicons.org/python/3776AB",
        },
        { name: "Rust", iconSrc: "https://cdn.simpleicons.org/rust/fff" },
        { name: "PyO3" },
        { name: "Maturin" },
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
      id: "markupever",
      name: "markupever",
      headline: "HTML and XML parser",
      tagline: "An HTML and XML parsing library for Python, written in Rust on html5ever.",
      description:
        "Designed and maintain markupever, an HTML and XML parser for Python. The Rust core uses html5ever, and the Python API is exposed through PyO3.",
      highlights: [
        "37 GitHub stars and 360K+ downloads on PyPI.",
        "Parsing and selectors for HTML and XML, packaged for Python through PyO3.",
      ],
      type: "open-source",
      role: "Open Source Developer",
      startDate: "2024-12",
      endDate: null,
      metrics: [
        { value: "37", label: "GitHub Stars" },
        { value: "360K+", label: "Downloads" },
      ],
      stack: [
        { name: "Rust", iconSrc: "https://cdn.simpleicons.org/rust/fff" },
        { name: "PyO3" },
        { name: "html5ever" },
      ],
      image: {
        src: "/portfolio/images/markupever-showcase.png",
        alt: "markupever Example",
      },
      link: {
        label: "GitHub",
        href: "https://github.com/awolverp/markupever",
      },
    },
    {
      id: "heroai",
      name: "HeroAI",
      headline: "Unified AI Gateway API",
      tagline:
        "A production AI gateway over 162+ models behind OpenAI- and Gemini-compatible REST APIs.",
      description:
        "Built the HeroAI backend in FastAPI and SQLAlchemy: a production AI gateway over 162+ models (OpenAI, Gemini, Claude, DeepSeek, xAI).",
      highlights: [
        "Shipped OpenAI- and Gemini-compatible REST APIs so existing SDKs and apps integrate with little or no code changes.",
        "Implemented API key management, reseller APIs, org/team admin, enterprise data policies, and credit-based billing.",
        "Supported 14K+ users and 48M+ monthly API requests; used by WordPress plugins and third-party integrations.",
      ],
      type: "contract",
      role: "Backend Developer",
      startDate: "2024-12",
      endDate: null,
      metrics: [
        { value: "162+", label: "AI Models" },
        { value: "14K+", label: "Users" },
        { value: "48M+", label: "Monthly Requests" },
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
  ],
  resume: {
    pdfUrl: "/portfolio/resume.pdf",
    experience: [
      {
        startDate: "2023-08",
        endDate: null,
        role: "Open Source Developer",
        type: "Self-employed",
        company: null,
        description:
          "Author and maintain Rust libraries on PyPI through PyO3 and Maturin. cachebox is a thread-safe in-memory cache (428 GitHub stars, 13M+ monthly downloads). markupever is an HTML and XML parser on html5ever (37 stars, 360K+ downloads). rapidquery is a SQL query builder on SeaQuery.",
      },
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
        role: "Backend Engineer",
        type: "Freelance",
        company: null,
        description:
          "Deliver independent freelance products: FastAPI and Actix Web backends. Ship a TanStack Start or Next.js interface when the product needs more than an API.",
      },
    ],
    skills: [
      {
        category: "Languages",
        items: [
          {
            name: "Rust",
            iconSrc: "https://cdn.simpleicons.org/rust/fff",
            journeys: ["rust"],
          },
          {
            name: "Python",
            iconSrc: "https://cdn.simpleicons.org/python/3776AB",
            journeys: ["full-stack"],
          },
          {
            name: "TypeScript",
            iconSrc: "https://cdn.simpleicons.org/typescript/3178C6",
            journeys: ["full-stack"],
          },
          { name: "TypeSpec" },
          { name: "SQL" },
        ],
      },
      {
        category: "Frameworks",
        items: [
          {
            name: "Actix Web",
            iconSrc: "https://cdn.simpleicons.org/actix/fff",
            journeys: ["rust"],
          },
          { name: "Axum" },
          {
            name: "FastAPI",
            iconSrc: "https://cdn.simpleicons.org/fastapi/009688",
            journeys: ["full-stack"],
          },
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
          { name: "Maturin", journeys: ["rust"] },
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
          { name: "html5ever", journeys: ["rust"] },
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
