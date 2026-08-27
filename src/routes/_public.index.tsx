import { createFileRoute } from "@tanstack/react-router";

import { InspectRequirementsStage } from "#/components/home/full-stack/inspect-requirements-stage";
import { IntroduceStage } from "#/components/home/full-stack/introduce-stage";
import { Hero } from "#/components/home/hero";

export const Route = createFileRoute("/_public/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<>
			<Hero />
			<IntroduceStage />
			<InspectRequirementsStage />
		</>
	);
}
