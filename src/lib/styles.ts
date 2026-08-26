import { cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

/** A thin wrapper around `cx` and `twMerge` */
export function defineClassName(...inputs: Parameters<typeof cx>) {
  return twMerge(cx(...inputs));
}

/** A thin wrapper around `cva` */
export function classVarianceAuthority<T>(
  base: Parameters<typeof cva>[0],
  variants: T,
) {
  return cva<T>(base, { variants } as NonNullable<
    Parameters<typeof cva<T>>[1]
  >);
}
