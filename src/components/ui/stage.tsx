import { defineClassName } from "#/lib/styles";

type RootProps = React.ComponentProps<"section"> & {
	linearOverlay?: boolean;
	radialOverlay?: boolean;
	bottomEdge?: boolean;
};

function Root({
	className,
	children,
	linearOverlay = false,
	radialOverlay = false,
	bottomEdge = false,
	...props
}: RootProps) {
	return (
		<section
			className={defineClassName(
				"relative flex flex-col justify-center items-center gap-8 min-h-screen overflow-hidden",
				className,
			)}
			{...props}
		>
			{linearOverlay && (
				<div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-0 opacity-25" />
			)}
			{radialOverlay && (
				<div className="absolute inset-0 bg-radial from-transparent to-background z-0 opacity-25" />
			)}
			{bottomEdge && (
				<div className="absolute inset-0 bg-linear-to-b from-transparent from-85% to-background z-0" />
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
			className={defineClassName("h-fit text-center space-y-4 z-10", className)}
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
