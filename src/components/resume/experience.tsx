import { experience } from "#/components/resume/data";
import { ResumeSection } from "#/components/resume/section";
import { formatPeriod } from "#/lib/date";

export function ResumeExperience() {
	return (
		<ResumeSection title="Experience">
			<ul className="flex flex-col gap-8">
				{experience.map((item) => (
					<ExperienceItem key={`${item.role}-${item.startDate}`} {...item} />
				))}
			</ul>
		</ResumeSection>
	);
}

function ExperienceItem({
	startDate,
	endDate,
	role,
	type,
	company,
	description,
}: (typeof experience)[number]) {
	return (
		<li className="grid gap-3 md:grid-cols-[16rem_1fr] md:gap-8">
			<div className="relative pl-4">
				<span
					aria-hidden
					className="absolute top-1.5 left-0 size-1.5 rounded-full bg-foreground"
				/>
				<p className="text-sm text-muted-foreground">
					{formatPeriod(startDate, endDate)}
				</p>
				<p className="text-sm text-muted-foreground">
					{role} - {type}
				</p>
				{company && <p className="font-semibold text-lg">{company}</p>}
			</div>
			<p>{description}</p>
		</li>
	);
}
