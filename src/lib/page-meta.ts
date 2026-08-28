import { useEffect } from "react";
import { site } from "#/config/site";

type PagePath = keyof typeof site.pages;

export function usePageMeta(path: PagePath) {
	const page = site.pages[path];

	useEffect(() => {
		document.title = page.title;

		const description = document.querySelector('meta[name="description"]');
		description?.setAttribute("content", page.description);
	}, [page.description, page.title]);
}
