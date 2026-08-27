import {
	ChevronRight as ChevronRightIcon,
	Copy as CopyIcon,
	Lock as LockIcon,
} from "lucide-react";
import { Stage } from "#/components/ui/stage";
import { classVarianceAuthority, defineClassName } from "#/lib/styles";

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
		<Stage.Root bottomEdge>
			<Stage.FullWidthPart className="flex items-end justify-center">
				<VersionBadge />
			</Stage.FullWidthPart>

			<Stage.Part>
				<Stage.SmallText>STAGE 3/5</Stage.SmallText>
				<Stage.Title>Design API Contract</Stage.Title>
				<Stage.Description>
					Define endpoints, request/response schemas, auth, and error handling.
					Create a clear contract so frontend and backend can move forward
					independently.
				</Stage.Description>
			</Stage.Part>

			<Stage.FullWidthPart className="flex min-h-0 w-full justify-center px-4">
				<EndpointList />
			</Stage.FullWidthPart>
		</Stage.Root>
	);
}

const versionStyle = defineClassName(
	// layout
	"inline-flex items-center gap-2",
	// border
	"rounded-full border border-border",
	// background
	"bg-surface",
	// spacing
	"px-3 py-1.5",
	// text
	"font-mono text-sm",
);

function VersionBadge() {
	return (
		<span className={versionStyle}>
			<span className="size-2 rounded-full bg-accent-500" />
			/api/v1
		</span>
	);
}

const panelStyle = defineClassName(
	// layout
	"flex h-full w-full max-w-3xl min-w-0 flex-col gap-2.5",
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
		<div className={panelStyle}>
			{endpoints.map((endpoint) => (
				<EndpointRow
					key={`${endpoint.method}-${endpoint.path}`}
					endpoint={endpoint}
				/>
			))}
		</div>
	);
}

const rowStyle = defineClassName(
	// layout
	"flex min-w-0 items-center gap-2 sm:gap-4",
	// border
	"rounded-lg border border-border",
	// spacing
	"px-3 py-3 sm:px-5 sm:py-4",
	// text
	"text-sm sm:text-base",
);

function EndpointRow({
	endpoint,
}: {
	endpoint: (typeof endpoints)[number];
}) {
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

const methodVariants = classVarianceAuthority(
	defineClassName(
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
		method: {
			POST: "bg-emerald-700 text-foreground",
			GET: "bg-accent-700 text-foreground",
			PATCH: "bg-amber-700 text-foreground",
			DEL: "bg-red-900/80 text-foreground",
		},
	},
);
