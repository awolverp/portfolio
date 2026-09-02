import { absoluteUrl, type Config } from "#/lib/config";

type SeoInput = {
	title: string;
	description?: string;
	keywords?: string;
	image?: string;
	url?: string;
	type?: string;
	twitter?: string;
	jsonLd?: unknown;
};

type MetaTag =
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string };

export function seo({
	title,
	description,
	keywords,
	image,
	url,
	type = "website",
	twitter,
	jsonLd,
}: SeoInput) {
	const meta: MetaTag[] = [
		{ title },
		{ property: "og:type", content: type },
		{ property: "og:title", content: title },
		{ name: "twitter:title", content: title },
	];

	if (description) {
		meta.push(
			{ name: "description", content: description },
			{ property: "og:description", content: description },
			{ name: "twitter:description", content: description },
		);
	}

	if (keywords) {
		meta.push({ name: "keywords", content: keywords });
	}

	if (url) {
		meta.push({ property: "og:url", content: url });
	}

	if (twitter) {
		meta.push(
			{ name: "twitter:creator", content: twitter },
			{ name: "twitter:site", content: twitter },
		);
	}

	if (image) {
		meta.push(
			{ name: "twitter:image", content: image },
			{ name: "twitter:card", content: "summary_large_image" },
			{ property: "og:image", content: image },
		);
	}

	return {
		meta,
		links: url ? [{ rel: "canonical" as const, href: url }] : [],
		scripts: jsonLd
			? [
					{
						type: "application/ld+json",
						children: JSON.stringify(jsonLd),
					},
				]
			: [],
	};
}

export function personJsonLd(config: Config) {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: config.profile.name,
		alternateName: config.site.displayName,
		jobTitle: config.profile.jobTitle,
		email: config.profile.email,
		url: absoluteUrl(config.site.url, "/resume"),
		sameAs: config.socials.map((social) => social.href),
	};
}
