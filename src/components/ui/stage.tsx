import { defineClassName } from "#/lib/styles";

function Root({ className, ...props }: React.ComponentProps<"section">) {
	return (
		<section
			className={defineClassName(
				"relative flex flex-col justify-center items-center gap-0 min-h-screen overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function FullWidthPart({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={defineClassName("flex-1 text-center", className)}
			{...props}
		/>
	);
}

function Part({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={defineClassName("h-fit text-center space-y-4", className)}
			{...props}
		/>
	);
}

function SmallText({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={defineClassName(
				"text-center text-sm tracking-wide font-light",
				className,
			)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={defineClassName("text-4xl font-bold", className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={defineClassName("text-lg max-w-xl", className)} {...props} />
	);
}

// function RadialOverlay({ className, ...props }: React.ComponentProps<"div">) {
// 	return <div className={defineClassName("", className)} {...props} />;
// }

export const Stage = {
	Root,
	FullWidthPart,
	Part,
	SmallText,
	Title,
	Description,
};
