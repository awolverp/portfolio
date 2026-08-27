import { Stage } from "#/components/ui/stage";

export function IntroduceStage() {
	return (
		<Stage.Root>
			<Stage.FullWidthPart />
			<Stage.Part>
				<Stage.SmallText>WHAT DO I DO AS A</Stage.SmallText>
				<Stage.Title>Full-Stack Developer</Stage.Title>
				<Stage.Description>
					From clean backend APIs to animation-heavy frontend. I enjoy the parts
					most people avoid.
				</Stage.Description>
			</Stage.Part>
			<Stage.FullWidthPart />
		</Stage.Root>
	);
}
