import {
	DatabaseIcon,
	FileTextIcon,
	type LucideIcon,
	Share2Icon,
} from "lucide-react";
import { Stage } from "#/components/ui/stage";
import { defineClassName } from "#/lib/styles";

const nodes = [
	{ title: "Logical", Icon: DatabaseIcon },
	{ title: "Conceptual", Icon: Share2Icon },
	{ title: "Physical", Icon: FileTextIcon },
] as const satisfies ReadonlyArray<{
	title: string;
	Icon: LucideIcon;
}>;

export function ModelWithTypesStage() {
	return (
		<Stage.Root>
			<Stage.FullWidthPart />
			<Stage.Part className="gap-0">
				<div className="flex flex-col items-center gap-4">
					<Stage.SmallText>STAGE 2/5</Stage.SmallText>
					<Stage.Title>Model with Types</Stage.Title>
					<Stage.Description>
						Capture the domain using Rust's type system, ownership, and
						lifetimes. Data structures and safety rules gradually take shape
						through precise modeling.
					</Stage.Description>
				</div>
			</Stage.Part>

			<Stage.FullWidthPart className="flex flex-col items-center justify-start">
				<ModelingTree />
			</Stage.FullWidthPart>
		</Stage.Root>
	);
}

function ModelingTree() {
	return (
		<div className="flex w-full max-w-3xl flex-col items-center px-4 pt-2">
			<span className="size-2.5 shrink-0 rounded-full bg-border" />
			<span className="h-8 w-px shrink-0 bg-border sm:h-10" />
			<div className="relative grid w-full grid-cols-3">
				<span className="absolute top-0 right-[calc(100%/6)] left-[calc(100%/6)] h-px bg-border" />
				{nodes.map((node) => (
					<div key={node.title} className="flex flex-col items-center mx-3">
						<span className="h-8 w-px shrink-0 bg-border sm:h-10" />
						<ModelingNode title={node.title} Icon={node.Icon} />
					</div>
				))}
			</div>
		</div>
	);
}

const nodeStyle = defineClassName(
	"flex items-center gap-2 sm:gap-3",
	"rounded-full border border-border bg-surface",
	"px-2.5 py-2 sm:px-4 sm:py-3",
);

function ModelingNode({ title, Icon }: { title: string; Icon: LucideIcon }) {
	return (
		<div className={nodeStyle}>
			<span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border sm:size-10">
				<Icon className="size-4 text-muted-foreground sm:size-5" />
			</span>
			<span className="text-left text-[11px] leading-tight sm:text-sm">
				<span className="block">{title}</span>
				<span className="block">Data Modeling</span>
			</span>
		</div>
	);
}
