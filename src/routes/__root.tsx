import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import globalsStyles from "../globals.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "Ali Pooralijan - A.Wolver.P" },
		],
		links: [
			{ rel: "preconnect", href: "https://cdn.simpleicons.org" },
			{ rel: "stylesheet", href: globalsStyles },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	shellComponent: RootDocument,
});

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
				{children}

				<Scripts />
			</body>
		</html>
	);
}
