import { ClientOnly } from "@tanstack/react-router";
import { m } from "motion/react";
import { useRef } from "react";
import { Stage } from "#/components/stage";
import { MountainChart } from "#/components/ui/mountain-chart";

export function BenchmarkAndShipStage() {
	const stageRef = useRef<HTMLElement>(null);

	return (
		<Stage.Root ref={stageRef}>
			<Stage.Content
				className="relative"
				label="STAGE 5/5"
				title="Benchmark, Refine & Ship"
				description="Profile, optimize bottlenecks, run rigorous tests including fuzzing, and deliver a reliable, production-ready system."
			/>

			<m.div className="absolute bottom-0 inset-0 opacity-50">
				<ClientOnly>
					<MountainChart
						colors={{
							stroke: "--color-red-400",
							fillTop: "--color-red-600",
							fillMid: "--color-red-800",
							light: "--color-red-200",
							glow: "--color-red-300",
						}}
					/>
				</ClientOnly>
			</m.div>
		</Stage.Root>
	);
}
