import { createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";
import {
	createContext,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";

export type Theme = "full-stack" | "rust";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "full-stack";

interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
	return value === "full-stack" || value === "rust";
}

export const readStoredTheme = createIsomorphicFn()
	.server((): Theme => DEFAULT_THEME)
	.client((): Theme => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return isTheme(stored) ? stored : DEFAULT_THEME;
		} catch {
			return DEFAULT_THEME;
		}
	});

export const applyTheme = createClientOnlyFn((theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	localStorage.setItem(STORAGE_KEY, theme);
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

	useLayoutEffect(() => {
		const next = readStoredTheme();
		setThemeState(next);
		applyTheme(next);
	}, []);

	useLayoutEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			setTheme: setThemeState,
		}),
		[theme],
	);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
}
