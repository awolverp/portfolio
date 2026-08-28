import {
	BoxIcon,
	GaugeIcon,
	SearchIcon,
	TargetIcon,
	TriangleAlertIcon,
	ZapIcon,
} from "lucide-react";
import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Chip } from "#/components/ui/chip";
import { CopyReveal } from "#/components/ui/copy-reveal";
import { Stage } from "#/components/ui/stage";
import { viewportOnce } from "#/lib/motion";

const topics = [
	{ name: "Performance Goals", Icon: GaugeIcon },
	{ name: "Critical Path", Icon: TargetIcon },
	{ name: "Fast Prototype", Icon: ZapIcon },
	{ name: "Risk Areas", Icon: TriangleAlertIcon },
	{ name: "Constraints", Icon: SearchIcon },
	{ name: "Minimal Core", Icon: BoxIcon },
] as const;

export function SpikeTheCoreStage() {
	return (
		<Stage.Root>
			{topics.map((topic, index) => (
				<TopicChip
					key={topic.name}
					index={index}
					count={topics.length}
					name={topic.name}
					Icon={topic.Icon}
				/>
			))}

			<Stage.Part>
				<CopyReveal>
					<Stage.SmallText>STAGE 1/5</Stage.SmallText>
					<Stage.Title>Spike the Core</Stage.Title>
					<Stage.Description>
						Start from the most critical part of the problem. Build a small,
						focused prototype to reveal the real constraints and possible
						directions.
					</Stage.Description>
				</CopyReveal>
			</Stage.Part>
		</Stage.Root>
	);
}

function chipPosition(index: number, count: number) {
	const start = (150 * Math.PI) / 180;
	const angle = start + (index * 2 * Math.PI) / count;

	return {
		left: `${50 + 30 * Math.cos(angle)}%`,
		top: `${50 + 40 * Math.sin(angle)}%`,
	};
}

function TopicChip({
	index,
	count,
	name,
	Icon,
}: {
	index: number;
	count: number;
	name: string;
	Icon: (typeof topics)[number]["Icon"];
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, viewportOnce);
	const reduce = useReducedMotion();
	const pos = chipPosition(index, count);

	return (
		<m.span
			ref={ref}
			className="group/topic-chip absolute -translate-x-1/2 -translate-y-1/2 z-20"
			initial={
				reduce ? false : { left: "50%", top: "50%", scale: 0.6, opacity: 0 }
			}
			animate={
				inView || reduce
					? { left: pos.left, top: pos.top, scale: 1, opacity: 0.8 }
					: { left: "50%", top: "50%", scale: 0.6, opacity: 0 }
			}
			transition={{
				type: "spring",
				stiffness: 80,
				damping: 16,
				delay: reduce ? 0 : 0.08 * index,
			}}
		>
			<m.span
				animate={reduce || !inView ? undefined : { y: [0, -8, 0] }}
				transition={{
					delay: 0.7 + index * 0.12,
					duration: 4 + index * 0.25,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<Chip
					variant="topic"
					className="transition-transform duration-150 group-hover/topic-chip:scale-110"
				>
					<Icon />
					{name}
				</Chip>
			</m.span>
		</m.span>
	);
}
