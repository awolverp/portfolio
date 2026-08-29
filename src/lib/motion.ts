import type { Variants } from "motion/react";

/** Expo-style ease-out: fast start, long decelerating finish. */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/**
 * Viewport trigger for `whileInView`.
 * Fires once when ~50% of the element is visible; does not re-run on scroll-back.
 */
export const viewportOnceMotion = {
	once: true,
	amount: 0.5,
} as const;

/**
 * Fade in while rising 16px into place.
 * Use as `variants={fadeUp}` with `initial="hidden"` / `animate="visible"`
 * (or `whileInView="visible"` + `viewport={viewportOnce}`).
 */
export const fadeUpMotion: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: easeOutExpo },
	},
};

/**
 * Orchestrates child variants: waits 80ms, then starts each child 100ms after the previous.
 * Put this on the parent; children should use variants like `fadeUp`.
 */
export const staggerParentMotion: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.08 },
	},
};

/**
 * Line-mask reveal: the element starts 110% below its box (clipped by
 * `overflow: hidden` on the parent) and slides up into place while fading in.
 * Pair with a wrapping span/div that has `overflow: hidden` so the extra 10%
 * never peeks before the animation starts.
 */
export const lineRevealMotion = {
	hidden: { y: "110%", opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: easeOutExpo },
	},
};

/**
 * Same mask reveal as `lineReveal`, offset by 120ms.
 * Use on a second line (subtitle, supporting copy) so it follows the first
 * instead of sharing a stagger parent.
 */
export const lineRevealDelayedMotion = {
	hidden: lineRevealMotion.hidden,
	visible: {
		...lineRevealMotion.visible,
		transition: { duration: 0.7, ease: easeOutExpo, delay: 0.12 },
	},
};
