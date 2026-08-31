import { createFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Footer } from "#/components/layout/footer";
import { Navbar } from "#/components/layout/navbar";
import { ThemeProvider } from "#/hooks/theme";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<ThemeProvider>
			<Navbar />
			<LazyMotion features={domAnimation} strict>
				<Outlet />
			</LazyMotion>
			<Footer />
		</ThemeProvider>
	);
}
