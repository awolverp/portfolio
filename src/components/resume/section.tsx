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
		<section
			className={cn("group/resume-section relative flex gap-4", className)}
		>
			<div>
				<span
					aria-hidden
					className="block size-4 rounded-full bg-accent-800 ring-4 ring-background translate-x-[-50%] translate-y-[50%]"
				/>
				<div className="h-full w-px bg-border transition-colors group-hover/resume-section:bg-accent-800" />
			</div>

			<div className="w-full pb-20">
				<h2 className="mb-6 text-xl font-bold md:text-2xl">{title}</h2>

				{children}
			</div>
		</section>
	);
}
