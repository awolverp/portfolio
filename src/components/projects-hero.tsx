import { m } from "motion/react";

import {
	fadeUpMotion,
	lineRevealMotion,
	staggerParentMotion,
} from "#/lib/motion";
import { cn } from "#/lib/styles";

const headerStyle = cn(
	"relative isolate",
	"flex flex-col items-center justify-center",
	"px-4 pt-32 pb-16 text-center",
);

export function ProjectsHero() {
	return (
		<header className={headerStyle}>
			<m.div
				className="flex flex-col items-center gap-4"
				initial="hidden"
				animate="visible"
				variants={staggerParentMotion}
			>
				<h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
					<span className="block overflow-hidden">
						<m.span className="inline-block" variants={lineRevealMotion}>
							Selected Projects
						</m.span>
					</span>
				</h1>

				<m.p className="max-w-xl lg:text-lg" variants={fadeUpMotion}>
					I've worked on tons of little projects over the years but these are
					the ones that I'm most proud of.
				</m.p>
			</m.div>
		</header>
	);
}
