import { cn } from "#/lib/styles";

type ResumeSectionProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
};

export function ResumeSection({
	title,
	children,
	className,
}: ResumeSectionProps) {
	return (
		<section className={cn("relative", className)}>
			<div className="mb-6 flex items-center gap-3">
				<span
					aria-hidden
					className="absolute top-1.5 -left-10 size-3 rounded-full bg-accent-600 ring-4 ring-background"
				/>
				<h2 className="text-xl font-bold md:text-2xl">{title}</h2>
			</div>
			{children}
		</section>
	);
}
