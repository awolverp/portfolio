import { useEffect, useRef } from "react";
import { defineClassName } from "#/lib/styles";

type Point = readonly [number, number];

const POINTS: Point[] = [
	[0, 602],
	[15, 588],
	[30, 579],
	[45, 575],
	[60, 576],
	[75, 579],
	[90, 584],
	[105, 588],
	[120, 586],
	[135, 569],
	[150, 550],
	[165, 536],
	[180, 531],
	[195, 535],
	[210, 545],
	[225, 552],
	[240, 552],
	[255, 553],
	[270, 544],
	[285, 535],
	[300, 527],
	[315, 518],
	[330, 509],
	[345, 501],
	[360, 493],
	[375, 487],
	[390, 500],
	[405, 533],
	[420, 544],
	[435, 545],
	[450, 541],
	[465, 532],
	[480, 520],
	[495, 505],
	[510, 495],
	[525, 493],
	[540, 490],
	[555, 497],
	[570, 489],
	[585, 472],
	[600, 457],
	[615, 454],
	[630, 468],
	[645, 487],
	[660, 499],
	[675, 502],
	[690, 499],
	[705, 494],
	[720, 487],
	[735, 479],
	[750, 471],
	[765, 461],
	[780, 451],
	[795, 444],
	[810, 446],
	[825, 456],
	[840, 476],
	[855, 484],
	[870, 479],
	[885, 473],
	[900, 467],
	[915, 463],
	[930, 436],
	[950, 435],
	[970, 438],
	[990, 456],
	[1010, 463],
	[1030, 457],
	[1050, 450],
	[1070, 442],
	[1090, 432],
	[1110, 420],
	[1130, 415],
	[1150, 416],
	[1170, 413],
	[1190, 392],
	[1210, 368],
	[1230, 341],
	[1250, 309],
	[1270, 285],
	[1280, 285],
];

const SRC_W = 1280;
const SRC_H = 728;
const DRAW_MS = 1700;
const LIGHT_MS = 2800;
const LIGHT_DELAY_MS = 400;
const TRAIL = 0.07;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

function lengths(pts: Point[]) {
	const cum = new Float64Array(pts.length);

	for (let i = 1; i < pts.length; i++) {
		cum[i] =
			cum[i - 1] +
			Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
	}

	return cum;
}

function at(pts: Point[], cum: Float64Array, len: number): Point {
	const last = pts.length - 1;
	if (len <= 0) return pts[0];
	if (len >= cum[last]) return pts[last];

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
	const { stroke, fillTop, fillMid, light, glow } = colors;

	useEffect(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!wrap || !canvas || !ctx) return;
		const colorVars = { stroke, fillTop, fillMid, light, glow };

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let raf = 0;
		let startedAt: number | null = null;
		let mapped: Point[] = [];
		let cum = new Float64Array(0);
		const colors = readPalette(wrap, colorVars);
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

			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			mapped = POINTS.map(([x, y]) => [
				(x / SRC_W) * width,
				(y / SRC_H) * height,
			]);
			cum = lengths(mapped);

			if (startedAt != null) {
				draw(reduced ? startedAt + DRAW_MS : performance.now());
			}
		};

		const draw = (now: number) => {
			const w = lastW;
			const h = lastH;
			ctx.clearRect(0, 0, w, h);
			if (mapped.length < 2 || startedAt == null || !colors) return;

			const pathLen = Math.max(1, cum[cum.length - 1]);
			const elapsed = now - startedAt;
			const drawT = reduced ? 1 : easeOutCubic(Math.min(1, elapsed / DRAW_MS));
			const visibleLen = pathLen * drawT;
			const ridge = slice(mapped, cum, 0, visibleLen);
			const head = ridge[ridge.length - 1];

			trace(ctx, ridge);
			ctx.lineTo(head[0], h);
			ctx.lineTo(0, h);
			ctx.closePath();

			const fill = ctx.createLinearGradient(0, 0, 0, h);
			fill.addColorStop(0.35, rgba(colors.fillTop, 0.42 * drawT));
			fill.addColorStop(0.72, rgba(colors.fillMid, 0.26 * drawT));
			fill.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = fill;
			ctx.fill();

			trace(ctx, ridge);
			ctx.strokeStyle = rgba(colors.stroke, 1);
			ctx.lineWidth = Math.max(2.5, w / 420);
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.shadowColor = rgba(colors.glow, 0.35);
			ctx.shadowBlur = 10;
			ctx.stroke();
			ctx.shadowBlur = 0;

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
				ctx.strokeStyle = rgba(colors.light, 0.95);
				ctx.lineWidth = Math.max(3.2, w / 340);
				ctx.shadowColor = rgba(colors.glow, 0.9);
				ctx.shadowBlur = 18;
				ctx.stroke();
				ctx.shadowBlur = 0;
			}

			const r = Math.max(16, w / 55);
			const glow = ctx.createRadialGradient(
				lightPos[0],
				lightPos[1],
				0,
				lightPos[0],
				lightPos[1],
				r,
			);
			glow.addColorStop(0, "rgba(255,255,255,0.95)");
			glow.addColorStop(0.25, rgba(colors.light, 0.7));
			glow.addColorStop(1, rgba(colors.glow, 0));
			ctx.fillStyle = glow;
			ctx.beginPath();
			ctx.arc(lightPos[0], lightPos[1], r, 0, Math.PI * 2);
			ctx.fill();
		};

		const loop = (now: number) => {
			draw(now);
			raf = requestAnimationFrame(loop);
		};

		const start = () => {
			if (startedAt != null) return;
			startedAt = performance.now();
			if (reduced) {
				draw(startedAt + DRAW_MS);
				return;
			}
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(loop);
		};

		resize();

		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

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
		<div
			ref={wrapRef}
			className={defineClassName("relative size-full", className)}
		>
			<canvas ref={canvasRef} className="block size-full" />
		</div>
	);
}
