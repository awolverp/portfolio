import { cn } from "#/lib/styles";
import { CopyReveal } from "./ui/copy-reveal";

const rootStyle = cn(
  // layout
  "relative grid h-screen grid-rows-[1fr_auto_1fr] overflow-hidden",
);

function Root({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn(rootStyle, className)} data-slot="stage-root" {...props} />;
}

interface EdgeProps {
  side?: "bottom" | "top" | "both";
}

function Edge({ side = "bottom" }: EdgeProps) {
  return (
    <>
      {(side === "bottom" || side === "both") && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-b from-transparent to-background"
          data-slot="stage-edge"
        />
      )}
      {(side === "top" || side === "both") && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-t from-transparent to-background"
          data-slot="stage-edge"
        />
      )}
    </>
  );
}

type LayerProps = React.ComponentProps<"div"> & {
  position?: "top" | "bottom";
};

function Layer({ className, position = "top", ...props }: LayerProps) {
  return (
    <div
      className={cn(
        "relative z-0 min-h-0",
        position === "top" && "row-start-1",
        position === "bottom" && "row-start-3",
        className,
      )}
      data-slot="stage-layer"
      {...props}
    />
  );
}

const contentStyle = cn(
  // layout
  "z-10 row-start-2 mx-auto flex h-fit flex-col items-center justify-center gap-4",
  // padding
  "px-4 py-8",
  // text
  "text-center",
);

type ContentProps = {
  className?: string | null | false;
  label?: string | number;
  title: React.ReactNode;
  description: React.ReactNode;
  reveal?: boolean;
};

function Content({ label, title, description, reveal = true, className }: ContentProps) {
  const labelNode =
    typeof label === "number" ? (
      <span className="text-center text-sm font-black bg-foreground text-background px-4 py-1 rounded-sm">
        {`0${label}`.slice(-2)}
      </span>
    ) : (
      label && <p className="text-center text-xs font-light tracking-wide md:text-sm">{label}</p>
    );

  return reveal ? (
    <CopyReveal className={cn(contentStyle, className)}>
      {labelNode}
      <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">{title}</h3>
      <p className="max-w-xl md:text-lg">{description}</p>
    </CopyReveal>
  ) : (
    <div className={cn(contentStyle, className)} data-slot="stage-content">
      {labelNode}
      <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">{title}</h3>
      <p className="max-w-xl md:text-lg">{description}</p>
    </div>
  );
}

export const Stage = { Root, Layer, Edge, Content };
