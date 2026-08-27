import {
	CircleAlert as CircleAlertIcon,
	ClipboardList as ClipboardListIcon,
	GitFork as GitForkIcon,
	type LucideIcon,
	Share2 as Share2Icon,
	Users as UsersIcon,
	Zap as ZapIcon,
} from "lucide-react";
import { Stage } from "#/components/ui/stage";
import { defineClassName } from "#/lib/styles";

const topics = [
	{ name: "Personas", icon: UsersIcon },
	{ name: "Find Edge cases", icon: CircleAlertIcon },
	{ name: "Requirements", icon: ClipboardListIcon },
	{ name: "Challenges", icon: Share2Icon },
	{ name: "Tech Stacks", icon: ZapIcon },
	{ name: "Flowcharts", icon: GitForkIcon },
] as const;

export function InspectRequirementsStage() {
	return (
		<Stage.Root linearOverlay>
			{topics.map((topic, index) => (
				<TopicChip
					key={topic.name}
					icon={topic.icon}
					name={topic.name}
					style={chipPosition(index, topics.length)}
				/>
			))}

			<Stage.Part>
				<Stage.SmallText>STAGE 1/5</Stage.SmallText>
				<Stage.Title>Inspect Requirements</Stage.Title>
				<Stage.Description>
					Analyze project goals, user stories, and constraints. Clarify details
					with stakeholders and turn business needs into clear technical
					requirements that keep scope focused.
				</Stage.Description>
			</Stage.Part>
		</Stage.Root>
	);
}

function chipPosition(index: number, count: number) {
	const start = (240 * Math.PI) / 180;
	const angle = start + (index * 2 * Math.PI) / count;

	return {
		left: `${50 + 38 * Math.cos(angle)}%`,
		top: `${50 + 32 * Math.sin(angle)}%`,
	};
}

const chipStyle = defineClassName(
	// position
	"absolute -translate-x-1/2 -translate-y-1/2 -z-10",
	// layout
	"inline-flex items-center gap-2 opacity-70",
	// border
	"rounded-full border-x-4 border-accent-800",
	// background
	"bg-surface",
	// spacing
	"h-16 px-5",
	// text
	"font-medium whitespace-nowrap",
	// svg children
	"[&_svg]:size-5 [&_svg]:shrink-0",
);

function TopicChip({
	name,
	icon: Icon,
	style,
}: {
	name: string;
	icon: LucideIcon;
	style: React.CSSProperties;
}) {
	return (
		<span className={chipStyle} style={style}>
			<Icon />
			{name}
		</span>
	);
}
