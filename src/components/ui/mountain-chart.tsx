import { useEffect, useRef } from "react";
import { cn } from "#/lib/styles";

// A 2D canvas point: [x, y] in CSS pixels.
type Point = readonly [number, number];

// How many samples the generated ridge uses. More points = smoother, more work.
const POINT_COUNT = 56;

// Duration of the initial "draw the line" animation.
const DRAW_MS = 1700;

// How long one pass of the traveling light takes.
const LIGHT_MS = 2800;

// Wait this long after mount before the light starts moving.
const LIGHT_DELAY_MS = 400;

// Trailing highlight length as a fraction of the full path.
const TRAIL = 0.07;

// Ease-out so the stroke races at first and settles near the end.
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

// Tiny seeded PRNG so the same seed always yields the same mountain.
function mulberry32(seed: number) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Build a mountain-like polyline in screen space.
// Canvas Y grows downward, so a "positive" (up-and-to-the-right) chart
// means startY is larger than endY. Values stay clamped inside the view.
function generateMountain(
	width: number,
	height: number,
	seed: number,
): Point[] {
	const rand = mulberry32(seed);

	// Normalized Y: 0 = top of the canvas, 1 = bottom.
	const start = 0.76 + rand() * 0.08; // left side, near the bottom
	const end = 0.24 + rand() * 0.1; // right side, higher on screen

	// A few sine layers give hills without looking like raw noise.
	const waves = [
		{
			amp: 0.07 + rand() * 0.05,
			freq: 1 + rand() * 1.1,
			phase: rand() * Math.PI * 2,
		},
		{
			amp: 0.035 + rand() * 0.03,
			freq: 2.4 + rand() * 1.8,
			phase: rand() * Math.PI * 2,
		},
		{
			amp: 0.012 + rand() * 0.018,
			freq: 6 + rand() * 3.5,
			phase: rand() * Math.PI * 2,
		},
	];

	const pts: Point[] = [];
	for (let i = 0; i < POINT_COUNT; i++) {
		const t = i / (POINT_COUNT - 1); // 0 on the left, 1 on the right
		let y = start + (end - start) * t; // rising baseline (positive trend)

		for (const wave of waves) {
			y += wave.amp * Math.sin((t * wave.freq + wave.phase) * Math.PI * 2);
		}

		// Keep the ridge on-canvas so the filled area never inverts.
		y = Math.min(0.9, Math.max(0.12, y));
		pts.push([t * width, y * height]);
	}

	return pts;
}

// Prefix-sum of segment lengths. cum[i] = distance along the path to point i.
function lengths(pts: Point[]) {
	const cum = new Float64Array(pts.length);
	for (let i = 1; i < pts.length; i++) {
		cum[i] =
			cum[i - 1] +
			Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
	}
	return cum;
}

// Point at a given arc-length along the polyline (linear interpolation).
function at(pts: Point[], cum: Float64Array, len: number): Point {
	const last = pts.length - 1;
	if (len <= 0) return pts[0];
	if (len >= cum[last]) return pts[last];

	// Binary search for the segment that contains `len`.
	let lo = 1;
	let hi = last;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (cum[mid] < len) lo = mid + 1;
		else hi = mid;
	}

	const span = cum[lo] - cum[lo - 1];
	const t = span === 0 ? 0 : (len - cum[lo - 1]) / span;
	const a = pts[lo - 1];
	const b = pts[lo];
	return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

// Sub-polyline between two arc-lengths. Used for the reveal and the light trail.
function slice(pts: Point[], cum: Float64Array, from: number, to: number) {
	const total = cum[cum.length - 1];
	const end = Math.min(total, Math.max(0, to));
	const start = Math.min(end, Math.max(0, from));
	const out: Point[] = [at(pts, cum, start)];

	for (let i = 1; i < pts.length && cum[i] < end; i++) {
		if (cum[i] > start) out.push(pts[i]);
	}

	const tail = at(pts, cum, end);
	const prev = out[out.length - 1];
	if (prev[0] !== tail[0] || prev[1] !== tail[1]) out.push(tail);
	return out;
}

type CssVar = `--${string}`;

// Theme tokens the chart reads from computed styles.
type ChartColors = {
	stroke: CssVar;
	fillTop: CssVar;
	fillMid: CssVar;
	light: CssVar;
	glow: CssVar;
};

type Rgb = readonly [number, number, number];

type Palette = {
	stroke: Rgb;
	fillTop: Rgb;
	fillMid: Rgb;
	light: Rgb;
	glow: Rgb;
};

const defaultColors = {
	stroke: "--accent-400",
	fillTop: "--accent-600",
	fillMid: "--accent-800",
	light: "--accent-200",
	glow: "--accent-300",
} as const satisfies ChartColors;

// Parse #rgb / #rrggbb / rgb() / rgba() into an [r, g, b] tuple.
function parseRgb(value: string): Rgb | null {
	if (value.startsWith("#")) {
		const hex =
			value.length === 4
				? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
				: value;
		if (hex.length !== 7) return null;
		return [
			Number.parseInt(hex.slice(1, 3), 16),
			Number.parseInt(hex.slice(3, 5), 16),
			Number.parseInt(hex.slice(5, 7), 16),
		];
	}

	const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
	if (!match) return null;
	return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function rgba(rgb: Rgb, value: number) {
	return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${value})`;
}

// Resolve a CSS custom property to RGB.
// Setting it as `color` lets the browser expand tokens / color-mix / etc.
function readVar(
	el: HTMLElement,
	probe: CanvasRenderingContext2D,
	name: CssVar,
) {
	const value = getComputedStyle(el).getPropertyValue(name).trim();
	if (!value) return null;

	const prevColor = el.style.color;
	el.style.color = value;
	const computed = getComputedStyle(el).color;
	el.style.color = prevColor;

	probe.fillStyle = computed;
	const fromFill = parseRgb(String(probe.fillStyle));
	if (fromFill) return fromFill;

	const fromComputed = parseRgb(computed);
	if (fromComputed) return fromComputed;

	// Last resort: paint one pixel and read it back.
	probe.clearRect(0, 0, 1, 1);
	probe.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
	return a === 0 ? null : ([r, g, b] as const);
}

function readPalette(el: HTMLElement, names: ChartColors): Palette | null {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;
	const probe = canvas.getContext("2d");
	if (!probe) return null;

	const stroke = readVar(el, probe, names.stroke);
	const fillTop = readVar(el, probe, names.fillTop);
	const fillMid = readVar(el, probe, names.fillMid);
	const light = readVar(el, probe, names.light);
	const glow = readVar(el, probe, names.glow);
	if (!stroke || !fillTop || !fillMid || !light || !glow) return null;

	return { stroke, fillTop, fillMid, light, glow };
}

// Stroke/fill a polyline. Caller sets styles before fill() / stroke().
function trace(ctx: CanvasRenderingContext2D, pts: Point[]) {
	ctx.beginPath();
	ctx.moveTo(pts[0][0], pts[0][1]);
	for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
}

type MountainChartProps = {
	className?: string;
	colors?: ChartColors;
};

export function MountainChart({
	className,
	colors = defaultColors,
}: MountainChartProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// One seed per mount so resize keeps the same silhouette.
	const seedRef = useRef((Math.random() * 0xffffffff) >>> 0);
	const { stroke, fillTop, fillMid, light, glow } = colors;

	useEffect(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!wrap || !canvas || !ctx) return;
		const colorVars = { stroke, fillTop, fillMid, light, glow };

		// Honor OS "reduce motion": skip the draw + light loop.
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let raf = 0;
		let startedAt: number | null = null;
		let mapped: Point[] = [];
		let cum = new Float64Array(0);
		const palette = readPalette(wrap, colorVars);
		let lastW = 0;
		let lastH = 0;
		let lastDpr = 0;

		const resize = () => {
			const { width, height } = wrap.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			if (width === lastW && height === lastH && dpr === lastDpr) return;

			lastW = width;
			lastH = height;
			lastDpr = dpr;

			// Backing store is in device pixels; drawing uses CSS pixels via setTransform.
			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			mapped = generateMountain(width, height, seedRef.current);
			cum = lengths(mapped);

			// If the animation already started, redraw immediately at the current time.
			if (startedAt != null) {
				draw(reduced ? startedAt + DRAW_MS : performance.now());
			}
		};

		const draw = (now: number) => {
			const w = lastW;
			const h = lastH;
			ctx.clearRect(0, 0, w, h);
			if (mapped.length < 2 || startedAt == null || !palette) return;

			const pathLen = Math.max(1, cum[cum.length - 1]);
			const elapsed = now - startedAt;
			const drawT = reduced ? 1 : easeOutCubic(Math.min(1, elapsed / DRAW_MS));
			const visibleLen = pathLen * drawT;
			const ridge = slice(mapped, cum, 0, visibleLen);
			const head = ridge[ridge.length - 1];

			// Closed mountain: ridge + drop to the bottom-right + bottom-left.
			trace(ctx, ridge);
			ctx.lineTo(head[0], h);
			ctx.lineTo(0, h);
			ctx.closePath();

			const fill = ctx.createLinearGradient(0, 0, 0, h);
			fill.addColorStop(0.35, rgba(palette.fillTop, 0.42 * drawT));
			fill.addColorStop(0.72, rgba(palette.fillMid, 0.26 * drawT));
			fill.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = fill;
			ctx.fill();

			// Ridge stroke on top of the fill.
			trace(ctx, ridge);
			ctx.strokeStyle = rgba(palette.stroke, 1);
			ctx.lineWidth = Math.max(2.5, w / 420);
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.shadowColor = rgba(palette.glow, 0.35);
			ctx.shadowBlur = 10;
			ctx.stroke();
			ctx.shadowBlur = 0;

			// Light only after the line has started to appear.
			if (reduced || elapsed <= LIGHT_DELAY_MS || drawT <= 0.08) return;

			const loopT = ((elapsed - LIGHT_DELAY_MS) % LIGHT_MS) / LIGHT_MS;
			const lightLen = Math.min(visibleLen, pathLen * loopT);
			const lightPos = at(mapped, cum, lightLen);
			const trail = slice(
				mapped,
				cum,
				Math.max(0, lightLen - pathLen * TRAIL),
				lightLen,
			);

			if (trail.length >= 2) {
				trace(ctx, trail);
				ctx.strokeStyle = rgba(palette.light, 0.95);
				ctx.lineWidth = Math.max(3.2, w / 340);
				ctx.shadowColor = rgba(palette.glow, 0.9);
				ctx.shadowBlur = 18;
				ctx.stroke();
				ctx.shadowBlur = 0;
			}

			const r = Math.max(16, w / 55);
			const glowGrad = ctx.createRadialGradient(
				lightPos[0],
				lightPos[1],
				0,
				lightPos[0],
				lightPos[1],
				r,
			);
			glowGrad.addColorStop(0, "rgba(255,255,255,0.95)");
			glowGrad.addColorStop(0.25, rgba(palette.light, 0.7));
			glowGrad.addColorStop(1, rgba(palette.glow, 0));
			ctx.fillStyle = glowGrad;
			ctx.beginPath();
			ctx.arc(lightPos[0], lightPos[1], r, 0, Math.PI * 2);
			ctx.fill();
		};

		const loop = (now: number) => {
			draw(now);
			raf = requestAnimationFrame(loop);
		};

		const start = () => {
			if (startedAt != null) return; // run the intro only once
			startedAt = performance.now();
			if (reduced) {
				draw(startedAt + DRAW_MS); // final frame, no rAF loop
				return;
			}
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(loop);
		};

		resize();

		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

		// Start when enough of the chart is on screen.
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) start();
			},
			{ threshold: 0.35 },
		);
		io.observe(wrap);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
		};
	}, [fillMid, fillTop, glow, light, stroke]);

	return (
		<div ref={wrapRef} className={cn("relative size-full", className)}>
			<canvas ref={canvasRef} className="block size-full" />
		</div>
	);
}
