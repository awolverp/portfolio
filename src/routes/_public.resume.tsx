import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/resume")({
	head: () => ({
		meta: [
			{
				title: "Resume | A.Wolver.P",
			},
			{
				name: "description",
				content:
					"Resume of Ali Pooralijan (A.Wolver.P), software engineer focused on performance, scalable systems, and modern web applications.",
			},
		],
	}),
	component: Resume,
});

function Resume() {
	return <p>Resume</p>;
}
