import { ResumeSection } from "#/components/resume/section";
import { useConfig } from "#/hooks/config";
import type { Config } from "#/lib/config";
import { formatPeriod } from "#/lib/date";
import { cn } from "#/lib/styles";

export function ResumeExperience() {
  const experience = useConfig((config) => config.resume.experience);

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
}: Config["resume"]["experience"][number]) {
  return (
    <li className="relative ml-4 space-y-1">
      <span aria-hidden className="absolute top-2 -left-4 size-1.5 rounded-full bg-foreground" />
      <p className="text-sm text-muted-foreground">{formatPeriod(startDate, endDate)}</p>
      <p className={cn(company ? "text-sm text-muted-foreground" : "font-semibold text-lg")}>{role} | {type}</p>
      {company && <p className="font-semibold text-lg">{company}</p>}
      <p>{description}</p>
    </li>
  );
}
