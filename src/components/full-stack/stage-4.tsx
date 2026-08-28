import { cva } from "class-variance-authority";
import {
	ChevronRight as ChevronRightIcon,
	Code as CodeIcon,
	Database as DatabaseIcon,
	GitBranch as GitBranchIcon,
	type LucideIcon,
	Shield as ShieldIcon,
	Zap as ZapIcon,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { Chip } from "#/components/ui/chip";
import { CopyReveal } from "#/components/ui/copy-reveal";
import { Stage } from "#/components/ui/stage";
import { easeOutExpo, viewportOnce } from "#/lib/motion";
import { defineClassName } from "#/lib/styles";

const steps = [
	{ name: "database", icon: DatabaseIcon, tone: "400" },
	{ name: "api", icon: GitBranchIcon, tone: "500" },
	{ name: "frontend", icon: CodeIcon, tone: "600" },
	{ name: "auth", icon: ShieldIcon, tone: "800" },
] as const satisfies ReadonlyArray<{
	name: string;
	icon: LucideIcon;
	tone: "400" | "500" | "600" | "800";
}>;

const connectors = [
	{
		line: "bg-linear-to-b from-accent-400 to-accent-500 sm:bg-linear-to-r",
		head: "text-accent-500",
	},
	{
		line: "bg-linear-to-b from-accent-500 to-accent-600 sm:bg-linear-to-r",
		head: "text-accent-600",
	},
	{
		line: "bg-linear-to-b from-accent-600 to-accent-800 sm:bg-linear-to-r",
		head: "text-accent-800",
	},
] as const;

export function BuildBackendFrontendStage() {
	const reduce = useReducedMotion();

	return (
		<Stage.Root>
			<Stage.FullWidthPart className="flex items-end justify-center">
				<m.div
					initial={reduce ? false : { opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ duration: 0.45, ease: easeOutExpo }}
				>
					<ParallelBadge />
				</m.div>
			</Stage.FullWidthPart>

			<Stage.Part>
				<CopyReveal>
					<Stage.SmallText>STAGE 4/5</Stage.SmallText>
					<Stage.Title>Build Backend & Frontend</Stage.Title>
					<Stage.Description>
						Develop backend APIs/logic and frontend UI/state management at the
						same time, guided by the agreed contract. This keeps velocity high
						while staying aligned.
					</Stage.Description>
				</CopyReveal>
			</Stage.Part>

			<Stage.FullWidthPart className="flex w-full items-start justify-center px-4 mt-10">
				<BuildFlow />
			</Stage.FullWidthPart>
		</Stage.Root>
	);
}

function ParallelBadge() {
	return (
		<Chip variant="mono">
			<ZapIcon className="size-4 text-yellow-400 animate-pulse" />
			Building in parallel
		</Chip>
	);
}

function BuildFlow() {
	const reduce = useReducedMotion();

	return (
		<div className="flex items-center">
			{steps.map((step, index) => (
				<Fragment key={step.name}>
					{index > 0 && (
						<FlowArrow
							line={connectors[index - 1].line}
							head={connectors[index - 1].head}
							delay={0.12 * index}
							reduce={!!reduce}
						/>
					)}
					<StepBox
						icon={step.icon}
						tone={step.tone}
						delay={0.12 * index}
						reduce={!!reduce}
					/>
				</Fragment>
			))}
		</div>
	);
}

const boxVariants = cva(
	defineClassName(
		// layout
		"flex size-14 sm:size-16 md:size-20 lg:size-24 shrink-0 items-center justify-center",
		// border
		"rounded-xl border-2",
		// background
		"bg-surface",
		// svg children
		"[&_svg]:size-8 sm:[&_svg]:size-10 md:[&_svg]:size-12",
	),
	{
		variants: {
			tone: {
				"400": "border-accent-400 text-accent-400",
				"500": "border-accent-500 text-accent-500",
				"600": "border-accent-600 text-accent-600",
				"800": "border-accent-800 text-accent-800",
			},
		},
	},
);

function StepBox({
	icon: Icon,
	tone,
	delay,
	reduce,
}: {
	icon: LucideIcon;
	tone: (typeof steps)[number]["tone"];
	delay: number;
	reduce: boolean;
}) {
	return (
		<m.span
			className={boxVariants({ tone })}
			initial={reduce ? false : { opacity: 0, scale: 0.6 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={viewportOnce}
			transition={{
				delay,
				type: "spring",
				stiffness: 220,
				damping: 18,
			}}
		>
			<Icon strokeWidth={1.5} />
		</m.span>
	);
}

function FlowArrow({
	line,
	head,
	delay,
	reduce,
}: {
	line: string;
	head: string;
	delay: number;
	reduce: boolean;
}) {
	return (
		<span className="flex items-center h-6 w-10 sm:w-16 md:w-24">
			<m.span
				className={defineClassName("h-0.5 w-auto flex-1 origin-left", line)}
				initial={reduce ? false : { scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={viewportOnce}
				transition={{ delay, duration: 0.35, ease: easeOutExpo }}
			/>
			<m.span
				initial={reduce ? false : { opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={viewportOnce}
				transition={{ delay: delay + 0.2, duration: 0.25 }}
			>
				<ChevronRightIcon
					className={defineClassName("size-5 shrink-0", head)}
					strokeWidth={2}
				/>
			</m.span>
		</span>
	);
}
