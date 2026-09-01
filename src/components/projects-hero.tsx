import { cn } from "#/lib/styles";

const headerStyle = cn(
	"relative isolate",
	"flex flex-col items-center justify-center gap-4",
	"h-[calc(100vh-10rem)] text-center",
);

export function ProjectsHero() {
	return (
		<header className={headerStyle}>
			<h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl starting:opacity-0 starting:translate-y-2 transition-[opacity,translate]">
				Selected Projects
			</h1>

			<p className="max-w-xl lg:text-lg starting:opacity-0 starting:translate-y-4 transition-[opacity,translate]">
				I've worked on tons of little projects over the years but these are the
				ones that I'm most proud of.
			</p>
		</header>
	);
}
