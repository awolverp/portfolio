import {
	createContext,
	type ReactNode,
	use,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";

export const THEMES = ["full-stack", "rust"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "full-stack";

const STORAGE_KEY = "theme";

interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
	return value === "full-stack" || value === "rust";
}

function readStoredTheme(): Theme {
	const stored = localStorage.getItem(STORAGE_KEY);
	return isTheme(stored) ? stored : DEFAULT_THEME;
}

function applyTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
	localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(readStoredTheme);

	useLayoutEffect(() => applyTheme(theme), [theme]);

	const value = useMemo<ThemeContextValue>(
		() => ({ theme, setTheme: setThemeState }),
		[theme],
	);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	const context = use(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}

	return context;
}
