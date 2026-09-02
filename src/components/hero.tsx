import { Link } from "@tanstack/react-router";
import { BookUserIcon, GalleryVerticalIcon } from "lucide-react";
import { m } from "motion/react";

import { buttonVariants } from "#/components/ui/button";
import { ScrollHint } from "#/components/ui/scroll-hint";
import { useConfig } from "#/hooks/config";
import { useTheme } from "#/hooks/theme";
import {
	easeOutExpo,
	fadeUpMotion,
	lineRevealDelayedMotion,
	lineRevealMotion,
	staggerParentMotion,
} from "#/lib/motion";
import { cn } from "#/lib/styles";

const heroStyle = cn(
	"relative isolate overflow-hidden",
	"flex flex-col items-center justify-between min-h-screen",
);

const heroPaneStyle = cn(
	"relative z-10 flex flex-1 flex-col items-center justify-end gap-4 text-center",
);

const orbStyle = cn(
	"absolute rounded-full",
	"transition-colors duration-700",
	"motion-reduce:animate-none",
);

function FloatingGradients() {
	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-0 z-0 overflow-hidden",
				"mask-[linear-gradient(to_bottom,black_58%,transparent)]",
			)}
		>
			<div
				className={cn(
					orbStyle,
					"top-[-18%] left-[-12%] size-[55vmax] bg-accent-500/25 animate-hero-float-a",
				)}
			/>
			<div
				className={cn(
					orbStyle,
					"top-[-8%] right-[-18%] size-[45vmax] bg-accent-700/20 animate-hero-float-b",
				)}
			/>
		</div>
	);
}

export function Hero() {
	const { name, headline, tagline } = useConfig((config) => ({
		name: config.profile.name,
		headline: config.hero.headline,
		tagline: config.hero.tagline,
	}));

	return (
		<section className={heroStyle}>
			<FloatingGradients />

			<m.div
				className={heroPaneStyle}
				initial="hidden"
				animate="visible"
				variants={staggerParentMotion}
			>
				<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
					<span className="block overflow-hidden">
						<m.span
							className="inline-block transition-colors bg-linear-to-r from-accent-400 to-accent-800 bg-clip-text text-transparent"
							variants={lineRevealMotion}
						>
							{name}
						</m.span>
					</span>
					<span className="block overflow-hidden">
						<m.span className="inline-block" variants={lineRevealDelayedMotion}>
							{headline}
						</m.span>
					</span>
				</h1>

				<m.p className="max-w-xl lg:text-lg" variants={fadeUpMotion}>
					{tagline}
				</m.p>

				<m.div className="flex items-center gap-2" variants={fadeUpMotion}>
					<Link className={buttonVariants({ variant: "ghost" })} to="/projects">
						<GalleryVerticalIcon />
						Selected Projects
					</Link>
					<Link className={buttonVariants()} to="/resume">
						<BookUserIcon />
						CV / Resume
					</Link>
				</m.div>
			</m.div>

			<m.div
				className={heroPaneStyle}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.45, duration: 0.6, ease: easeOutExpo }}
			>
				<JourneyPath />

				<ScrollHint>Scroll to start the selected journey</ScrollHint>
			</m.div>
		</section>
	);
}

const journeyBaseStyle = cn(
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

	return (
		<>
			<p>Select the journey path:</p>

			<div className="flex justify-center gap-4">
				<JourneyCard
					active={theme === "full-stack"}
					onClick={() => setTheme("full-stack")}
					className="bg-radial from-primary-800 to-background data-active:opacity-100 data-active:border-primary-800"
				>
					Web / Full-Stack
				</JourneyCard>

				<JourneyCard
					active={theme === "rust"}
					onClick={() => setTheme("rust")}
					className="bg-radial from-secondary-800 to-background data-active:opacity-100 data-active:border-secondary-800"
				>
					Systems / Rust
				</JourneyCard>
			</div>
		</>
	);
}

type JourneyCardProps = {
	active: boolean;
	onClick: () => void;
	className: string;
	children: React.ReactNode;
};

function JourneyCard({
	active,
	onClick,
	className,
	children,
}: JourneyCardProps) {
	return (
		<m.button
			type="button"
			data-active={active ? true : undefined}
			onClick={onClick}
			className={cn(journeyBaseStyle, className)}
			initial={{ opacity: 0, y: 16, scale: 0.96 }}
			animate={{
				opacity: active ? 1 : 0.8,
				y: 0,
				scale: active ? 1 : 0.98,
			}}
			transition={{ type: "spring", stiffness: 280, damping: 24 }}
			whileTap={{ scale: 0.96 }}
		>
			{children}
		</m.button>
	);
}
