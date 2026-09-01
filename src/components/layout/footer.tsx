import { Link, useLocation } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button";

const socials = [
	{
		name: "GitHub",
		href: "https://github.com/awolverp",
		icon: "/icons/github.svg",
	},
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/in/ali-pooralijan-awolverp",
		icon: "/icons/linkedin.svg",
	},
	{
		name: "X",
		href: "https://x.com/awolverp",
		icon: "/icons/x.svg",
	},
	{
		name: "Telegram",
		href: "https://t.me/awolverp",
		icon: "/icons/telegram.svg",
	},
] as const;

export function Footer() {
	const pathname = useLocation({ select: (loc) => loc.pathname });

	return (
		<footer className="border-t-2 border-border w-full py-8 flex flex-col gap-6">
			<div className="container flex gap-4 flex-col justify-center items-center md:flex-row md:items-center md:justify-between">
				<Link to="/" className="flex items-center gap-2">
					<img src="/favicon.svg" alt="" className="size-6" />
					<span className="text-xl font-bold">A.Wolver.P</span>
				</Link>

				<div className="flex items-center gap-1">
					<Link
						to="/"
						className={buttonVariants({ variant: "link", size: "sm" })}
						disabled={pathname === "/"}
					>
						Home
					</Link>
					<Link
						to="/projects"
						className={buttonVariants({ variant: "link", size: "sm" })}
						disabled={pathname === "/projects"}
					>
						Selected Projects
					</Link>
					<Link
						to="/resume"
						className={buttonVariants({ variant: "link", size: "sm" })}
						disabled={pathname === "/resume"}
					>
						CV / Resume
					</Link>
				</div>
			</div>

			<div className="container flex flex-wrap items-center justify-between gap-4">
				<p className="text-sm text-muted-foreground">© 2026 Ali Pooralijan</p>
				<div className="flex items-center gap-1">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.href}
							target="_blank"
							rel="noreferrer"
							aria-label={social.name}
							className="p-2"
						>
							<img src={social.icon} alt="" className="size-5" />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
