import { fileURLToPath } from "node:url";
import type { HtmlTagDescriptor, Plugin } from "vite";
import { site, siteManifest } from "./site.ts";

const MANIFEST_PATH = "/site.webmanifest";
const SITE_JSON_PATH = fileURLToPath(new URL("./site.json", import.meta.url));

function meta(
	attrs: Record<string, string>,
	injectTo: HtmlTagDescriptor["injectTo"] = "head",
): HtmlTagDescriptor {
	return { tag: "meta", attrs, injectTo };
}

function link(attrs: Record<string, string>): HtmlTagDescriptor {
	return { tag: "link", attrs, injectTo: "head" };
}

function headTags(): HtmlTagDescriptor[] {
	const { person, icons } = site;

	return [
		{ tag: "title", children: site.title, injectTo: "head" },
		meta({ name: "description", content: site.description }),
		meta({ name: "author", content: person.name }),
		meta({ name: "robots", content: site.robots }),
		meta({ name: "color-scheme", content: site.colorScheme }),
		meta({ name: "theme-color", content: site.themeColor }),
		meta({ name: "application-name", content: site.shortName }),
		meta({ name: "apple-mobile-web-app-title", content: site.shortName }),
		meta({ name: "apple-mobile-web-app-capable", content: "yes" }),
		meta({ name: "mobile-web-app-capable", content: "yes" }),
		meta({ name: "msapplication-TileColor", content: site.themeColor }),

		meta({ property: "og:type", content: "website" }),
		meta({ property: "og:locale", content: site.locale }),
		meta({ property: "og:site_name", content: site.shortName }),
		meta({ property: "og:title", content: site.title }),
		meta({ property: "og:description", content: site.description }),

		meta({ name: "twitter:card", content: "summary" }),
		meta({ name: "twitter:title", content: site.title }),
		meta({ name: "twitter:description", content: site.description }),

		link({ rel: "icon", href: icons.ico, sizes: "32x32" }),
		link({ rel: "icon", href: icons.svg, type: "image/svg+xml" }),
		...icons.png.map((icon) =>
			link({
				rel: "icon",
				type: "image/png",
				sizes: icon.sizes,
				href: icon.src,
			}),
		),
		link({ rel: "apple-touch-icon", href: icons.apple }),
		link({ rel: "manifest", href: MANIFEST_PATH }),

		{
			tag: "script",
			attrs: { type: "application/ld+json" },
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Person",
				name: person.name,
				alternateName: person.alternateName,
				jobTitle: person.jobTitle,
				description: site.description,
			}),
			injectTo: "head",
		},
	];
}

export function siteMeta(): Plugin {
	const manifestSource = `${JSON.stringify(siteManifest(), null, "\t")}\n`;

	return {
		name: "site-meta",
		buildStart() {
			this.addWatchFile(SITE_JSON_PATH);
		},
		transformIndexHtml(html) {
			return {
				html: html.replace(
					/<html\b([^>]*)lang="[^"]*"/,
					`<html$1lang="${site.lang}"`,
				),
				tags: headTags(),
			};
		},
		configureServer(server) {
			server.middlewares.use((request, response, next) => {
				if (request.url?.split("?")[0] !== MANIFEST_PATH) {
					next();
					return;
				}

				response.setHeader("Content-Type", "application/manifest+json");
				response.end(manifestSource);
			});
		},
		generateBundle() {
			this.emitFile({
				type: "asset",
				fileName: MANIFEST_PATH.slice(1),
				source: manifestSource,
			});
		},
	};
}
