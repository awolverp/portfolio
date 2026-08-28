import { Link } from "@tanstack/react-router";
import {
	BookUser as BookUserIcon,
	GalleryVertical as GalleryVerticalIcon,
} from "lucide-react";

import { Button } from "#/components/ui/button";
import { ScrollHint } from "#/components/ui/scroll-hint";
import { defineClassName } from "#/lib/styles";
import { useTheme } from "#/lib/theme";

const heroStyle = defineClassName(
	"flex flex-col items-center justify-between min-h-screen",
	"[&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-end [&>div]:gap-4 [&>div]:text-center",
);

export function Hero() {
	return (
		<section className={heroStyle}>
			<div>
				<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
					<span className="transition-colors bg-linear-to-r from-accent-400 to-accent-800 bg-clip-text text-transparent">
						Performance First.
					</span>
					<br />
					<span>Everything Else Second.</span>
				</h1>

				<p className="max-w-xl lg:text-lg">
					I build high-performance backends and full-stack systems that scale.
					From PyO3 to production AI APIs.
				</p>

				<div className="flex items-center gap-2">
					<Button variant="ghost" asChild>
						<Link to="/projects">
							<GalleryVerticalIcon />
							Selected Projects
						</Link>
					</Button>
					<Button variant="primary" asChild>
						<Link to="/resume">
							<BookUserIcon />
							CV / Resume
						</Link>
					</Button>
				</div>
			</div>

			<div>
				<JourneyPath />

				<ScrollHint>Scroll to start the selected journey</ScrollHint>
			</div>
		</section>
	);
}

const journeyBaseStyle = defineClassName(
	// layout
	"inline-flex justify-center items-center h-35 w-45 opacity-80",
	// border
	"border-2 border-border rounded-lg",
	// text
	"text-lg font-medium",
	// transform
	"transition-all",
	// accessibility
	"cursor-pointer select-none",
);

function JourneyPath() {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<p>Select the journey path:</p>

			<div className="flex justify-center gap-4">
				<button
					type="button"
					data-active={theme === "full-stack" ? true : undefined}
					onClick={() => setTheme("full-stack")}
					className={defineClassName(
						journeyBaseStyle,
						"bg-radial from-primary-800 to-background data-active:opacity-100 data-active:border-primary-800",
					)}
				>
					Web / Full-Stack
				</button>

				<button
					type="button"
					data-active={theme === "rust" ? true : undefined}
					onClick={() => setTheme("rust")}
					className={defineClassName(
						journeyBaseStyle,
						"bg-radial from-secondary-800 to-background data-active:opacity-100 data-active:border-secondary-800",
					)}
				>
					Systems / Rust
				</button>
			</div>
		</>
	);
}
