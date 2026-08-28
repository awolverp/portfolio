import { m, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";
import { fadeUp, staggerParent, viewportOnce } from "#/lib/motion";
import { defineClassName } from "#/lib/styles";

type CopyRevealProps = {
	children: ReactNode;
	className?: string;
};

export function CopyReveal({ children, className }: CopyRevealProps) {
	const reduce = useReducedMotion();

	return (
		<m.div
			className={defineClassName("flex flex-col items-center gap-4", className)}
			initial={reduce ? false : "hidden"}
			whileInView="visible"
			viewport={viewportOnce}
			variants={staggerParent}
		>
			{Children.map(children, (child) =>
				child ? (
					<m.div variants={reduce ? undefined : fadeUp}>{child}</m.div>
				) : null,
			)}
		</m.div>
	);
}
