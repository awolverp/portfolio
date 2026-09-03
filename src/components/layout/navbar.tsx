import { Link, useLocation } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button";
import { useConfig } from "#/hooks/config";
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
	const pathname = useLocation({ select: (loc) => loc.pathname });
	const displayName = useConfig((config) => config.site.displayName);

	return (
		<nav className={navbarStyle}>
			<Link to="/" className="flex items-center gap-2 text-foreground">
				<img src="/portfolio/favicon.svg" alt="" className="size-6" />
				<span className="hidden md:inline text-xl font-bold">
					{displayName}
				</span>
			</Link>

			<div className="flex items-center gap-1">
				<Link
					to="/projects"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
					disabled={pathname === "/projects"}
				>
					Projects
				</Link>

				<Link
					to="/resume"
					className={buttonVariants({ size: "sm" })}
					disabled={pathname === "/resume"}
				>
					Resume
				</Link>
			</div>
		</nav>
	);
}
