import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export type { VariantProps } from "class-variance-authority";
export { cva } from "class-variance-authority";

/** A thin wrapper around `cx` and `twMerge` */
export function cn(...inputs: Parameters<typeof cx>) {
	return twMerge(cx(...inputs));
}
