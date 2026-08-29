import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "#/lib/styles";

const chipVariants = cva(
	cn(
		"inline-flex items-center justify-center",
		"rounded-full",
		"whitespace-nowrap",
		"[&_svg]:shrink-0 [&_svg]:pointer-events-none",
	),
	{
		variants: {
			variant: {
				default: "border border-border bg-surface",
				secondary: "border border-transparent bg-muted text-muted-foreground",
				outline: "border border-border bg-transparent",
				accent: "border-x-4 border-accent-800 bg-surface",
				ghost: "border border-transparent bg-transparent",
			},
			size: {
				sm: "gap-1 px-2.5 py-1 text-xs [&_svg]:size-3.5",
				md: "gap-1.5 px-3 py-1.5 text-sm [&_svg]:size-4",
				lg: "gap-2 px-4 py-2 text-sm [&_svg]:size-5",
			},
			font: {
				sans: "font-medium",
				mono: "font-mono",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			font: "sans",
		},
	},
);

type ChipProps = ComponentProps<"span"> & VariantProps<typeof chipVariants>;

function Chip({ className, variant, size, font, ...props }: ChipProps) {
	return (
		<span
			className={chipVariants({ variant, size, font, className })}
			{...props}
		/>
	);
}

export { Chip, chipVariants };
export type { ChipProps };
