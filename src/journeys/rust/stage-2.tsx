import {
	DatabaseIcon,
	FileTextIcon,
	type LucideIcon,
	Share2Icon,
} from "lucide-react";
import { Stage } from "#/components/stage";
import { cn } from "#/lib/styles";

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
			<Stage.Content
				reveal={false}
				label={2}
				title="Model with Types"
				description="Capture the domain using Rust's type system, ownership, and lifetimes. Data structures and safety rules gradually take shape through precise modeling."
			/>

			<Stage.Layer
				position="bottom"
				className="flex flex-col items-center justify-start"
			>
				<ModelingTree />
			</Stage.Layer>
		</Stage.Root>
	);
}

function ModelingTree() {
	return (
		<div className="flex w-full max-w-3xl flex-col items-center px-4 pt-2">
			<span className="size-2.5 shrink-0 rounded-full bg-border" />
			<span className="h-8 w-px shrink-0 bg-border md:h-10" />

			<div className="relative grid w-full grid-cols-3">
				<span className="absolute top-0 right-[calc(100%/6)] left-[calc(100%/6)] h-px bg-border" />
				{nodes.map((node) => (
					<div key={node.title} className="flex flex-col items-center mx-3">
						<span className="h-8 w-px shrink-0 bg-border md:h-10" />
						<ModelingNode title={node.title} Icon={node.Icon} />
					</div>
				))}
			</div>
		</div>
	);
}

const nodeStyle = cn(
	"flex items-center gap-2 md:gap-3",
	"rounded-full border border-border bg-surface",
	"px-2.5 py-2 md:px-4 md:py-3",
);

function ModelingNode({ title, Icon }: { title: string; Icon: LucideIcon }) {
	return (
		<div className={nodeStyle}>
			<span className="hidden md:flex size-8 shrink-0 items-center justify-center rounded-full border border-border md:size-10">
				<Icon className="size-4 text-muted-foreground md:size-5" />
			</span>
			<span className="text-left leading-tight">
				<span className="block font-medium text-sm md:text-base">{title}</span>
				<span className="hidden font-light text-xs md:text-sm lg:block">
					Data Modeling
				</span>
			</span>
		</div>
	);
}
