import {
  ILevel,
  Level,
  Module,
  Step,
  StepLine,
  useStepByLevel,
} from "@/entities/study";
import { currentModule, mockLevels } from "../../../app/mock.data";
import { Layout } from "@/widgets/layout";
import { WorkZone } from "@/widgets/study-view";
import { useState } from "react";

export const HomePage = () => {
  const [levels] = useState<ILevel[]>(mockLevels);
  const stepsGroupedByLevel = useStepByLevel(levels);
  return (
    <Layout>
      <WorkZone>
        <Module
          id="1"
          isCompleted={false}
          isCurrent={true}
          title={currentModule.title}
          description={currentModule.description}
        >
          {levels.map((level, lvlIdx) => {
            const maxY = Math.max(
              350,
              ...stepsGroupedByLevel[level.id].map(
                (item) => (item.step.position?.y || 0) + 130,
              ),
            );
            const maxX = Math.max(
              600,
              ...stepsGroupedByLevel[level.id].map(
                (item) => (item.step.position?.x || 0) + 340,
              ),
            );

            return (
              <Level {...level} maxX={maxX} maxY={maxY} index={lvlIdx + 1}>
                <StepLine levelSteps={stepsGroupedByLevel[level.id]} />

                {level.steps.map((item, index) => (
                  <Step {...item} stepNumber={index + 1} />
                ))}
              </Level>
            );
          })}
        </Module>
      </WorkZone>
    </Layout>
  );
};
