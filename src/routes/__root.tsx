import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Footer } from "#/components/layout/footer";
import { Navbar } from "#/components/layout/navbar";
import { NotFound } from "#/components/not-found";
import { ConfigProvider } from "#/hooks/config";
import { ThemeProvider } from "#/hooks/theme";
import { absoluteUrl } from "#/lib/config";
import { seo } from "#/lib/seo";
import { getConfig } from "#/server/config";
import globalsStyles from "../globals.css?url";

export const Route = createRootRoute({
	loader: () => getConfig(),
	head: ({ loaderData }) => {
		const tags = loaderData
			? seo({
					title: `${loaderData.profile.name} - ${loaderData.site.displayName}`,
					description: loaderData.pages.home.description,
					keywords: loaderData.site.keywords,
					image: loaderData.site.ogImage
						? absoluteUrl(loaderData.site.url, loaderData.site.ogImage)
						: undefined,
					twitter: loaderData.site.twitter,
				})
			: { meta: [], links: [], scripts: [] };

		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				...tags.meta,
			],
			links: [
				{ rel: "preconnect", href: "https://cdn.simpleicons.org" },
				{ rel: "stylesheet", href: globalsStyles },
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/portfolio/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/portfolio/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/portfolio/favicon-16x16.png",
				},
				{ rel: "icon", href: "/portfolio/favicon.ico" },
				...tags.links,
			],
			scripts: tags.scripts,
		};
	},
	notFoundComponent: NotFound,
	shellComponent: RootDocument,
	component: RootLayout,
});

function RootLayout() {
	const config = Route.useLoaderData();

	return (
		<ConfigProvider config={config}>
			<Navbar />
			<Outlet />
			<Footer />
		</ConfigProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			data-theme="full-stack"
			data-scroll-behavior="smooth"
			className="scroll-smooth h-full bg-background text-foreground antialiased"
		>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					<LazyMotion features={domAnimation} strict>
						{children}
					</LazyMotion>
				</ThemeProvider>

				<Scripts />
			</body>
		</html>
	);
}
