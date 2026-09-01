const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	year: "numeric",
});

export function formatPeriod(startDate: Date, endDate: Date | null): string {
	const start = monthYearFormatter.format(startDate);
	const end = endDate ? monthYearFormatter.format(endDate) : "Present";
	return `${start} – ${end}`;
}

function monthIndex(value: Date): number {
	return value.getFullYear() * 12 + (value.getMonth() - 1);
}

export function formatDuration(startDate: Date, endDate: Date | null): string {
	const start = monthIndex(startDate);
	const end = monthIndex(endDate ?? new Date());
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
