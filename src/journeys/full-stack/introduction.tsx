import { m } from "motion/react";
import { Stage } from "#/components/stage";
import { Chip } from "#/components/ui/chip";
import { Marquee } from "#/components/ui/marquee";
import { ScrollHint } from "#/components/ui/scroll-hint";
import { easeOutExpo, viewportOnceMotion } from "#/lib/motion";

const stackItems = [
	{
		name: "Python",
		url: "https://cdn.simpleicons.org/python/3776AB",
	},
	{
		name: "FastAPI",
		url: "https://cdn.simpleicons.org/fastapi/009688",
	},
	{
		name: "Golang",
		url: "https://cdn.simpleicons.org/go/00ADD8",
	},
	{
		name: "TypeScript",
		url: "https://cdn.simpleicons.org/typescript/3178C6",
	},
	{
		name: "Next.js",
		url: "https://cdn.simpleicons.org/nextdotjs/fff",
	},
	{
		name: "Tanstack Start",
		url: "https://cdn.simpleicons.org/tanstack/EAB308",
	},
	{
		name: "Github Actions",
		url: "https://cdn.simpleicons.org/githubactions/2088FF",
	},
] as const;

export function IntroduceStage() {
	return (
		<Stage.Root>
			<Stage.Content
				label="WHAT DO I DO AS A"
				title="Full-Stack Developer"
				description="From clean backend APIs to animation-heavy frontend. I enjoy the parts most people avoid."
			/>

			<Stage.Layer
				position="bottom"
				className="flex flex-col justify-start items-center gap-5"
			>
				<m.div
					className="flex flex-col items-center gap-5"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnceMotion}
					transition={{ delay: 0.2, duration: 0.55, ease: easeOutExpo }}
				>
					<StackMarquee />
					<ScrollHint>Scroll down to explore</ScrollHint>
				</m.div>
			</Stage.Layer>
		</Stage.Root>
	);
}

function StackMarquee() {
	return (
		<Marquee.Root
			pauseOnHover
			className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
		>
			{stackItems.map((item) => (
				<Marquee.Item key={item.name}>
					<Chip>
						<img src={item.url} alt={`${item.name} icon`} className="size-4" />
						{item.name}
					</Chip>
				</Marquee.Item>
			))}
		</Marquee.Root>
	);
}
