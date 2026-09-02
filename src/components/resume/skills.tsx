import { skillGroups, skillIconSrc } from "#/components/resume/data";
import { ResumeSection } from "#/components/resume/section";
import { Chip } from "#/components/ui/chip";

export function ResumeSkills() {
	return (
		<ResumeSection title="Skills">
			<div className="flex flex-col gap-6">
				{skillGroups.map((group) => (
					<div
						key={group.category}
						className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-start"
					>
						<h3 className="font-semibold">{group.category}</h3>
						<ul className="flex flex-wrap gap-2">
							{group.items.map((item) => (
								<li key={item.name}>
									<Chip>
										<img src={skillIconSrc(item)} alt="" className="size-4" />
										{item.name}
									</Chip>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</ResumeSection>
	);
}
