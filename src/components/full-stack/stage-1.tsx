import {
	CircleAlert as CircleAlertIcon,
	ClipboardList as ClipboardListIcon,
	GitFork as GitForkIcon,
	Share2 as Share2Icon,
	Users as UsersIcon,
	Zap as ZapIcon,
} from "lucide-react";
import { Chip } from "#/components/ui/chip";
import { Stage } from "#/components/ui/stage";

const topics = [
	{ name: "Personas", Icon: UsersIcon },
	{ name: "Find Edge cases", Icon: CircleAlertIcon },
	{ name: "Requirements", Icon: ClipboardListIcon },
	{ name: "Challenges", Icon: Share2Icon },
	{ name: "Tech Stacks", Icon: ZapIcon },
	{ name: "Flowcharts", Icon: GitForkIcon },
] as const;

export function InspectRequirementsStage() {
	return (
		<Stage.Root linearOverlay>
			{topics.map((topic, index) => (
				<Chip
					key={topic.name}
					variant="topic"
					className="absolute -translate-x-1/2 -translate-y-1/2 -z-10 opacity-80"
					style={chipPosition(index, topics.length)}
				>
					<topic.Icon />
					{topic.name}
				</Chip>
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
	const start = (100 * Math.PI) / 180;
	const angle = start + (index * 2 * Math.PI) / count;

	return {
		left: `${50 + 30 * Math.cos(angle)}%`,
		top: `${50 + 40 * Math.sin(angle)}%`,
	};
}
