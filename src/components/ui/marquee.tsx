import {
	Marquee as ArkMarquee,
	type MarqueeContentProps,
	type MarqueeEdgeProps,
	type MarqueeItemProps,
	type MarqueeRootProps,
	type MarqueeRootProviderProps,
	type MarqueeViewportProps,
	useMarquee,
} from "@ark-ui/react/marquee";
import { defineClassName } from "#/lib/styles";

const rootStyle = defineClassName(
	// layout
	"w-fit",
);

function Root({ className, ...props }: MarqueeRootProps) {
	return (
		<ArkMarquee.Root
			className={defineClassName(rootStyle, className)}
			{...props}
		/>
	);
}

function RootProvider({ className, ...props }: MarqueeRootProviderProps) {
	return (
		<ArkMarquee.RootProvider
			className={defineClassName(rootStyle, className)}
			{...props}
		/>
	);
}

function Item({ className, ...props }: MarqueeItemProps) {
	return (
		<ArkMarquee.Item
			className={defineClassName("shrink-0", className)}
			{...props}
		/>
	);
}

const edgeStyle = defineClassName(
	// position
	"absolute z-10",
	"data-[side=start]:start-0 data-[side=end]:end-0 data-[side=end]:left-auto",
	"data-[side=top]:top-0 data-[side=bottom]:bottom-0 data-[side=bottom]:top-auto",
	// size
	"data-[orientation=horizontal]:inset-y-0 data-[orientation=horizontal]:w-24",
	"data-[orientation=vertical]:inset-x-0 data-[orientation=vertical]:h-24",
	// fade
	"from-background to-transparent",
	"data-[side=start]:bg-linear-to-r data-[side=end]:bg-linear-to-l",
	"data-[side=top]:bg-linear-to-b data-[side=bottom]:bg-linear-to-t",
);

function Edge({ className, ...props }: MarqueeEdgeProps) {
	return (
		<ArkMarquee.Edge
			className={defineClassName(edgeStyle, className)}
			{...props}
		/>
	);
}

export const Marquee = {
	Root,
	RootProvider,
	Viewport: ArkMarquee.Viewport,
	Content: ArkMarquee.Content,
	Item,
	Edge,
	Context: ArkMarquee.Context,
};

export { useMarquee };
export type {
	MarqueeContentProps,
	MarqueeEdgeProps,
	MarqueeItemProps,
	MarqueeRootProps,
	MarqueeRootProviderProps,
	MarqueeViewportProps,
};
