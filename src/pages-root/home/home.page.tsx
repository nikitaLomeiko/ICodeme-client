import {
  ILevel,
  Level,
  Step,
  StepLine,
  useStepByLevel,
} from "@/entities/study";
import { mockLevels } from "../../../app/mock.data";
import { WorkZone } from "@/widgets/study-view";
import { useState } from "react";

export const HomePage = () => {
  const [levels] = useState<ILevel[]>(mockLevels);
  const stepsGroupedByLevel = useStepByLevel(levels);
  return (
    <WorkZone>
      {levels.map((level, lvlIdx) => {
        const maxY = Math.max(
          350,
          ...stepsGroupedByLevel[level.id].map(
            (item) => (item.step.position?.y || 0) + 130,
          ),
        );

        return (
          <Level {...level} maxY={maxY} index={lvlIdx + 1}>
            <StepLine levelSteps={stepsGroupedByLevel[level.id]} />

            {level.steps.map((item, index) => (
              <Step {...item} stepNumber={index + 1} />
            ))}
          </Level>
        );
      })}
    </WorkZone>
  );
};
