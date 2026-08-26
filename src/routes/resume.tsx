import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resume")({ component: HomeComponent });

function HomeComponent() {
	return <p>Resume</p>;
}
