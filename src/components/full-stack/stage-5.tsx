import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CopyReveal } from "#/components/ui/copy-reveal";
import { MountainChart } from "#/components/ui/mountain-chart";
import { Stage } from "#/components/ui/stage";
import { useHomeScroll } from "#/lib/home-scroll";

export function IntegrateAndShipStage() {
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
					<Stage.Title>Integrate, Test & Ship</Stage.Title>
					<Stage.Description>
						Connect everything, run end-to-end tests, fix issues, and deploy
						with monitoring. Deliver a relaible, production-ready product.
					</Stage.Description>
				</CopyReveal>
			</Stage.Part>

			<m.div
				className="absolute bottom-0 inset-0"
				style={reduce ? undefined : { y }}
			>
				<MountainChart />
			</m.div>
		</Stage.Root>
	);
}
