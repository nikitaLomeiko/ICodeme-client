"use client";

import { AnimatePresence } from "framer-motion";
import { Layout } from "@/widgets/layout";
import { useQuiz } from "./store/use.quiz";
import { NavigationMap } from "./ui/navigation.map";
import { QuizCard } from "./ui/quiz.card";
import { ResultsScreen } from "./ui/results.screen";
import { StartScreen } from "./ui/start.screen";
import { QuizHead } from "./ui/quiz.head";

export const QuizPage: React.FC = () => {
  const { state } = useQuiz();

  return (
    <>
      {state.phase === "idle" && <StartScreen />}

      {state.phase === "running" && (
        <div className="max-w-3xl mx-auto">
          <QuizHead
            count={state.quiz?.questions?.length || 0}
            title={state.quiz?.title || ""}
          />

          <AnimatePresence mode="wait">
            <QuizCard />
          </AnimatePresence>

          {state.quiz?.settings.isNavigate && <NavigationMap />}
        </div>
      )}

      {state.phase === "finished" && <ResultsScreen />}
    </>
  );
};
