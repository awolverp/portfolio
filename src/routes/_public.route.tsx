import { createFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Navbar } from "#/components/layout/navbar";
import { ThemeProvider } from "#/hooks/theme";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<ThemeProvider>
			<LazyMotion features={domAnimation} strict>
				<Navbar />
				<Outlet />
			</LazyMotion>
		</ThemeProvider>
	);
}
