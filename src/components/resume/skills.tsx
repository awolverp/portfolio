import { ResumeSection } from "#/components/resume/section";
import { Chip } from "#/components/ui/chip";
import { useConfig } from "#/hooks/config";
import { skillIconSrc } from "#/lib/config";

export function ResumeSkills() {
	const skillGroups = useConfig((config) => config.resume.skills);

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
							{group.items.map((item) => {
								const iconSrc = skillIconSrc(item);
								return (
									<li key={item.name}>
										<Chip>
											{iconSrc && (
												<img src={iconSrc} alt="" className="size-4" />
											)}
											{item.name}
										</Chip>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</div>
		</ResumeSection>
	);
}
