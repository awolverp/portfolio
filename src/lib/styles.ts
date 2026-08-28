import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

/** A thin wrapper around `cx` and `twMerge` */
export function defineClassName(...inputs: Parameters<typeof cx>) {
	return twMerge(cx(...inputs));
}
