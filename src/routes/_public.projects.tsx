import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/projects")({
	head: () => ({
		meta: [
			{
				title: "Projects | A.Wolver.P",
			},
			{
				name: "description",
				content:
					"Selected software projects by Ali Pooralijan (A.Wolver.P): high-performance backends, full-stack systems, and production APIs.",
			},
		],
	}),
	component: Projects,
});

function Projects() {
	return <p className="text-accent-400">Projects</p>;
}
