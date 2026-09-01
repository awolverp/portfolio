import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProjectsHero } from "#/components/projects-hero";
import { chipVariants } from "#/components/ui/chip";
import {
	ProjectItem,
	type ProjectItemProps,
	type ProjectType,
	projectTypeLabel,
} from "#/components/ui/project-item";

const PAGE_TITLE = "Projects | A.Wolver.P";
const PAGE_DESCRIPTION =
	"Selected software projects by Ali Pooralijan (A.Wolver.P): high-performance backends, full-stack systems, and production APIs.";

const heroAiStack = [
	{
		name: "Python",
		iconSrc: "https://cdn.simpleicons.org/python/3776AB",
	},
	{
		name: "FastAPI",
		iconSrc: "https://cdn.simpleicons.org/fastapi/009688",
	},
	{
		name: "Redis",
		iconSrc: "https://cdn.simpleicons.org/redis/FF4438",
	},
	{
		name: "PostgreSQL",
		iconSrc: "https://cdn.simpleicons.org/postgresql/4169E1",
	},
	{
		name: "MongoDB",
		iconSrc: "https://cdn.simpleicons.org/mongodb/47A248",
	},
	{
		name: "Amazon S3",
		iconSrc: "https://cdn.simpleicons.org/amazons3/569A31",
	},
	{
		name: "Sentry",
		iconSrc: "https://cdn.simpleicons.org/sentry/fff",
	},
];

const heroAi: ProjectItemProps = {
	name: "HeroAI",
	headline: "Unified AI Gateway API",
	tagline: "One OpenAI-compatible API for every model you need to ship.",
	description:
		"A production-grade gateway that unifies OpenAI, Anthropic, Gemini, DeepSeek, and xAI behind one URL, one auth scheme, and one SDK. Swap models with a single name change.",
	highlights: [
		"One URL, one auth scheme, one SDK across OpenAI, Anthropic, Gemini, DeepSeek, and xAI",
		"Chat, media, embeddings, batch, and Gemini-native endpoints in production",
		"Iran-accessible mirror for clients who cannot hit upstream APIs",
	],
	type: "contract",
	role: "Backend Developer",
	startDate: "2023-07",
	endDate: null,
	stats: [
		{ value: "+1k", label: "Request/Min" },
		{ value: "+100k", label: "Users" },
		{ value: "+158", label: "AI Models" },
	],
	stack: heroAiStack,
	image: {
		src: "/images/heroai_image.png",
		alt: "HeroAI dashboard",
	},
	liveUrl: "https://api.heroai.ir/docs",
};

const projects: Array<ProjectItemProps & { id: string }> = [
	{ id: "heroai", ...heroAi },
	{ id: "heroai-alt", ...heroAi },
];

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Selected Projects",
	description: PAGE_DESCRIPTION,
	author: {
		"@type": "Person",
		name: "Ali Pooralijan",
		alternateName: "A.Wolver.P",
	},
	mainEntity: {
		"@type": "ItemList",
		itemListElement: projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: `${project.name} | ${project.headline}`,
		})),
	},
};

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [
			{
				title: PAGE_TITLE,
			},
			{
				name: "description",
				content: PAGE_DESCRIPTION,
			},
			{ property: "og:title", content: PAGE_TITLE },
			{ property: "og:description", content: PAGE_DESCRIPTION },
			{ property: "og:type", content: "website" },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(jsonLd),
			},
		],
	}),
	component: Projects,
});

function Projects() {
	return (
		<>
			<ProjectsHero />
			<ProjectList projects={projects} />
		</>
	);
}

function ProjectList({
	projects,
}: {
	projects: Array<ProjectItemProps & { id: string }>;
}) {
	const types = useMemo(
		() => [...new Set(projects.map((project) => project.type))],
		[projects],
	);
	const [filter, setFilter] = useState<ProjectType | "all">("all");
	const visible =
		filter === "all"
			? projects
			: projects.filter((project) => project.type === filter);

	return (
		<div className="mx-auto container px-4 py-16 md:px-6 space-y-10">
			{types.length > 1 && (
				<div className="flex flex-wrap items-center justify-center gap-2">
					<FilterChip
						active={filter === "all"}
						onClick={() => setFilter("all")}
					>
						All
					</FilterChip>
					{types.map((type) => (
						<FilterChip
							key={type}
							active={filter === type}
							onClick={() => setFilter(type)}
						>
							{projectTypeLabel(type)}
						</FilterChip>
					))}
				</div>
			)}

			<section className="space-y-40">
				{visible.map((project) => {
					const { id, ...item } = project;
					return <ProjectItem key={id} {...item} />;
				})}
			</section>
		</div>
	);
}

function FilterChip({
	active,
	onClick,
	children,
}: {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={chipVariants({
				variant: active ? "accent" : "outline",
			})}
		>
			{children}
		</button>
	);
}
