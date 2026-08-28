import config from "./site.json" with { type: "json" };

export const site = config;

export type SiteConfig = typeof site;

export function absoluteUrl(path = "/"): string {
	const origin = site.url.replace(/\/$/, "");

	if (/^https?:\/\//.test(path)) {
		return path;
	}

	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteManifest(config: SiteConfig = site) {
	return {
		id: "/",
		name: config.title,
		short_name: config.shortName,
		description: config.description,
		start_url: "/",
		scope: "/",
		display: "standalone",
		lang: config.lang,
		dir: config.dir,
		theme_color: config.themeColor,
		background_color: config.backgroundColor,
		icons: [
			{
				src: config.icons.svg,
				type: "image/svg+xml",
				sizes: "any",
				purpose: "any",
			},
			...config.icons.android.map((icon) => ({
				src: icon.src,
				sizes: icon.sizes,
				type: "image/png",
				purpose: "any",
			})),
		],
	};
}
