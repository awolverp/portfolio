import { createContext, useContext, useRef } from "react";
import type { Config } from "#/lib/config";

const ConfigContext = createContext<Config | null>(null);

export function ConfigProvider({
	config,
	children,
}: {
	config: Config;
	children: React.ReactNode;
}) {
	return <ConfigContext value={config}>{children}</ConfigContext>;
}

export function useConfig(): Config;
export function useConfig<T>(select: (config: Config) => T): T;
export function useConfig<T = Config>(select?: (config: Config) => T): T {
	const config = useContext(ConfigContext);
	if (!config) {
		throw new Error("useConfig must be used within ConfigProvider");
	}

	const selected = select ? select(config) : (config as T);
	const previous = useRef(selected);
	if (!Object.is(previous.current, selected)) {
		previous.current = selected;
	}
	return previous.current;
}
