import { fileURLToPath } from "node:url";
import type { HtmlTagDescriptor, Plugin } from "vite";
import { absoluteUrl, site, siteManifest } from "../src/config/site.ts";

const MANIFEST_PATH = "/site.webmanifest";
const SITEMAP_PATH = "/sitemap.xml";
const SITE_JSON_PATH = fileURLToPath(
	new URL("../src/config/site.json", import.meta.url),
);

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
	const home = absoluteUrl("/");
	const image = absoluteUrl(site.ogImage);

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

		link({ rel: "canonical", href: home }),

		meta({ property: "og:type", content: "website" }),
		meta({ property: "og:locale", content: site.locale }),
		meta({ property: "og:site_name", content: site.shortName }),
		meta({ property: "og:url", content: home }),
		meta({ property: "og:title", content: site.title }),
		meta({ property: "og:description", content: site.description }),
		meta({ property: "og:image", content: image }),

		meta({ name: "twitter:card", content: "summary_large_image" }),
		meta({ name: "twitter:title", content: site.title }),
		meta({ name: "twitter:description", content: site.description }),
		meta({ name: "twitter:image", content: image }),

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
				"@graph": [
					{
						"@type": "Person",
						name: person.name,
						alternateName: person.alternateName,
						jobTitle: person.jobTitle,
						description: site.description,
						url: home,
					},
					{
						"@type": "WebSite",
						name: site.shortName,
						url: home,
						description: site.description,
						inLanguage: site.lang,
						author: { "@type": "Person", name: person.name },
					},
				],
			}),
			injectTo: "head",
		},
	];
}

function sitemapSource() {
	const urls = Object.keys(site.pages)
		.map(
			(path) =>
				`  <url>\n    <loc>${absoluteUrl(path)}</loc>\n  </url>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function siteMeta(): Plugin {
	const manifestSource = `${JSON.stringify(siteManifest(), null, "\t")}\n`;
	const sitemap = sitemapSource();

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
				const pathname = request.url?.split("?")[0];

				if (pathname === MANIFEST_PATH) {
					response.setHeader("Content-Type", "application/manifest+json");
					response.end(manifestSource);
					return;
				}

				if (pathname === SITEMAP_PATH) {
					response.setHeader("Content-Type", "application/xml");
					response.end(sitemap);
					return;
				}

				next();
			});
		},
		generateBundle() {
			this.emitFile({
				type: "asset",
				fileName: MANIFEST_PATH.slice(1),
				source: manifestSource,
			});
			this.emitFile({
				type: "asset",
				fileName: SITEMAP_PATH.slice(1),
				source: sitemap,
			});
		},
	};
}
