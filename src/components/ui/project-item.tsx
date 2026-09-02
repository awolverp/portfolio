import { CircleSmallIcon } from "lucide-react";
import { formatDuration, formatPeriod } from "#/lib/date";
import { cn } from "#/lib/styles";
import { ArrowLink } from "./arrow-link";
import { Chip } from "./chip";

export interface ProjectImageProps {
	src: string;
	alt: string;
	link?: { label: string; href: string };
}

const mediaStyle = cn(
	"w-full shrink-0 overflow-hidden rounded-lg border-2 border-border bg-surface aspect-video",
	"lg:w-[min(100%,36rem)] lg:sticky lg:top-40 shadow-2xl",
	"transition-transform duration-150 hover:scale-110",
);

function ProjectImage({ src, alt, link }: ProjectImageProps) {
	return (
		<div className={mediaStyle}>
			<img src={src} alt={alt} className="size-full object-cover" />

			{link && <ArrowLink {...link} className="absolute top-2 right-2" />}
		</div>
	);
}

export interface ProjectItemMetric {
	value: string;
	label: string;
}

function ProjectMetricList({ metrics }: { metrics: ProjectItemMetric[] }) {
	if (metrics.length < 1) return undefined;

	return (
		<div className="flex gap-2">
			{metrics.map((stat) => (
				<div
					key={stat.label}
					className="flex-1 rounded-lg bg-surface p-4 text-center border border-border"
				>
					<p className="text-lg font-medium">{stat.value}</p>
					<p className="text-sm text-muted-foreground">{stat.label}</p>
				</div>
			))}
		</div>
	);
}

export interface ProjectItemStack {
	name: string;
	iconSrc: string;
}

function ProjectStackList({ stack }: { stack: ProjectItemStack[] }) {
	if (stack.length < 1) return undefined;

	return (
		<ul className="flex flex-wrap gap-2">
			{stack.map((item) => (
				<li key={item.name}>
					<Chip>
						<img src={item.iconSrc} alt="" className="size-4" />
						{item.name}
					</Chip>
				</li>
			))}
		</ul>
	);
}

export type ProjectType =
	| "contract"
	| "freelance"
	| "personal"
	| "open-source"
	| "full-time";

export interface ProjectItemProps {
	name: string;
	headline: string;
	tagline: string;
	description: string;
	highlights?: string[];
	type: ProjectType;
	role: string;
	startDate: string | Date;
	endDate: string | Date | null;
	metrics?: ProjectItemMetric[];
	stack?: ProjectItemStack[];
	image?: Omit<ProjectImageProps, "link">;
	className?: string;
	link?: ProjectImageProps["link"];
}

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
	contract: "Contract",
	freelance: "Freelance",
	personal: "Personal",
	"open-source": "Open source",
	"full-time": "Full-time",
};

export function ProjectItem({ className, ...props }: ProjectItemProps) {
	return (
		<article
			className={cn(
				"relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 *:min-w-0",
				className,
			)}
			data-slot="project-item"
		>
			{/* Image */}
			{props.image && <ProjectImage link={props.link} {...props.image} />}

			{/* Content */}
			<div className="flex-1 flex flex-col gap-4">
				{/* Title + Period */}
				<div className="flex flex-wrap items-center justify-between">
					<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
						{props.name} | {props.headline}
					</h2>

					<p className="shrink-0 text-sm text-muted-foreground sm:pt-1.5">
						{formatPeriod(props.startDate, props.endDate)}
					</p>
				</div>

				{/* Tagline */}
				<p>{props.tagline}</p>

				<div className="flex items-center gap-2 *:text-sm *:text-muted-foreground">
					<p>{PROJECT_TYPE_LABELS[props.type]}</p>
					<CircleSmallIcon className="size-2" />
					<p>{props.role}</p>
					<CircleSmallIcon className="size-2" />
					<p>{formatDuration(props.startDate, props.endDate)}</p>
				</div>

				{/* Metrics */}
				{props.metrics && <ProjectMetricList metrics={props.metrics} />}

				{/* Description */}
				<p>{props.description}</p>

				{/* Highlights */}
				{props.highlights && props.highlights.length > 0 && (
					<ul className="list-disc space-y-1 pl-5">
						{props.highlights.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				)}

				{/* Stack */}
				{props.stack && <ProjectStackList stack={props.stack} />}
			</div>
		</article>
	);
}
