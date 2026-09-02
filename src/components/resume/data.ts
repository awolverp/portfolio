function icon(slug: string, hex: string) {
	return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

export const profile = {
	name: "Ali Pooralijan",
	email: "awolverp@gmail.com",
	jobTitle: "Full-Stack Web & Rust Developer",
};

export const socials = [
	{
		name: "X",
		handle: "@awolverp",
		href: "https://x.com/awolverp",
		iconSrc: icon("x", "fff"),
	},
	{
		name: "Telegram",
		handle: "@awolverp",
		href: "https://t.me/awolverp",
		iconSrc: icon("telegram", "26A5E4"),
	},
	{
		name: "Github",
		handle: "github.com/awolverp",
		href: "https://github.com/awolverp",
		iconSrc: icon("github", "fff"),
	},
	{
		name: "LinkedIn",
		handle: "linkedin.com/in/ali-pooralijan-awolverp",
		href: "https://www.linkedin.com/in/ali-pooralijan-awolverp",
		iconSrc: icon("linkedin", "0A66C2"),
	},
] as const;

export const experience = [
	{
		startDate: "2023-07",
		endDate: null,
		role: "Backend Developer",
		type: "Contract",
		company: "Private Company",
		description:
			"Contract backend engineer for a private company group (parent + subsidiaries; names under NDA). Not a full-time employee. I design and ship production APIs and data services",
	},
	{
		startDate: "2025-07",
		endDate: null,
		role: "Full-Stack Engineer",
		type: "Freelance",
		company: null,
		description: "Independent full-stack work on freelance builds.",
	},
	{
		startDate: "2023-07",
		endDate: null,
		role: "Open Source Maintainer",
		type: "Self-Employed",
		company: null,
		description:
			"Side work. Author of Rust-backed Python libraries on PyPI (PyO3).",
	},
] as const;

export type SkillItem = {
	name: string;
	slug: string;
	hex: string;
};

export const skillGroups: { category: string; items: SkillItem[] }[] = [
	{
		category: "Languages",
		items: [
			{ name: "Python", slug: "python", hex: "3776AB" },
			{ name: "Rust", slug: "rust", hex: "fff" },
			{ name: "TypeScript", slug: "typescript", hex: "3178C6" },
			{ name: "Golang", slug: "go", hex: "00ADD8" },
			{ name: "SQL", slug: "sql", hex: "fff" },
		],
	},
	{
		category: "Frameworks",
		items: [
			{ name: "FastAPI", slug: "fastapi", hex: "009688" },
			{ name: "SQLAlchemy", slug: "sqlalchemy", hex: "D71F00" },
			{ name: "Actix Web", slug: "actix", hex: "fff" },
			{ name: "Axum", slug: "axum", hex: "fff" },
			{ name: "React", slug: "react", hex: "61DAFB" },
			{ name: "Next.js", slug: "nextdotjs", hex: "fff" },
			{ name: "Tanstack Start", slug: "tanstack", hex: "EAB308" },
			{ name: "Go Fiber", slug: "fiber", hex: "00ACD7" },
			{ name: "Go Bun", slug: "bun", hex: "fff" },
		],
	},
	{
		category: "Developer Tools",
		items: [
			{ name: "Git", slug: "git", hex: "F05032" },
			{ name: "Github Actions", slug: "githubactions", hex: "2088FF" },
			{ name: "Docker", slug: "docker", hex: "2496ED" },
			{ name: "Nginx", slug: "nginx", hex: "009639" },
			{ name: "Orval", slug: "orval", hex: "fff" },
		],
	},
	{
		category: "Databases",
		items: [
			{ name: "PostgreSQL", slug: "postgresql", hex: "4169E1" },
			{ name: "Redis", slug: "redis", hex: "FF4438" },
			{ name: "MongoDB", slug: "mongodb", hex: "47A248" },
		],
	},
	{
		category: "Libraries",
		items: [
			{ name: "PyO3", slug: "pyo3", hex: "fff" },
			{ name: "Tokio", slug: "tokio", hex: "fff" },
			{ name: "html5ever", slug: "html5ever", hex: "fff" },
		],
	},
];

export const tools = [
	{
		name: "Zed",
		caption: "Code Editor",
		src: "/tools/zed.png",
	},
	{
		name: "Github",
		caption: "Code Hosting Platform",
		src: "/tools/github.png",
	},
	{
		name: "Figma",
		caption: "Collaborative Design Platform",
		src: "/tools/figma.png",
	},
	{
		name: "VS Code",
		caption: "Code Editor",
		src: "/tools/vscode.png",
	},
	{
		name: "Yaak",
		caption: "API Testing Tool",
		src: "/tools/yaak.png",
	},
	{
		name: "APIDog",
		caption: "API Design Tool",
		src: "/tools/apidog.png",
	},
	{
		name: "Grok Build",
		caption: "Coding Agent",
		src: "/tools/grok-build.png",
	},
] as const;

export function skillIconSrc(item: SkillItem) {
	return icon(item.slug, item.hex);
}
