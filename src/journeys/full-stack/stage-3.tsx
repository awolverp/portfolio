import { ChevronRightIcon, CopyIcon, LockIcon } from "lucide-react";
import { m } from "motion/react";

import { Stage } from "#/components/stage";
import { Chip } from "#/components/ui/chip";
import { easeOutExpo, viewportOnceMotion } from "#/lib/motion";
import { cn, cva } from "#/lib/styles";

const endpoints = [
	{ method: "POST", path: "/users/", name: "Create User" },
	{ method: "GET", path: "/users/", name: "List & Search Users" },
	{ method: "GET", path: "/users/{id}", name: "Get User By Id" },
	{ method: "PATCH", path: "/users/{id}", name: "Update User" },
	{ method: "DEL", path: "/users/{id}", name: "Delete User By Id" },
	{ method: "POST", path: "/products/", name: "Create Product" },
	{ method: "GET", path: "/products/", name: "List Products" },
	{ method: "GET", path: "/products/{id}", name: "Get Product By Id" },
	{ method: "PATCH", path: "/products/{id}", name: "Update Product" },
	{ method: "DEL", path: "/products/{id}", name: "Delete Product" },
	{ method: "POST", path: "/orders/", name: "Create Order" },
	{ method: "GET", path: "/orders/", name: "List Orders" },
	{ method: "GET", path: "/orders/{id}", name: "Get Order By Id" },
	{ method: "POST", path: "/payments/", name: "Create Payment" },
	{ method: "GET", path: "/payments/{id}", name: "Get Payment By Id" },
] as const;

export function DesignApiContractStage() {
	return (
		<Stage.Root>
			<Stage.Layer position="top" className="flex items-end justify-center">
				<m.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnceMotion}
					transition={{ duration: 0.45, ease: easeOutExpo }}
				>
					<Chip font="mono">
						<span className="size-2 rounded-full bg-emerald-500 animate-ping" />
						/api/v1
					</Chip>
				</m.div>
			</Stage.Layer>

			<Stage.Content
				label="STAGE 3/5"
				title="Design API Contract"
				description="Define endpoints, request/response schemas, auth, and error handling. Create a clear contract so frontend and backend can move forward independently."
			/>

			<Stage.Edge side="bottom" />

			<Stage.Layer
				position="bottom"
				className="flex min-h-0 w-full justify-center px-4"
			>
				<EndpointList />
			</Stage.Layer>
		</Stage.Root>
	);
}

const panelStyle = cn(
	// layout
	"relative flex h-full w-full max-w-3xl min-w-0 flex-col gap-2.5",
	// overflow
	"overflow-hidden",
	// border
	"rounded-xl border border-border",
	// background
	"bg-surface/40",
	// spacing
	"p-2 sm:p-4",
);

function EndpointList() {
	return (
		<m.div
			className={panelStyle}
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={viewportOnceMotion}
			transition={{ duration: 0.5, ease: easeOutExpo }}
		>
			{endpoints.map((endpoint) => (
				<EndpointRow
					key={`${endpoint.method}-${endpoint.path}`}
					endpoint={endpoint}
				/>
			))}
		</m.div>
	);
}

const rowStyle = cn(
	// layout
	"flex min-w-0 items-center gap-2 sm:gap-4",
	// border
	"rounded-lg border border-border",
	// spacing
	"px-3 py-3 sm:px-5 sm:py-4",
	// text
	"text-sm sm:text-base",
);

const methodVariants = cva(
	cn(
		// layout
		"inline-flex min-w-12 shrink-0 items-center justify-center",
		// border
		"rounded-md",
		// spacing
		"px-2 py-1 sm:px-2.5",
		// text
		"text-xs font-semibold sm:text-sm",
	),
	{
		variants: {
			method: {
				POST: "bg-emerald-700 text-foreground",
				GET: "bg-accent-700 text-foreground",
				PATCH: "bg-amber-700 text-foreground",
				DEL: "bg-red-900/80 text-foreground",
			},
		},
	},
);

function EndpointRow({ endpoint }: { endpoint: (typeof endpoints)[number] }) {
	return (
		<div className={rowStyle}>
			<span className={methodVariants({ method: endpoint.method })}>
				{endpoint.method}
			</span>
			<span className="shrink-0 font-mono text-muted-foreground">
				{endpoint.path}
			</span>
			<span className="min-w-0 truncate text-muted-foreground">
				{endpoint.name}
			</span>
			<span className="ml-auto hidden shrink-0 items-center gap-2 text-muted-foreground sm:flex">
				<LockIcon className="size-5" />
				<CopyIcon className="size-5" />
				<ChevronRightIcon className="size-5" />
			</span>
		</div>
	);
}
