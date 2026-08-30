import { Link } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/styles";

const navbarStyle = cn(
	"flex items-center justify-between",
	// position
	"isolate fixed z-50",
	// mobile inset vs desktop centered container
	"inset-x-auto",
	// width & padding
	"w-full px-4 py-3",
	// background
	"bg-background",
);

export function Navbar() {
	return (
		<nav className={navbarStyle}>
			<Link to="/" className="flex items-center gap-2 text-foreground">
				<img src="/favicon.svg" alt="" className="size-6" />
				<span className="text-xl font-bold">A.Wolver.P</span>
			</Link>

			<div className="flex items-center gap-1">
				<Link
					to="/projects"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					Projects
				</Link>
				<Link to="/resume" className={buttonVariants({ size: "sm" })}>
					Resume
				</Link>
			</div>
		</nav>
	);
}
