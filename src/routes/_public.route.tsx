import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "#/components/navbar";
import { ThemeProvider } from "#/hooks/theme";

export const Route = createFileRoute("/_public")({
	component: PublicComponent,
});

function PublicComponent() {
	return (
		<ThemeProvider>
			<Navbar />
			<Outlet />
		</ThemeProvider>
	);
}
