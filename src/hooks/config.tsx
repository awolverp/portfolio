import { useRef } from "react";
import type { Config } from "#/lib/config";
import config from "#/lib/config";

export function useConfig(): Config;
export function useConfig<T>(select: (config: Config) => T): T;
export function useConfig<T = Config>(select?: (config: Config) => T): T {
	const selected = select ? select(config) : (config as T);
	const previous = useRef(selected);
	if (!Object.is(previous.current, selected)) {
		previous.current = selected;
	}
	return previous.current;
}
