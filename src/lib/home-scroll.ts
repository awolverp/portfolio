import { createContext, type RefObject, use } from "react";

export const HomeScrollContext =
	createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useHomeScroll() {
	return use(HomeScrollContext);
}
