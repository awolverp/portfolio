import { z } from "zod";

export const journeys = ["full-stack", "rust"] as const;
export type Journey = (typeof journeys)[number];

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
	error: "Expected YYYY-MM",
});

const pageSeoSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
});

const socialSchema = z.object({
	name: z.string().min(1),
	handle: z.string().min(1),
	href: z.url(),
	iconSrc: z.string().min(1),
});

export const skillItemSchema = z.object({
	name: z.string().min(1),
	iconSrc: z.string().min(1).optional(),
	journeys: z.array(z.enum(journeys)).optional(),
});

const skillGroupSchema = z.object({
	category: z.string().min(1),
	items: z.array(skillItemSchema),
});

const experienceSchema = z.object({
	startDate: yearMonth,
	endDate: yearMonth.nullable(),
	role: z.string().min(1),
	type: z.string().min(1),
	company: z.string().min(1).nullable(),
	description: z.string().min(1),
});

const educationSchema = z.object({
	startDate: yearMonth,
	endDate: yearMonth.nullable(),
	school: z.string().min(1),
	degree: z.string().min(1),
	field: z.string().min(1),
});

const toolSchema = z.object({
	name: z.string().min(1),
	caption: z.string().min(1),
	src: z.string().min(1),
});

const projectTypeSchema = z.enum([
	"contract",
	"freelance",
	"personal",
	"open-source",
	"full-time",
]);

const projectSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	headline: z.string().min(1),
	tagline: z.string().min(1),
	description: z.string().min(1),
	highlights: z.array(z.string()).default([]),
	type: projectTypeSchema,
	role: z.string().min(1),
	startDate: yearMonth,
	endDate: yearMonth.nullable(),
	metrics: z
		.array(
			z.object({
				value: z.string().min(1),
				label: z.string().min(1),
			}),
		)
		.default([]),
	stack: z
		.array(
			z.object({
				name: z.string().min(1),
				iconSrc: z.string().min(1).optional(),
			}),
		)
		.default([]),
	image: z
		.object({
			src: z.string().min(1),
			alt: z.string().min(1),
		})
		.optional(),
	link: z
		.object({
			label: z.string().min(1),
			href: z.url(),
		})
		.optional(),
});

export const configSchema = z.object({
	site: z.object({
		url: z.url(),
		displayName: z.string().min(1),
		ogImage: z.string().min(1).optional(),
		keywords: z.string().min(1).optional(),
		twitter: z.string().min(1).optional(),
	}),
	profile: z.object({
		name: z.string().min(1),
		email: z.email(),
		jobTitle: z.string().min(1),
	}),
	hero: z.object({
		headline: z.string().min(1),
		tagline: z.string().min(1),
	}),
	socials: z.array(socialSchema),
	pages: z.object({
		home: pageSeoSchema,
		projects: pageSeoSchema,
		resume: pageSeoSchema,
	}),
	projects: z.array(projectSchema),
	resume: z.object({
		pdfUrl: z.string().min(1).optional(),
		experience: z.array(experienceSchema),
		skills: z.array(skillGroupSchema),
		tools: z.array(toolSchema),
		education: z.array(educationSchema),
	}),
});

export type Config = z.infer<typeof configSchema>;
export type SkillItem = z.infer<typeof skillItemSchema>;
export type Social = Config["socials"][number];
export type Project = Config["projects"][number];

export function parseConfig(raw: unknown): Config {
	return configSchema.parse(raw);
}

export function absoluteUrl(base: string, path = "/"): string {
	const origin = base.replace(/\/$/, "");
	if (!path || path === "/") return origin;
	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

const journeySkillsCache = new WeakMap<Config, Record<Journey, SkillItem[]>>();

export function selectSkillsForJourney(
	config: Config,
	journey: Journey,
): SkillItem[] {
	let cached = journeySkillsCache.get(config);
	if (!cached) {
		const items = config.resume.skills.flatMap((group) => group.items);
		cached = {
			"full-stack": items.filter((item) =>
				item.journeys?.includes("full-stack"),
			),
			rust: items.filter((item) => item.journeys?.includes("rust")),
		};
		journeySkillsCache.set(config, cached);
	}
	return cached[journey];
}
