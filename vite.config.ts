import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

import { defineConfig } from "vite";

const config = defineConfig({
	base: "/portfolio/",
	resolve: { tsconfigPaths: true },
	plugins: [
		tailwindcss(),
		tanstackStart({
			spa: {
				enabled: true,
				prerender: {
					crawlLinks: true,
				},
			},
		}),
		viteReact(),
	],
});

export default config;
