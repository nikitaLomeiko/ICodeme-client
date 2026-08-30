"use client";

import { motion } from "framer-motion";
import { getTextAnswer, isOptionSelected } from "../libs/utils/selectors";
import { goNextQuestion, selectOption, setTextAnswer } from "../store/actions";
import { useQuiz } from "../store/use.quiz";
import { ChoiceItem } from "./components/choice.item";
import { AnswerField } from "./components/answer.field";
import { TimerProvider } from "./components/timer.provider";
import { QuestionFooter } from "./components/question.footer";
import { QuestionHead } from "./components/question.head";

export const QuizCard: React.FC = () => {
  const { state, dispatch } = useQuiz();

  const { quiz, currentIndex, timeLeft, answers } = state;
  const question = state.quiz?.questions[currentIndex];
  const total = state.quiz?.questions.length;

  console.log(state);

  const handleSubmit = () => {
    dispatch(goNextQuestion());
  };

  return (
    <TimerProvider>
      <motion.div
        key={question?.id || 0}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-[var(--ui-background-secondary)] border border-[var(--ui-border)] rounded-2xl shadow-sm"
      >
        <div className="p-5 sm:p-7">
          <QuestionHead
            currentIndex={currentIndex}
            isMultiple={question?.multiple ?? false}
            points={question?.points ?? 0}
            timeLeft={timeLeft ?? 0}
            timeLimit={question?.timeLimit ?? 0}
            total={total || 0}
            type={question?.type || "choice"}
          />

          <h2 className="text-lg sm:text-xl font-bold text-[var(--ui-text)] leading-snug mb-6">
            {question?.title}
          </h2>

          {question?.type === "choice" ? (
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <ChoiceItem
                  id={option.id}
                  index={index}
                  label={option.label}
                  selected={isOptionSelected(answers, question, option.id)}
                  onClick={() => dispatch(selectOption(option.id))}
                />
              ))}
            </div>
          ) : (
            <AnswerField
              isNavigate={quiz?.settings.isNavigate || false}
              value={getTextAnswer(answers, question?.id || "0")}
              onSubmit={handleSubmit}
              onChange={(event) => dispatch(setTextAnswer(event.target.value))}
            />
          )}

          <QuestionFooter
            currentIndex={currentIndex}
            isNavigate={quiz?.settings.isNavigate || false}
            total={total || 0}
          />
        </div>
      </motion.div>
    </TimerProvider>
  );
};
