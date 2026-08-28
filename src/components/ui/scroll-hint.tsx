import { ChevronsDown as ChevronsDownIcon } from "lucide-react";
import { defineClassName } from "#/lib/styles";

type ScrollHintProps = {
	children: React.ReactNode;
	className?: string;
};

export function ScrollHint({ children, className }: ScrollHintProps) {
	return (
		<div
			className={defineClassName(
				"flex flex-col items-center justify-center gap-3",
				className,
			)}
		>
			<p className="text-center text-sm tracking-wide font-light">{children}</p>
			<ChevronsDownIcon className="animate-bounce" aria-hidden="true" />
		</div>
	);
}
