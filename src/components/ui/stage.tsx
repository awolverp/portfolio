import { defineClassName } from "#/lib/styles";

type RootProps = React.ComponentProps<"section"> & {
	bottomEdge?: boolean;
};

function Root({
	className,
	children,
	bottomEdge = false,
	...props
}: RootProps) {
	return (
		<section
			className={defineClassName(
				"relative flex flex-col justify-center items-center gap-8 h-screen overflow-hidden",
				"snap-start snap-always",
				className,
			)}
			{...props}
		>
			{bottomEdge && (
				<div className="absolute inset-0 bg-linear-to-b from-transparent from-85% to-background z-0 select-none" />
			)}
			{children}
		</section>
	);
}

function FullWidthPart({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={defineClassName("flex-1 text-center -z-10", className)}
			{...props}
		/>
	);
}

function Part({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={defineClassName(
				"flex flex-col justify-center items-center h-fit text-center gap-4 z-10",
				className,
			)}
			{...props}
		/>
	);
}

function SmallText({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={defineClassName(
				"text-center text-xs md:text-sm tracking-wide font-light",
				className,
			)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={defineClassName(
				"text-2xl md:text-3xl lg:text-4xl font-bold",
				className,
			)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={defineClassName("md:text-lg max-w-xl", className)}
			{...props}
		/>
	);
}

export const Stage = {
	Root,
	FullWidthPart,
	Part,
	SmallText,
	Title,
	Description,
};
