import { IntroduceStage } from "./introduction";
import { InspectRequirementsStage } from "./stage-1";
import { DesignDatabaseStage } from "./stage-2";
import { DesignApiContractStage } from "./stage-3";
import { BuildBackendFrontendStage } from "./stage-4";
import { IntegrateAndShipStage } from "./stage-5";

export function FullStackJourney() {
	return (
		<>
			<IntroduceStage />
			<InspectRequirementsStage />
			<DesignDatabaseStage />
			<DesignApiContractStage />
			<BuildBackendFrontendStage />
			<IntegrateAndShipStage />
		</>
	);
}
