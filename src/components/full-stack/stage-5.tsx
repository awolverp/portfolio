import { MountainChart } from "#/components/ui/mountain-chart";
import { Stage } from "#/components/ui/stage";

export function IntegrateAndShipStage() {
	return (
		<Stage.Root>
			<Stage.Part>
				<Stage.SmallText>STAGE 5/5</Stage.SmallText>
				<Stage.Title>Integrate, Test & Ship</Stage.Title>
				<Stage.Description>
					Connect everything, run end-to-end tests, fix issues, and deploy with
					monitoring. Deliver a relaible, production-ready product.
				</Stage.Description>
			</Stage.Part>

			<div className="absolute bottom-0 inset-0">
				<MountainChart />
			</div>
		</Stage.Root>
	);
}
