import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { IntroduceStage as FullStackIntroduceStage } from "#/components/full-stack/introduce-stage";
import { InspectRequirementsStage } from "#/components/full-stack/stage-1";
import { DesignDatabaseStage } from "#/components/full-stack/stage-2";
import { DesignApiContractStage } from "#/components/full-stack/stage-3";
import { BuildBackendFrontendStage } from "#/components/full-stack/stage-4";
import { IntegrateAndShipStage } from "#/components/full-stack/stage-5";
import { Hero } from "#/components/hero";
import { IntroduceStage as RustIntroduceStage } from "#/components/rust/introduce-stage";
import { SpikeTheCoreStage } from "#/components/rust/stage-1";
import { ModelWithTypesStage } from "#/components/rust/stage-2";
import { GrowIterativelyStage } from "#/components/rust/stage-3";
import { EnforceInvariantsStage } from "#/components/rust/stage-4";
import { BenchmarkAndShipStage } from "#/components/rust/stage-5";
import { HomeScrollContext } from "#/lib/home-scroll";
import { usePageMeta } from "#/lib/page-meta";
import { useTheme } from "#/lib/theme";

export const Route = createFileRoute("/_public/")({
	component: Home,
});

function Home() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();
	usePageMeta("/");

	return (
		<HomeScrollContext value={scrollRef}>
			<div
				ref={scrollRef}
				className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
			>
				<Hero />
				{theme === "rust" ? <RustJourney /> : <FullStackJourney />}
			</div>
		</HomeScrollContext>
	);
}

function FullStackJourney() {
	return (
		<>
			<FullStackIntroduceStage />
			<InspectRequirementsStage />
			<DesignDatabaseStage />
			<DesignApiContractStage />
			<BuildBackendFrontendStage />
			<IntegrateAndShipStage />
		</>
	);
}

function RustJourney() {
	return (
		<>
			<RustIntroduceStage />
			<SpikeTheCoreStage />
			<ModelWithTypesStage />
			<GrowIterativelyStage />
			<EnforceInvariantsStage />
			<BenchmarkAndShipStage />
		</>
	);
}
