import { ArrowUpRightIcon } from "lucide-react";

import { buttonVariants } from "#/components/ui/button";
import { Chip } from "#/components/ui/chip";
import { cn } from "#/lib/styles";

export type ProjectType =
	| "contract"
	| "freelance"
	| "personal"
	| "open-source"
	| "full-time";

export type ProjectItemStat = {
	value: string;
	label: string;
};

export type ProjectItemStack = {
	name: string;
	iconSrc: string;
};

export type ProjectItemProps = {
	name: string;
	headline: string;
	tagline: string;
	description: string;
	highlights: string[];
	type: ProjectType;
	role: string;
	startDate: string;
	endDate: string | null;
	stats?: ProjectItemStat[];
	stack: ProjectItemStack[];
	image?: { src: string; alt: string };
	liveUrl?: string;
	githubUrl?: string;
	className?: string;
};

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
	contract: "Contract",
	freelance: "Freelance",
	personal: "Personal",
	"open-source": "Open source",
	"full-time": "Full-time",
};

export function projectTypeLabel(type: ProjectType): string {
	return PROJECT_TYPE_LABELS[type];
}

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	year: "numeric",
});

function parseYearMonth(value: string): { year: number; month: number } {
	const [year, month] = value.split("-").map(Number);
	return { year, month };
}

function formatYearMonth(value: string): string {
	const { year, month } = parseYearMonth(value);
	return monthYearFormatter.format(new Date(year, month - 1));
}

function formatPeriod(startDate: string, endDate: string | null): string {
	const start = formatYearMonth(startDate);
	const end = endDate ? formatYearMonth(endDate) : "Present";
	return `${start} – ${end}`;
}

function monthIndex(value: string): number {
	const { year, month } = parseYearMonth(value);
	return year * 12 + (month - 1);
}

function currentYearMonth(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function formatDuration(startDate: string, endDate: string | null): string {
	const start = monthIndex(startDate);
	const end = monthIndex(endDate ?? currentYearMonth());
	const total = Math.max(0, end - start);
	const years = Math.floor(total / 12);
	const months = total % 12;
	const parts: string[] = [];

	if (years > 0) {
		parts.push(`${years} ${years === 1 ? "year" : "years"}`);
	}
	if (months > 0) {
		parts.push(`${months} ${months === 1 ? "month" : "months"}`);
	}

	return parts.length > 0 ? parts.join(", ") : "Less than a month";
}

const rootStyle = cn(
	"relative flex flex-col gap-8",
	"lg:flex-row lg:items-start lg:gap-12",
);

const mediaStyle = cn(
	"w-full shrink-0 overflow-hidden rounded-lg border border-border bg-surface",
	"aspect-video",
	"lg:w-[min(100%,28rem)] lg:sticky lg:top-40",
);

export function ProjectItem({
	name,
	headline,
	tagline,
	description,
	highlights,
	type,
	role,
	startDate,
	endDate,
	stats,
	stack,
	image,
	liveUrl,
	githubUrl,
	className,
}: ProjectItemProps) {
	return (
		<article className={cn(rootStyle, className)}>
			{image && (
				<div className={mediaStyle}>
					<img
						src={image.src}
						alt={image.alt}
						className="size-full object-cover"
					/>
				</div>
			)}

			<div className="flex min-w-0 flex-1 flex-col gap-10">
				<div className="flex min-w-0 flex-1 flex-col gap-4">
					<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
						<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
							{name} | {headline}
						</h2>
						<p className="shrink-0 text-sm text-muted-foreground sm:pt-1.5">
							{formatPeriod(startDate, endDate)}
						</p>
					</div>

					<p>{tagline}</p>

					<div className="flex flex-wrap items-center gap-2">
						<Chip variant="outline">{projectTypeLabel(type)}</Chip>
						<Chip>{role}</Chip>
						<p className="text-sm text-muted-foreground">
							{formatDuration(startDate, endDate)}
						</p>
					</div>

					{stats && stats.length > 0 && (
						<div className="flex gap-3 w-full">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="flex-1 rounded-lg bg-surface px-4 py-6 text-center border border-border"
								>
									<p className="text-lg font-medium">{stat.value}</p>
									<p className="text-sm text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>
					)}

					<p>{description}</p>

					{highlights.length > 0 && (
						<ul className="list-disc space-y-1 pl-5">
							{highlights.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					)}

					{stack.length > 0 && (
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
					)}
				</div>

				{(liveUrl || githubUrl) && (
					<div className="flex flex-wrap items-center gap-2">
						{liveUrl && (
							<a
								href={liveUrl}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({ size: "lg" })}
							>
								<ArrowUpRightIcon />
								Live Site
							</a>
						)}
						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({ variant: "ghost" })}
							>
								<img src="/icons/github.svg" alt="" className="size-4" />
								Github
							</a>
						)}
					</div>
				)}
			</div>
		</article>
	);
}
