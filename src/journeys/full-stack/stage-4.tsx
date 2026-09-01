import { cva } from "class-variance-authority";
import {
	ChevronRightIcon,
	CodeIcon,
	DatabaseIcon,
	GitBranchIcon,
	type LucideIcon,
	ShieldIcon,
	ZapIcon,
} from "lucide-react";
import { m } from "motion/react";
import { Fragment } from "react";
import { Stage } from "#/components/stage";
import { Chip } from "#/components/ui/chip";
import { easeOutExpo, viewportOnceMotion } from "#/lib/motion";
import { cn } from "#/lib/styles";

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
			<Stage.Layer position="top" className="flex items-end justify-center">
				<m.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnceMotion}
					transition={{ duration: 0.45, ease: easeOutExpo }}
				>
					<Chip font="mono">
						<ZapIcon className="size-4 text-yellow-400 animate-pulse" />
						Building in parallel
					</Chip>
				</m.div>
			</Stage.Layer>

			<Stage.Content
				label={4}
				title="Build Backend & Frontend"
				description="Develop backend APIs/logic and frontend UI/state management at the same time, guided by the agreed contract. This keeps velocity high while staying aligned."
			/>

			<Stage.Layer
				position="bottom"
				className="flex w-full items-start justify-center px-4 mt-10"
			>
				<BuildFlow />
			</Stage.Layer>
		</Stage.Root>
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
							delay={0.12 * index}
						/>
					)}
					<StepBox icon={step.icon} tone={step.tone} delay={0.12 * index} />
				</Fragment>
			))}
		</div>
	);
}

const boxVariants = cva(
	cn(
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
}: {
	icon: LucideIcon;
	tone: (typeof steps)[number]["tone"];
	delay: number;
}) {
	return (
		<m.span
			className={boxVariants({ tone })}
			initial={{ opacity: 0, scale: 0.6 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={viewportOnceMotion}
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
}: {
	line: string;
	head: string;
	delay: number;
}) {
	return (
		<span className="flex items-center h-6 w-10 sm:w-16 md:w-24">
			<m.span
				className={cn("h-0.5 w-auto flex-1 origin-left", line)}
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={viewportOnceMotion}
				transition={{ delay, duration: 0.35, ease: easeOutExpo }}
			/>
			<m.span
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={viewportOnceMotion}
				transition={{ delay: delay + 0.2, duration: 0.25 }}
			>
				<ChevronRightIcon
					className={cn("size-5 shrink-0", head)}
					strokeWidth={2}
				/>
			</m.span>
		</span>
	);
}
