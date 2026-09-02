import { education } from "#/components/resume/data";
import { ResumeSection } from "#/components/resume/section";
import { formatPeriod } from "#/lib/date";
import { Chip } from "../ui/chip";

export function ResumeEducation() {
	return (
		<ResumeSection title="Education">
			<ul className="flex flex-col gap-8">
				{education.map((item) => (
					<EducationItem key={`${item.school}-${item.startDate}`} {...item} />
				))}
			</ul>
		</ResumeSection>
	);
}

function EducationItem(props: (typeof education)[number]) {
	return (
		<div className="relative pl-4">
			<span
				aria-hidden
				className="absolute top-1.5 left-0 size-1.5 rounded-full bg-foreground"
			/>
			<p className="text-sm text-muted-foreground">
				{formatPeriod(props.startDate, props.endDate)}
			</p>
			<p className="text-sm text-muted-foreground">{props.school}</p>
			<div className="flex gap-2 items-center">
				<p className="font-semibold text-lg">{props.field}</p>
				<Chip size="sm" variant="secondary">
					{props.degree}'s Degree
				</Chip>
			</div>
		</div>
	);
}
