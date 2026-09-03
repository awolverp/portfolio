import { createFileRoute } from "@tanstack/react-router";

import { ResumeEducation } from "#/components/resume/education";
import { ResumeExperience } from "#/components/resume/experience";
import { ResumeSidebar } from "#/components/resume/sidebar";
import { ResumeSkills } from "#/components/resume/skills";
import { ResumeTools } from "#/components/resume/tools";
import config, { absoluteUrl } from "#/lib/config";
import { personJsonLd, seo } from "#/lib/seo";

export const Route = createFileRoute("/resume")({
	head: () => {
		const { site, pages } = config;

		return seo({
			title: pages.resume.title,
			description: pages.resume.description,
			keywords: site.keywords,
			image: site.ogImage ? absoluteUrl(site.url, site.ogImage) : undefined,
			url: absoluteUrl(site.url, "/resume"),
			type: "profile",
			twitter: site.twitter,
			jsonLd: personJsonLd(config),
		});
	},
	component: Resume,
});

function Resume() {
	return (
		<main className="container grid gap-12 px-4 pt-24 pb-20 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
			<ResumeSidebar />
			<div className="relative pl-8">
				<ResumeExperience />
				<ResumeSkills />
				<ResumeTools />
				<ResumeEducation />
			</div>
		</main>
	);
}
