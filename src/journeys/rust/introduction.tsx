import { m } from "motion/react";
import { Stage } from "#/components/stage";
import { Chip } from "#/components/ui/chip";
import { Marquee } from "#/components/ui/marquee";
import { ScrollHint } from "#/components/ui/scroll-hint";
import { useConfig } from "#/hooks/config";
import { selectSkillsForJourney } from "#/lib/config";
import { easeOutExpo, viewportOnceMotion } from "#/lib/motion";

export function IntroduceStage() {
  return (
    <Stage.Root>
      <Stage.Content
        label="WHAT DO I DO AS A"
        title="Rust Developer"
        description="From a single critical path to a production-ready system. I start where it matters most, let the architecture emerge through types and ownership, and ship safe, high-performance software."
      />

      <Stage.Layer position="bottom" className="flex flex-col justify-start items-center gap-5">
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
  const skills = useConfig((config) => selectSkillsForJourney(config, "rust"));

  if (skills.length < 1) return null;

  return (
    <Marquee.Root
      pauseOnHover
      className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
    >
      {skills.map((item) => {
        return (
          <Marquee.Item key={item.name}>
            <Chip>
              {item.iconSrc && (
                <img src={item.iconSrc} alt={`${item.name} icon`} className="size-4" />
              )}
              {item.name}
            </Chip>
          </Marquee.Item>
        );
      })}
    </Marquee.Root>
  );
}
