import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CopyReveal } from "#/components/ui/copy-reveal";
import { MountainChart } from "#/components/ui/mountain-chart";
import { Stage } from "#/components/ui/stage";
import { useHomeScroll } from "#/lib/home-scroll";

const chartColors = {
	stroke: "--color-red-400",
	fillTop: "--color-red-600",
	fillMid: "--color-red-800",
	light: "--color-red-200",
	glow: "--color-red-300",
} as const;

export function BenchmarkAndShipStage() {
	const reduce = useReducedMotion();
	const sectionRef = useRef<HTMLElement>(null);
	const container = useHomeScroll();
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		container: container ?? undefined,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], [32, -32]);

	return (
		<Stage.Root ref={sectionRef}>
			<Stage.Part className="relative z-10">
				<CopyReveal>
					<Stage.SmallText>STAGE 5/5</Stage.SmallText>
					<Stage.Title>Benchmark, Refine & Ship</Stage.Title>
					<Stage.Description>
						Profile, optimize bottlenecks, run rigorous tests including fuzzing,
						and deliver a reliable, production-ready system.
					</Stage.Description>
				</CopyReveal>
			</Stage.Part>

			<m.div
				className="absolute bottom-0 inset-0"
				style={reduce ? undefined : { y }}
			>
				<MountainChart colors={chartColors} />
			</m.div>
		</Stage.Root>
	);
}
