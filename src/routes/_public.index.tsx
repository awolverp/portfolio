import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { IntroduceStage } from "#/components/full-stack/introduce-stage";
import { InspectRequirementsStage } from "#/components/full-stack/stage-1";
import { DesignDatabaseStage } from "#/components/full-stack/stage-2";
import { DesignApiContractStage } from "#/components/full-stack/stage-3";
import { BuildBackendFrontendStage } from "#/components/full-stack/stage-4";
import { IntegrateAndShipStage } from "#/components/full-stack/stage-5";
import { Hero } from "#/components/hero";
import { HomeScrollContext } from "#/lib/home-scroll";
import { usePageMeta } from "#/lib/page-meta";

export const Route = createFileRoute("/_public/")({
	component: Home,
});

function Home() {
	const scrollRef = useRef<HTMLDivElement>(null);
	usePageMeta("/");

	return (
		<HomeScrollContext value={scrollRef}>
			<div
				ref={scrollRef}
				className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
			>
				<Hero />
				<IntroduceStage />
				<InspectRequirementsStage />
				<DesignDatabaseStage />
				<DesignApiContractStage />
				<BuildBackendFrontendStage />
				<IntegrateAndShipStage />
			</div>
		</HomeScrollContext>
	);
}
