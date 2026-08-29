import { m, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Stage } from "#/components/stage";
import { easeOutExpo } from "#/lib/motion";

const phrases = [
	"Caching",
	"Authentication",
	"Use Mutex",
	"New Message",
	"Split Crates",
	"Use RefCell",
	"Refactor Internal",
	"Abstraction",
] as const;

const SLOT_COUNT = 6;

export function GrowIterativelyStage() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { amount: 0.4 });

	return (
		<Stage.Root ref={ref}>
			<FloatingPhrases active={inView} />

			<Stage.Content
				label="STAGE 3/5"
				title="Grow Iteratively"
				description="Add capabilities step by step. Allow the architecture and module boundaries to emerge naturally from the implementation."
			/>
		</Stage.Root>
	);
}

function FloatingPhrases({ active }: { active: boolean }) {
	const used = useRef(new Set<string>(phrases.slice(0, SLOT_COUNT)));

	const take = (release: string) => {
		used.current.delete(release);
		const available = phrases.filter((phrase) => !used.current.has(phrase));
		const next =
			available[Math.floor(Math.random() * available.length)] ?? release;
		used.current.add(next);
		return next;
	};

	return (
		<div className="pointer-events-none absolute inset-0 z-0">
			{phrases.slice(0, SLOT_COUNT).map((phrase, index) => (
				<PhraseSlot
					key={phrase}
					index={index}
					initialPhrase={phrase}
					active={active}
					take={take}
				/>
			))}
		</div>
	);
}

function pickPosition() {
	const edge = 10;
	const exclude = { left: 22, right: 78, top: 34, bottom: 66 };

	for (let i = 0; i < 24; i++) {
		const left = edge + Math.random() * (100 - edge * 2);
		const top = edge + Math.random() * (100 - edge * 2);
		if (
			left < exclude.left ||
			left > exclude.right ||
			top < exclude.top ||
			top > exclude.bottom
		) {
			return { left, top };
		}
	}

	return {
		left: edge + Math.random() * (100 - edge * 2),
		top: edge + Math.random() * 12,
	};
}

function PhraseSlot({
	index,
	initialPhrase,
	active,
	take,
}: {
	index: number;
	initialPhrase: string;
	active: boolean;
	take: (release: string) => string;
}) {
	const [item, setItem] = useState(() => ({
		id: 0,
		phrase: initialPhrase,
		...pickPosition(),
		delay: 0.2 + index * 0.4,
		duration: 3.4 + index * 0.18,
	}));

	return (
		<m.span
			key={item.id}
			className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-muted-foreground"
			style={{ left: `${item.left}%`, top: `${item.top}%` }}
			initial={{ opacity: 0, y: 12 }}
			animate={
				active
					? { opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }
					: { opacity: 0, y: 0 }
			}
			transition={
				active
					? {
							duration: item.duration,
							times: [0, 0.16, 0.78, 1],
							delay: item.delay,
							ease: [easeOutExpo, "linear", "easeIn"],
						}
					: { duration: 0.2 }
			}
			onAnimationComplete={() => {
				if (!active) return;
				setItem((prev) => ({
					id: prev.id + 1,
					phrase: take(prev.phrase),
					...pickPosition(),
					delay: 0.3 + Math.random() * 1.1,
					duration: 3.2 + Math.random() * 1.2,
				}));
			}}
		>
			+ {item.phrase}
		</m.span>
	);
}
