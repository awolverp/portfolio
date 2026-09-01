import { Check as CheckIcon, RocketIcon } from "lucide-react";
import { LayoutGroup, m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Stage } from "#/components/stage";
import { Chip } from "#/components/ui/chip";
import { easeOutExpo, viewportOnceMotion } from "#/lib/motion";
import { cn } from "#/lib/styles";

const catalog = {
	runtime: "Add runtime checks",
	unsafe: "Use unsafe only in small",
	errors: "Better error handling",
	boilerplate: "Remove boilerplates",
} as const;

type TaskItem = {
	key: string;
	id: keyof typeof catalog;
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
	return (
		<Stage.Root>
			<Stage.Layer position="top" className="flex items-end justify-center">
				<Chip font="mono">
					<RocketIcon className="size-5 text-orange-400" />
					Optimizing System
				</Chip>
			</Stage.Layer>

			<Stage.Content
				label={4}
				title="Inforce Invariants"
				description="Harden the system by strictly enforcing invariants, error handling, concurrency patterns, and safety guarantees."
			/>

			<Stage.Edge side="bottom" />

			<Stage.Layer
				position="bottom"
				className="flex min-h-0 w-full justify-center px-4"
			>
				<TaskList />
			</Stage.Layer>
		</Stage.Root>
	);
}

const listStyle = cn(
	"relative flex h-full w-full max-w-3xl min-w-0 flex-col gap-2.5",
);

function TaskList() {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.35 });
	const [state, setState] = useState(initialState);
	const stateRef = useRef(state);
	stateRef.current = state;

	useEffect(() => {
		if (!inView) return;

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
	}, [inView]);

	return (
		<m.div
			ref={ref}
			className={listStyle}
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={viewportOnceMotion}
			transition={{ duration: 0.5, ease: easeOutExpo }}
		>
			<LayoutGroup>
				{state.pending.map((item) => (
					<TaskRow
						key={item.key}
						item={item}
						done={false}
						checked={state.checking === item.key}
					/>
				))}
				<DoneDivider />
				{state.done.map((item) => (
					<TaskRow key={item.key} item={item} done checked />
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

const rowStyle = cn(
	"flex w-full min-w-0 items-center gap-3",
	"rounded-lg bg-surface",
	"px-4 py-3.5 sm:px-5 sm:py-4",
	"text-sm sm:text-base",
);

function TaskRow({
	item,
	done,
	checked,
}: {
	item: TaskItem;
	done: boolean;
	checked: boolean;
}) {
	return (
		<m.div
			layout={true}
			layoutId={item.key}
			className={cn(rowStyle, done && "opacity-40")}
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
