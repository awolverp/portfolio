import { createFileRoute } from "@tanstack/react-router";
import { m } from "motion/react";

import { ProjectsHero } from "#/components/projects-hero";
import { ProjectItem } from "#/components/ui/project-item";
import { useConfig } from "#/hooks/config";
import { absoluteUrl } from "#/lib/config";
import { seo } from "#/lib/seo";
import { getConfig } from "#/server/config";

export const Route = createFileRoute("/projects")({
	loader: () => getConfig(),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const { site, pages } = loaderData;
		return seo({
			title: pages.projects.title,
			description: pages.projects.description,
			keywords: site.keywords,
			image: site.ogImage ? absoluteUrl(site.url, site.ogImage) : undefined,
			url: absoluteUrl(site.url, "/projects"),
			twitter: site.twitter,
		});
	},
	component: Projects,
});

function Projects() {
	const projects = useConfig((config) => config.projects);

	return (
		<>
			<ProjectsHero />

			<section className="container space-y-40 mb-40">
				{projects.map((project) => (
					<m.div
						key={project.id}
						initial={{ opacity: 0.3, y: "1rem" }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ amount: 0.4 }}
					>
						<ProjectItem {...project} />
					</m.div>
				))}
			</section>
		</>
	);
}
