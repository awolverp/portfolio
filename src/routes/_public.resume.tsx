import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "#/lib/page-meta";

export const Route = createFileRoute("/_public/resume")({
	component: Resume,
});

function Resume() {
	usePageMeta("/resume");

	return <p>Resume</p>;
}
