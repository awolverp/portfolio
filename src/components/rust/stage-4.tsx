import { Check as CheckIcon } from "lucide-react";
import { LayoutGroup, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BrandIcon, rustBrand } from "#/components/ui/brand-icon";
import { Chip } from "#/components/ui/chip";
import { CopyReveal } from "#/components/ui/copy-reveal";
import { Stage } from "#/components/ui/stage";
import { easeOutExpo, viewportOnce } from "#/lib/motion";
import { defineClassName } from "#/lib/styles";

const catalog = {
	runtime: "Add runtime checks",
	unsafe: "Use unsafe only in small",
	errors: "Better error handling",
	boilerplate: "Remove boilerplates",
} as const;

type TaskId = keyof typeof catalog;

type TaskItem = {
	key: string;
	id: TaskId;
};

type ListState = {
	pending: TaskItem[];
	done: TaskItem[];
	checking: string | null;
};

const initialState: ListState = {
	pending: [
		{ key: "runtime", id: "runtime" },
		{ key: "unsafe", id: "unsafe" },
		{ key: "errors", id: "errors" },
	],
	done: [{ key: "boilerplate", id: "boilerplate" }],
	checking: null,
};

function completeTop(state: ListState): ListState {
	const top = state.pending[0];
	if (!top) return { ...state, checking: null };

	return {
		pending: state.pending.slice(1),
		done: [top, ...state.done],
		checking: null,
	};
}

export function EnforceInvariantsStage() {
	const reduce = useReducedMotion();

	return (
		<Stage.Root bottomEdge>
			<Stage.FullWidthPart className="flex items-end justify-center">
				<m.div
					initial={reduce ? false : { opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ duration: 0.45, ease: easeOutExpo }}
				>
					<OptimizingBadge />
				</m.div>
			</Stage.FullWidthPart>

			<Stage.Part>
				<CopyReveal>
					<Stage.SmallText>STAGE 4/5</Stage.SmallText>
					<Stage.Title>Enforce Invariants</Stage.Title>
					<Stage.Description>
						Harden the system by strictly enforcing invariants, error handling,
						concurrency patterns, and safety guarantees.
					</Stage.Description>
				</CopyReveal>
			</Stage.Part>

			<Stage.FullWidthPart className="flex min-h-0 w-full justify-center px-4">
				<TaskList reduce={Boolean(reduce)} />
			</Stage.FullWidthPart>
		</Stage.Root>
	);
}

function OptimizingBadge() {
	return (
		<Chip variant="mono">
			<BrandIcon color={rustBrand.color} path={rustBrand.path} />
			Optimizing System
		</Chip>
	);
}

const listStyle = defineClassName(
	"relative flex h-full w-full max-w-3xl min-w-0 flex-col gap-2.5",
);

function TaskList({ reduce }: { reduce: boolean }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.35 });
	const [state, setState] = useState(initialState);
	const stateRef = useRef(state);
	stateRef.current = state;

	useEffect(() => {
		if (reduce || !inView) return;

		let cancelled = false;
		let timer = 0;

		const wait = (ms: number) =>
			new Promise<void>((resolve) => {
				timer = window.setTimeout(resolve, ms);
			});

		const loop = async () => {
			await wait(1200);
			while (!cancelled) {
				const top = stateRef.current.pending[0];
				if (!top) return;

				setState((current) => ({ ...current, checking: top.key }));
				await wait(450);
				if (cancelled) return;

				const last = stateRef.current.pending.length <= 1;
				setState(completeTop);
				if (last) return;
				await wait(2500);
			}
		};

		void loop();

		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [inView, reduce]);

	return (
		<m.div
			ref={ref}
			className={listStyle}
			initial={reduce ? false : { opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={viewportOnce}
			transition={{ duration: 0.5, ease: easeOutExpo }}
		>
			<LayoutGroup>
				{state.pending.map((item) => (
					<TaskRow
						key={item.key}
						item={item}
						done={false}
						checked={state.checking === item.key}
						layout={!reduce}
					/>
				))}
				<DoneDivider />
				{state.done.map((item) => (
					<TaskRow key={item.key} item={item} done checked layout={!reduce} />
				))}
			</LayoutGroup>
		</m.div>
	);
}

function DoneDivider() {
	return (
		<div className="flex items-center gap-3 py-0.5">
			<span className="h-px flex-1 bg-border" />
			<span className="text-xs text-muted-foreground">Done</span>
			<span className="h-px flex-1 bg-border" />
		</div>
	);
}

const rowStyle = defineClassName(
	"flex w-full min-w-0 items-center gap-3",
	"rounded-lg bg-surface",
	"px-4 py-3.5 sm:px-5 sm:py-4",
	"text-sm sm:text-base",
);

function TaskRow({
	item,
	done,
	checked,
	layout,
}: {
	item: TaskItem;
	done: boolean;
	checked: boolean;
	layout: boolean;
}) {
	return (
		<m.div
			layout={layout || undefined}
			layoutId={layout ? item.key : undefined}
			className={defineClassName(rowStyle, done && "opacity-40")}
			transition={{ layout: { duration: 0.55, ease: easeOutExpo } }}
		>
			<Checkbox checked={checked} />
			<span className={done ? "text-muted-foreground" : undefined}>
				{catalog[item.id]}
			</span>
		</m.div>
	);
}

function Checkbox({ checked }: { checked: boolean }) {
	return (
		<span className="flex size-5 shrink-0 items-center justify-center rounded-[5px] border-2 border-accent-500">
			<m.span
				initial={false}
				animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
				transition={{ duration: 0.2, ease: easeOutExpo }}
				className="flex"
			>
				<CheckIcon className="size-3.5 text-accent-500" strokeWidth={3} />
			</m.span>
		</span>
	);
}
