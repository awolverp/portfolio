import { createFileRoute } from "@tanstack/react-router";

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
		</>
	);
}
