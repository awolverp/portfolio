import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { site } from "#/config/site";
import { defineClassName } from "#/lib/styles";

const navbarStyle = defineClassName(
	"flex items-center justify-between",
	// position
	"isolate fixed z-50",
	// mobile inset vs desktop centered container
	"inset-x-auto",
	// width & padding
	"w-full px-4 py-3",
	// background
	"bg-background/40 backdrop-blur-sm",
);

export function Navbar() {
	return (
		<nav className={navbarStyle}>
			<Link to="/" className="flex items-center gap-2 text-foreground">
				<img src={site.icons.svg} alt="" className="size-6" />
				<span className="text-xl font-bold">{site.shortName}</span>
			</Link>

			<div className="flex items-center gap-1">
				<Button variant="ghost" size="sm" asChild>
					<Link to="/projects">Projects</Link>
				</Button>
				<Button variant="primary" size="sm" asChild>
					<Link to="/resume">Resume</Link>
				</Button>
			</div>
		</nav>
	);
}
