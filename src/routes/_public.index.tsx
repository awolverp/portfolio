import { createFileRoute } from "@tanstack/react-router";
import { IntroduceStage } from "#/components/full-stack/introduce-stage";
import { InspectRequirementsStage } from "#/components/full-stack/stage-1";
import { DesignDatabaseStage } from "#/components/full-stack/stage-2";
import { DesignApiContractStage } from "#/components/full-stack/stage-3";
import { BuildBackendFrontendStage } from "#/components/full-stack/stage-4";
import { IntegrateAndShipStage } from "#/components/full-stack/stage-5";
import { Hero } from "#/components/hero";
import { usePageMeta } from "#/lib/page-meta";

export const Route = createFileRoute("/_public/")({
	component: Home,
});

function Home() {
	usePageMeta("/");

	return (
		<>
			<Hero />
			<IntroduceStage />
			<InspectRequirementsStage />
			<DesignDatabaseStage />
			<DesignApiContractStage />
			<BuildBackendFrontendStage />
			<IntegrateAndShipStage />
		</>
	);
}
