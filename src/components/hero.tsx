import { Link } from "@tanstack/react-router";
import {
	BookUser as BookUserIcon,
	GalleryVertical as GalleryVerticalIcon,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { Button } from "#/components/ui/button";
import { ScrollHint } from "#/components/ui/scroll-hint";
import { easeOutExpo, fadeUp, staggerParent } from "#/lib/motion";
import { defineClassName } from "#/lib/styles";
import { useTheme } from "#/lib/theme";

const heroStyle = defineClassName(
	"flex flex-col items-center justify-between min-h-screen",
	"[&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-end [&>div]:gap-4 [&>div]:text-center",
	"snap-start snap-always",
);

export function Hero() {
	const reduce = useReducedMotion();

	return (
		<section className={heroStyle}>
			<m.div
				initial={reduce ? false : "hidden"}
				animate="visible"
				variants={staggerParent}
			>
				<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
					<span className="block overflow-hidden">
						<m.span
							className="inline-block transition-colors bg-linear-to-r from-accent-400 to-accent-800 bg-clip-text text-transparent"
							variants={reduce ? undefined : lineReveal}
						>
							Performance First.
						</m.span>
					</span>
					<span className="block overflow-hidden">
						<m.span
							className="inline-block"
							variants={reduce ? undefined : lineRevealDelayed}
						>
							Everything Else Second.
						</m.span>
					</span>
				</h1>

				<m.p
					className="max-w-xl lg:text-lg"
					variants={reduce ? undefined : fadeUp}
				>
					I build high-performance backends and full-stack systems that scale.
					From PyO3 to production AI APIs.
				</m.p>

				<m.div
					className="flex items-center gap-2"
					variants={reduce ? undefined : fadeUp}
				>
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
				</m.div>
			</m.div>

			<m.div
				initial={reduce ? false : { opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.45, duration: 0.6, ease: easeOutExpo }}
			>
				<JourneyPath />

				<m.div
					initial={reduce ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.85, duration: 0.5 }}
				>
					<ScrollHint>Scroll to start the selected journey</ScrollHint>
				</m.div>
			</m.div>
		</section>
	);
}

const lineReveal = {
	hidden: { y: "110%", opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: easeOutExpo },
	},
};

const lineRevealDelayed = {
	hidden: lineReveal.hidden,
	visible: {
		...lineReveal.visible,
		transition: { duration: 0.7, ease: easeOutExpo, delay: 0.12 },
	},
};

const journeyBaseStyle = defineClassName(
	// layout
	"inline-flex justify-center items-center h-35 w-45 opacity-80",
	// border
	"border-2 border-border rounded-lg",
	// text
	"text-lg font-medium",
	// transform
	"transition-colors",
	// accessibility
	"cursor-pointer select-none",
);

function JourneyPath() {
	const { theme, setTheme } = useTheme();
	const reduce = useReducedMotion();

	return (
		<>
			<p>Select the journey path:</p>

			<div className="flex justify-center gap-4">
				<JourneyCard
					active={theme === "full-stack"}
					reduce={!!reduce}
					onSelect={() => setTheme("full-stack")}
					className="bg-radial from-primary-800 to-background data-active:opacity-100 data-active:border-primary-800"
				>
					Web / Full-Stack
				</JourneyCard>

				<JourneyCard
					active={theme === "rust"}
					reduce={!!reduce}
					onSelect={() => setTheme("rust")}
					className="bg-radial from-secondary-800 to-background data-active:opacity-100 data-active:border-secondary-800"
				>
					Systems / Rust
				</JourneyCard>
			</div>
		</>
	);
}

function JourneyCard({
	active,
	reduce,
	onSelect,
	className,
	children,
}: {
	active: boolean;
	reduce: boolean;
	onSelect: () => void;
	className: string;
	children: React.ReactNode;
}) {
	return (
		<m.button
			type="button"
			data-active={active ? true : undefined}
			onClick={onSelect}
			className={defineClassName(journeyBaseStyle, className)}
			initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
			animate={{
				opacity: active ? 1 : 0.8,
				y: 0,
				scale: active ? 1 : 0.98,
			}}
			transition={{ type: "spring", stiffness: 280, damping: 24 }}
			whileTap={reduce ? undefined : { scale: 0.96 }}
		>
			{children}
		</m.button>
	);
}
