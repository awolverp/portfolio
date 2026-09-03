import { IntroduceStage } from "./introduction";
import { SpikeTheCoreStage } from "./stage-1";
import { ModelWithTypesStage } from "./stage-2";
import { GrowIterativelyStage } from "./stage-3";
import { EnforceInvariantsStage } from "./stage-4";
import { BenchmarkAndShipStage } from "./stage-5";

export function RustJourney() {
  return (
    <>
      <IntroduceStage />
      <SpikeTheCoreStage />
      <ModelWithTypesStage />
      <GrowIterativelyStage />
      <EnforceInvariantsStage />
      <BenchmarkAndShipStage />
    </>
  );
}
