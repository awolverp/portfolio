import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "#/components/hero";
import { useTheme } from "#/hooks/theme";
import { FullStackJourney } from "#/journeys/full-stack";
import { RustJourney } from "#/journeys/rust";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title: "Ali Pooralijan | A.Wolver.P",
			},
			{
				name: "description",
				content:
					"Portfolio of Ali Pooralijan (A.Wolver.P), a software engineer focused on performance, scalable systems, and modern web applications.",
			},
		],
	}),
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
