import {
	CircleSmall as CircleSmallIcon,
	Key as KeyIcon,
	Link as LinkIcon,
	Table2 as Table2Icon,
} from "lucide-react";
import { Stage } from "#/components/ui/stage";
import { defineClassName } from "#/lib/styles";

const tables = [
	{
		name: "users",
		columns: [
			{ name: "id", type: "uuid", kind: "pk" },
			{ name: "name", type: "string", kind: "column" },
			{ name: "email", type: "string", kind: "column" },
			{ name: "created_at", type: "timestamp", kind: "column" },
		],
	},
	{
		name: "products",
		columns: [
			{ name: "id", type: "uuid", kind: "pk" },
			{ name: "name", type: "string", kind: "column" },
			{ name: "price", type: "decimal", kind: "column" },
			{ name: "stock", type: "integer", kind: "column" },
		],
	},
	{
		name: "orders",
		columns: [
			{ name: "id", type: "uuid", kind: "pk" },
			{ name: "user_id", type: "users.id", kind: "fk" },
			{ name: "status", type: "enum", kind: "column" },
			{ name: "total", type: "decimal", kind: "column" },
		],
	},
	{
		name: "payments",
		columns: [
			{ name: "id", type: "uuid", kind: "pk" },
			{ name: "order_id", type: "orders.id", kind: "fk" },
			{ name: "amount", type: "decimal", kind: "column" },
			{ name: "status", type: "enum", kind: "column" },
		],
	},
] as const;

export function DesignDatabaseStage() {
	return (
		<Stage.Root radialOverlay>
			<Stage.FullWidthPart className="grid grid-cols-4 place-items-end">
				{tables.slice(0, 2).map((table, index) => (
					<SchemaCard
						key={table.name}
						table={table}
						gridColumn={2 * index + 1}
						className={index > 0 ? undefined : "hidden lg:block"}
					/>
				))}
			</Stage.FullWidthPart>

			<Stage.Part>
				<Stage.SmallText>STAGE 2/5</Stage.SmallText>
				<Stage.Title>Design Database & Project Architecture</Stage.Title>
				<Stage.Description>
					Design scalable data models and system architecture. Choose the right
					tech stack with security, performance, and long-term maintainability
					in mind.
				</Stage.Description>
			</Stage.Part>

			<Stage.FullWidthPart className="grid grid-cols-4 place-items-start">
				{tables.slice(2).map((table, index) => (
					<SchemaCard
						key={table.name}
						table={table}
						gridColumn={2 * index + 2}
						className={index === 0 ? undefined : "hidden lg:block"}
					/>
				))}
			</Stage.FullWidthPart>
		</Stage.Root>
	);
}

const cardStyle = defineClassName(
	// layout
	"w-60 text-left",
	// border
	"rounded-xl border border-border opacity-70",
	// background
	"bg-surface",
	// spacing
	"px-4 py-3",
);

interface SchemaCardProps {
	table: (typeof tables)[number];
	gridColumn: number;
}

function SchemaCard({
	table,
	gridColumn,
	className,
	...props
}: SchemaCardProps & React.ComponentProps<"article">) {
	return (
		<article
			className={defineClassName(cardStyle, className)}
			style={{ gridColumn: gridColumn }}
			{...props}
		>
			<header className="mb-2 flex items-center gap-2 border-b border-border pb-2 text-sm font-medium col-start-1">
				<Table2Icon className="size-4 shrink-0" />
				{table.name}
			</header>

			<ul className="space-y-1.5">
				{table.columns.map((column) => (
					<ColumnRow key={column.name} column={column} />
				))}
			</ul>
		</article>
	);
}

const columnStyle = defineClassName(
	"flex items-center justify-between gap-3",
	"text-sm",
);

function ColumnRow({
	column,
}: {
	column: (typeof tables)[number]["columns"][number];
}) {
	return (
		<li className={columnStyle}>
			<span className="flex items-center gap-2">
				<ColumnIcon kind={column.kind} />
				{column.name}
			</span>
			<span className="font-mono text-muted-foreground">{column.type}</span>
		</li>
	);
}

function ColumnIcon({ kind }: { kind: "pk" | "fk" | "column" }) {
	if (kind === "pk") {
		return <KeyIcon className="size-3.5 shrink-0 text-accent-400" />;
	}

	if (kind === "fk") {
		return <LinkIcon className="size-3.5 shrink-0 text-fuchsia-400" />;
	}

	return (
		<CircleSmallIcon className="size-3.5 shrink-0 text-muted-foreground" />
	);
}
