import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "#/lib/page-meta";

export const Route = createFileRoute("/_public/projects")({
	component: Projects,
});

function Projects() {
	usePageMeta("/projects");

	return <p className="text-accent-400">Projects</p>;
}
