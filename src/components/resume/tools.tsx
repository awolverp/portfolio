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
		<div className="flex h-full flex-col items-center rounded-xl border border-border bg-surface px-4 py-8 text-center">
			<StackedLogo src={src} alt="" />
			<p className="mt-4 font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{caption}</p>
		</div>
	);
}

function StackedLogo({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative h-16 w-28">
			<img
				src={src}
				alt=""
				aria-hidden
				className="absolute top-1/2 left-1 size-10 -translate-y-1/2 -rotate-12 rounded-lg opacity-40"
			/>
			<img
				src={src}
				alt={alt}
				className="absolute top-1/2 left-1/2 z-10 size-12 -translate-x-1/2 -translate-y-1/2 rounded-lg"
			/>
			<img
				src={src}
				alt=""
				aria-hidden
				className="absolute top-1/2 right-1 size-10 -translate-y-1/2 rotate-12 rounded-lg opacity-40"
			/>
		</div>
	);
}
