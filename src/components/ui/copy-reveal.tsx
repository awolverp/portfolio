import { m, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";

import {
	fadeUpMotion,
	staggerParentMotion,
	viewportOnceMotion,
} from "#/lib/motion";
import { cn } from "#/lib/styles";

type CopyRevealProps = {
	children: ReactNode;
	className?: string;
};

export function CopyReveal({ children, className }: CopyRevealProps) {
	const reduce = useReducedMotion();

	return (
		<m.div
			className={cn("flex flex-col items-center gap-4", className)}
			initial={reduce ? false : "hidden"}
			whileInView="visible"
			viewport={viewportOnceMotion}
			variants={staggerParentMotion}
			data-slot="copy-reveal"
		>
			{Children.map(children, (child) =>
				child ? (
					<m.div
						data-slot="copy-reveal-child"
						variants={reduce ? undefined : fadeUpMotion}
					>
						{child}
					</m.div>
				) : null,
			)}
		</m.div>
	);
}
