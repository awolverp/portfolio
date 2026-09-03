import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "#/lib/styles";

type ArrowLinkProps = React.ComponentProps<"a"> & {
  label: string;
};

const arrowLinkStyle = cn(
  "group/arrow-link",
  "inline-flex items-center overflow-hidden",
  "h-12 rounded-full",
  "bg-surface border border-border",
  "transition-[padding] duration-150 ease-out",
  "pl-0 pr-0 hover:pl-5",
);

const labelStyle = cn(
  "max-w-0 overflow-hidden whitespace-nowrap opacity-0",
  "text-sm font-medium",
  "transition-all duration-150 ease-out",
  "group-hover/arrow-link:max-w-48 group-hover/arrow-link:opacity-100",
);

export function ArrowLink({ label, className, ...props }: ArrowLinkProps) {
  return (
    <a {...props} className={cn(arrowLinkStyle, className)}>
      <span className={labelStyle}>{label}</span>

      <span className="grid size-12 shrink-0 place-items-center">
        <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
