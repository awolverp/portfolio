import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "#/components/layout/navbar";
import { ThemeProvider } from "#/lib/theme";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<ThemeProvider>
			<Navbar />
			<Outlet />
		</ThemeProvider>
	);
}
