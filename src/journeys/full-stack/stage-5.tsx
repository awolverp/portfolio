import { ClientOnly } from "@tanstack/react-router";
import { m } from "motion/react";
import { useRef } from "react";
import { Stage } from "#/components/stage";
import { MountainChart } from "#/components/ui/mountain-chart";

export function IntegrateAndShipStage() {
	const stageRef = useRef<HTMLElement>(null);

	return (
		<Stage.Root ref={stageRef}>
			<Stage.Content
				className="relative"
				label={5}
				title="Integrate, Test & Ship"
				description="Connect everything, run end-to-end tests, fix issues, and deploy with monitoring. Deliver a relaible, production-ready product."
			/>

			<m.div className="absolute bottom-0 inset-0 opacity-50">
				<ClientOnly>
					<MountainChart
						colors={{
							stroke: "--color-blue-400",
							fillTop: "--color-blue-600",
							fillMid: "--color-blue-800",
							light: "--color-blue-200",
							glow: "--color-blue-300",
						}}
					/>
				</ClientOnly>
			</m.div>
		</Stage.Root>
	);
}
