import { createFileRoute } from "@tanstack/react-router";
import { m } from "motion/react";

import { ProjectsHero } from "#/components/projects-hero";
import {
	ProjectItem,
	type ProjectItemProps,
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
	startDate: new Date(2023, 7),
	endDate: null,
	metrics: [
		{ value: "+1k", label: "Request/Min" },
		{ value: "+100k", label: "Users" },
		{ value: "+158", label: "AI Models" },
	],
	stack: heroAiStack,
	image: {
		src: "/images/heroai_image.png",
		alt: "HeroAI dashboard",
	},
	link: { label: "Live", href: "https://api.heroai.ir/docs" },
};

const projects: Array<ProjectItemProps & { id: string }> = [
	{ id: "heroai", ...heroAi },
	{ id: "heroai-alt", ...heroAi },
];

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
	}),
	component: Projects,
});

function Projects() {
	return (
		<>
			<ProjectsHero />

			<section className="container space-y-40 mb-40">
				{projects.map((project) => (
					<m.div
						key={project.id}
						initial={{ opacity: 0.3, y: "1rem", scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ amount: 0.4 }}
					>
						<ProjectItem {...project} />
					</m.div>
				))}
			</section>
		</>
	);
}
