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
import { Fragment } from "react";
import { Chip } from "#/components/ui/chip";
import { Stage } from "#/components/ui/stage";
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
	return (
		<Stage.Root>
			<Stage.FullWidthPart className="flex items-end justify-center">
				<ParallelBadge />
			</Stage.FullWidthPart>

			<Stage.Part>
				<Stage.SmallText>STAGE 4/5</Stage.SmallText>
				<Stage.Title>Build Backend & Frontend</Stage.Title>
				<Stage.Description>
					Develop backend APIs/logic and frontend UI/state management at the
					same time, guided by the agreed contract. This keeps velocity high
					while staying aligned.
				</Stage.Description>
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
			<ZapIcon className="size-4 text-yellow-400" />
			Building in parallel
		</Chip>
	);
}

function BuildFlow() {
	return (
		<div className="flex items-center">
			{steps.map((step, index) => (
				<Fragment key={step.name}>
					{index > 0 && (
						<FlowArrow
							line={connectors[index - 1].line}
							head={connectors[index - 1].head}
						/>
					)}
					<StepBox icon={step.icon} tone={step.tone} />
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
}: {
	icon: LucideIcon;
	tone: (typeof steps)[number]["tone"];
}) {
	return (
		<span className={boxVariants({ tone })}>
			<Icon strokeWidth={1.5} />
		</span>
	);
}

function FlowArrow({ line, head }: { line: string; head: string }) {
	return (
		<span className="flex items-center h-6 w-10 sm:w-16 md:w-24">
			<span className={defineClassName("h-0.5 w-auto flex-1", line)} />
			<ChevronRightIcon
				className={defineClassName("size-5 shrink-0", head)}
				strokeWidth={2}
			/>
		</span>
	);
}
