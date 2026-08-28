import { cva, type VariantProps } from "class-variance-authority";
import { defineClassName } from "#/lib/styles";

const chipVariants = cva(
	defineClassName(
		"inline-flex items-center gap-2",
		"rounded-full",
		"bg-surface",
		"whitespace-nowrap text-sm",
		"[&_svg]:size-5 [&_svg]:shrink-0",
	),
	{
		variants: {
			variant: {
				default: "border border-border px-4 py-2 font-medium",
				mono: "border border-border px-3 py-1.5 font-mono",
				topic:
					"h-12 md:h-14 lg:h-16 border-x-4 border-accent-800 px-3 md:px-4 lg:px-5 font-medium",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type ChipProps = React.ComponentProps<"span"> &
	VariantProps<typeof chipVariants>;

function Chip({ className, variant, ...props }: ChipProps) {
	return <span className={chipVariants({ variant, className })} {...props} />;
}

export { Chip, chipVariants };
export type { ChipProps };
