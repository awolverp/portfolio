const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

const yearMonthPattern = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function parseYearMonth(value: string): Date {
  const match = yearMonthPattern.exec(value);
  if (!match) {
    throw new Error(`Invalid year-month "${value}"; expected YYYY-MM`);
  }
  return new Date(Number(match[1]), Number(match[2]) - 1);
}

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : parseYearMonth(value);
}

export function formatPeriod(startDate: string | Date, endDate: string | Date | null): string {
  const start = monthYearFormatter.format(toDate(startDate));
  const end = endDate ? monthYearFormatter.format(toDate(endDate)) : "Present";
  return `${start} – ${end}`;
}

function monthIndex(value: Date): number {
  return value.getFullYear() * 12 + (value.getMonth() - 1);
}

export function formatDuration(startDate: string | Date, endDate: string | Date | null): string {
  const start = monthIndex(toDate(startDate));
  const end = monthIndex(endDate ? toDate(endDate) : new Date());
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
