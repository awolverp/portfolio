import { tools } from "#/components/resume/data";
import { ResumeSection } from "#/components/resume/section";
import { cn } from "#/lib/styles";

export function ResumeTools() {
	return (
		<ResumeSection title="Tools">
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
				{tools.map((tool, index) => (
					<li
						key={tool.name}
						className={cn(index < 3 ? "lg:col-span-4" : "lg:col-span-3")}
					>
						<ToolCard {...tool} />
					</li>
				))}
			</ul>
		</ResumeSection>
	);
}

function ToolCard({ name, caption, src }: (typeof tools)[number]) {
	return (
		<div className="group/tool-card flex h-full flex-col items-center rounded-xl border border-border bg-surface px-4 py-8 text-center transition-all duration-150 hover:shadow-xl hover:scale-105">
			<StackedLogo src={src} alt="" />
			<p className="mt-4 font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{caption}</p>
		</div>
	);
}

const stackedLogoStyle = cn(
	"absolute p-2 border-2 border-border bg-surface size-16 rounded-lg",
	"-translate-y-1/2 transition-all duration-150",
	"group-hover/tool-card:border-accent-800 group-hover/tool-card:-translate-y-[calc(50%+0.5rem)]",
);

function StackedLogo({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative h-16 w-28">
			<div
				aria-hidden
				className={cn(
					stackedLogoStyle,
					"top-1/2 -left-1 size-16 -rotate-12 opacity-40 group-hover/tool-card:-left-3 group-hover/tool-card:-rotate-18",
				)}
			>
				<img src={src} alt="" className="size-full rounded-lg object-cover" />
			</div>

			<div
				className={cn(
					stackedLogoStyle,
					"top-1/2 left-1/2 z-10 size-18 -translate-x-1/2",
				)}
			>
				<img
					src={src}
					alt={alt}
					className="size-full rounded-lg object-cover"
				/>
			</div>

			<div
				aria-hidden
				className={cn(
					stackedLogoStyle,
					"top-1/2 -right-1 size-16 rotate-12 opacity-40 group-hover/tool-card:-right-3 group-hover/tool-card:rotate-18",
				)}
			>
				<img src={src} alt="" className="size-full rounded-lg object-cover" />
			</div>
		</div>
	);
}
