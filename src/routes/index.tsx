import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "#/components/hero";
import { useTheme } from "#/hooks/theme";
import { FullStackJourney } from "#/journeys/full-stack";
import { RustJourney } from "#/journeys/rust";
import config, { absoluteUrl } from "#/lib/config";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/")({
	head: () => {
		const { site, pages } = config;

		return seo({
			title: pages.home.title,
			description: pages.home.description,
			keywords: site.keywords,
			image: site.ogImage ? absoluteUrl(site.url, site.ogImage) : undefined,
			url: site.url,
			twitter: site.twitter,
		});
	},
	component: Home,
});

function Home() {
	const { theme } = useTheme();

	return (
		<>
			<Hero />
			{theme === "rust" ? <RustJourney /> : <FullStackJourney />}
		</>
	);
}
