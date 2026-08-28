import type { Variants } from "motion/react";

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = {
	once: true,
	amount: 0.5,
} as const;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: easeOutExpo },
	},
};

export const staggerParent: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.08 },
	},
};
