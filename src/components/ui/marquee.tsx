import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";

import { cn } from "#/lib/styles";

const MarqueeContext = createContext<{ gap: string } | null>(null);

export type MarqueeProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
	children: ReactNode;
	/** Animation duration. Lower is faster. */
	duration?: `${number}s` | `${number}ms`;
	/** Space between items. Any CSS length. */
	gap?: string;
	/** Width of the fade on each side. Any CSS length. */
	fade?: string;
	/** Scroll toward the left (default) or the right. */
	direction?: "left" | "right";
	pauseOnHover?: boolean;
};

function Root({
	children,
	className,
	duration = "30s",
	gap = "2rem",
	fade = "5rem",
	direction = "left",
	pauseOnHover = true,
	style,
	...props
}: MarqueeProps) {
	const animationName = `marquee-x-${useId().replace(/:/g, "")}`;

	return (
		<MarqueeContext.Provider value={{ gap }}>
			<div
				className={cn("relative w-full overflow-hidden", className)}
				data-marquee=""
				data-pause-on-hover={pauseOnHover ? "" : undefined}
				style={
					{
						"--marquee-duration": duration,
						"--marquee-gap": gap,
						"--marquee-fade": fade,
						WebkitMaskImage:
							"linear-gradient(to right, transparent, #000 var(--marquee-fade), #000 calc(100% - var(--marquee-fade)), transparent)",
						maskImage:
							"linear-gradient(to right, transparent, #000 var(--marquee-fade), #000 calc(100% - var(--marquee-fade)), transparent)",
						...style,
					} as CSSProperties
				}
				{...props}
			>
				<style>{`
          @keyframes ${animationName} {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }

          [data-marquee][data-pause-on-hover]:hover [data-marquee-track] {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            [data-marquee-track] {
              animation: none !important;
            }
          }
        `}</style>

				<div
					data-marquee-track=""
					className="flex w-max will-change-transform"
					style={{
						// Longhands only. The `animation` shorthand would lock
						// animation-play-state to "running" as an inline style,
						// which beats any hover class or stylesheet rule.
						animationName,
						animationDuration: "var(--marquee-duration)",
						animationTimingFunction: "linear",
						animationIterationCount: "infinite",
						animationDirection: direction === "right" ? "reverse" : "normal",
					}}
				>
					<div className="flex shrink-0">{children}</div>
					<div className="flex shrink-0" aria-hidden>
						{children}
					</div>
				</div>
			</div>
		</MarqueeContext.Provider>
	);
}

export type MarqueeItemProps = ComponentPropsWithoutRef<"div">;

function Item({ className, style, ...props }: MarqueeItemProps) {
	const ctx = useContext(MarqueeContext);

	return (
		<div
			className={cn("shrink-0", className)}
			style={
				{
					paddingRight: ctx?.gap,
					...style,
				} as CSSProperties
			}
			{...props}
		/>
	);
}

export const Marquee = { Root, Item };
