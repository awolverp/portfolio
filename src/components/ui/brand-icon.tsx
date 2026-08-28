export function BrandIcon({ color, path }: { color: string; path: string }) {
	return (
		<svg viewBox="0 0 24 24" className="size-5" fill={color} aria-hidden="true">
			<path d={path} />
		</svg>
	);
}
