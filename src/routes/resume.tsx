import { createFileRoute } from "@tanstack/react-router";
import { m } from "motion/react";

import { profile, socials } from "#/components/resume/data";
import { ResumeEducation } from "#/components/resume/education";
import { ResumeExperience } from "#/components/resume/experience";
import { ResumeSidebar } from "#/components/resume/sidebar";
import { ResumeSkills } from "#/components/resume/skills";
import { ResumeTools } from "#/components/resume/tools";

const PAGE_TITLE = "Resume | A.Wolver.P";
const PAGE_DESCRIPTION =
	"Resume of Ali Pooralijan (A.Wolver.P), software engineer focused on performance, scalable systems, and modern web applications.";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	alternateName: "A.Wolver.P",
	jobTitle: profile.jobTitle,
	email: profile.email,
	url: "https://awolverp.dev/resume",
	sameAs: socials.map((social) => social.href),
};

export const Route = createFileRoute("/resume")({
	head: () => ({
		meta: [
			{ title: PAGE_TITLE },
			{ name: "description", content: PAGE_DESCRIPTION },
			{ property: "og:title", content: PAGE_TITLE },
			{ property: "og:description", content: PAGE_DESCRIPTION },
			{ property: "og:type", content: "profile" },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(jsonLd),
			},
		],
	}),
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
