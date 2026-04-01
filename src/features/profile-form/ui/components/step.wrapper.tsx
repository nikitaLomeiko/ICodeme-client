import { motion, AnimatePresence } from "framer-motion";
import { Button, ProgressBar, Title } from "@/shared/ui/kit";

interface IProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
  title: string;
  children: React.ReactNode;
}

export const StepWrapper: React.FC<IProps> = (props) => {
  const {
    currentStep,
    totalSteps,
    handleNext,
    handleBack,
    handleSubmit,
    progress,
    title,
    children,
  } = props;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <ProgressBar
          value={progress}
          size="md"
          segments={totalSteps}
          state="success"
          variant="segmented-capsule"
          trackVariant="solid"
          duration={300}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="mb-8"
        >
          <Title
            as="p"
            size="sm"
            weight="medium"
            color="gray-600"
            align="center"
          >
            {title}
          </Title>
        </motion.div>
      </AnimatePresence>

      <div className="min-h-[200px] mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            size="md"
            onClick={handleBack}
            className="flex-1"
          >
            Назад
          </Button>
        ) : (
          <div className="flex-1" />
        )}

        {currentStep < totalSteps - 1 ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            className="flex-1"
          >
            Далее
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            className="flex-1"
          >
            Завершить
          </Button>
        )}
      </div>
    </div>
  );
};
