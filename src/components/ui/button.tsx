import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/styles";

const buttonVariants = cva(
	cn(
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
		variants: {
			variant: {
				primary: "bg-accent-600 text-foreground hover:bg-accent-600/80",
				ghost: "text-accent-600 hover:bg-accent-600/10",
				link: "text-foreground underline-offset-4 hover:underline",
			},
			size: {
				xs: "h-8 gap-1.5 px-2.5",
				sm: "h-9 gap-1.5 px-2.5",
				default: "h-10 gap-1.5 px-4 text-base",
				lg: "h-11 gap-2 px-5 text-base",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

type ButtonProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants>;

function Button({
	className,
	variant = "primary",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<button
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
export type { ButtonProps };
