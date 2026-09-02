import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { type Config, parseConfig } from "#/lib/config";

let cached: Config | undefined;

async function loadConfig(): Promise<Config> {
	if (cached) return cached;

	const raw = await readFile(resolve(process.cwd(), "config.json"), "utf8");
	cached = parseConfig(JSON.parse(raw) as unknown);
	return cached;
}

export const getConfig = createServerFn({ method: "GET" })
	.middleware([staticFunctionMiddleware])
	.handler(async () => loadConfig());
