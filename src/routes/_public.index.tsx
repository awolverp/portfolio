import { createFileRoute } from "@tanstack/react-router";

import { BuildBackendFrontendStage } from "#/components/home/full-stack/build-backend-frontend-stage";
import { DesignApiContractStage } from "#/components/home/full-stack/design-api-contract-stage";
import { DesignDatabaseStage } from "#/components/home/full-stack/design-database-stage";
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
			<DesignDatabaseStage />
			<DesignApiContractStage />
			<BuildBackendFrontendStage />
		</>
	);
}
