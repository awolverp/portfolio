import { ark } from "@ark-ui/react/factory";
import {
	classVarianceAuthority,
	defineClassName,
	type VariantProps,
} from "#/lib/styles";

const buttonVariants = classVarianceAuthority(
	defineClassName(
		// group
		"group/button",
		// layout
		"inline-flex shrink-0 items-center justify-center",
		// border
		"outline-none rounded-lg",
		// background
		"bg-clip-padding",
		// text
		"font-medium whitespace-nowrap",
		// transform
		"transition-colors",
		// accessibility
		"cursor-pointer select-none disabled:pointer-events-none disabled:opacity-disabled",
		// svg children
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	),
	{
		variant: {
			primary: "bg-accent-600 text-foreground hover:bg-accent-600/80",
			ghost: "text-accent-600 hover:bg-accent-600/10",
		},
		size: {
			xs: "h-8 gap-1.5 px-2.5",
			sm: "h-9 gap-1.5 px-2.5",
			default: "h-10 gap-1.5 px-4 text-base",
			lg: "h-11 gap-2 px-5 text-base",
		},
	},
);

type ButtonProps = React.ComponentProps<typeof ark.button> &
	VariantProps<typeof buttonVariants>;

function Button({
	className,
	variant = "primary",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<ark.button
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
export type { ButtonProps };
