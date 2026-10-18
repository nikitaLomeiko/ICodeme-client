"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  chatIntroMessage,
  chatOutroMessage,
  chatQuestions,
} from "../../model/data/chat.data";

interface ChatStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const TYPING_DURATION_MS = 700;

export const ChatStep: React.FC<ChatStepProps> = ({ onChange }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const messageIdRef = useRef(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<Record<string, string>>({});

  const currentQuestion = chatQuestions[currentQuestionIndex];
  const totalQuestions = chatQuestions.length;

  const pushBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `bot-${messageIdRef.current++}`, sender: "bot", text },
    ]);
  };

  useEffect(() => {
    const timers = timersRef.current;

    const introTimer = setTimeout(() => {
      pushBotMessage(chatIntroMessage);

      const questionTimer = setTimeout(() => {
        pushBotMessage(chatQuestions[0].text);
        setIsTyping(false);
      }, TYPING_DURATION_MS);

      timers.push(questionTimer);
    }, TYPING_DURATION_MS);

    timers.push(introTimer);

    return () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const handleSelectOption = (option: string) => {
    if (isTyping || isFinished) return;

    answersRef.current[currentQuestion.id] = option;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${messageIdRef.current++}`,
        sender: "user",
        text: option,
      },
    ]);
    setIsTyping(true);

    const nextIndex = currentQuestionIndex + 1;

    const timer = setTimeout(() => {
      if (nextIndex < totalQuestions) {
        pushBotMessage(chatQuestions[nextIndex].text);
        setCurrentQuestionIndex(nextIndex);
        setIsTyping(false);
      } else {
        pushBotMessage(chatOutroMessage);
        setIsFinished(true);
        setIsTyping(false);
        onChange(JSON.stringify(answersRef.current));
      }
    }, TYPING_DURATION_MS);

    timersRef.current.push(timer);
  };

  return (
    <div className="flex flex-col h-[460px] rounded-2xl border border-[var(--ui-border)] shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[var(--ui-border)]">
        <img
          src="/logo/logo.gif"
          alt="Octo"
          className="w-9 h-9 rounded-full shrink-0"
        />
        <span className="text-lg font-semibold text-[var(--ui-text)]">
          Octo
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto chat-scroll px-4 py-4 space-y-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <img
                  src="/logo/logo.gif"
                  alt="Octo"
                  className="w-7 h-7 rounded-full mr-2 mt-1 shrink-0 self-end"
                />
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-line ${
                  message.sender === "bot"
                    ? "text-[var(--ui-text)] border border-[var(--ui-border)] rounded-bl-sm"
                    : "bg-[var(--ui-primary)] text-white rounded-br-sm"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <img
              src="/logo/logo.gif"
              alt="Octo"
              className="w-7 h-7 rounded-full mr-2 shrink-0"
            />
            <div className="rounded-xl rounded-bl-sm bg-[var(--ui-background)] border border-[var(--ui-border)] px-3.5 py-2.5 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--ui-text-muted)]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--ui-border)] px-4 py-3 space-y-2">
        {!isFinished && !isTyping && currentQuestion && (
          <>
            <p className="text-xs font-medium text-[var(--ui-text-muted)]">
              Выбери ответ:
            </p>
            <div className="max-h-[150px] overflow-y-auto chat-scroll flex flex-col gap-2 pr-1">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className="w-full flex items-center gap-2.5 text-left rounded-xl border border-[var(--ui-border)] px-3 py-2 text-sm text-[var(--ui-text)] leading-snug transition-colors duration-200 hover:border-[var(--ui-primary-hover)] bg-[var(--ui-primary)]/10 hover:bg-[var(--ui-primary)] cursor-pointer shrink-0"
                >
                  <span className="w-6 h-6 shrink-0 rounded-md bg-white border border-[var(--ui-border)] flex items-center justify-center text-xs font-bold text-black">
                    {index + 1}
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {isFinished && (
          <p className="text-sm text-[var(--ui-success)] text-center py-1">
            Готово! Нажми «Далее», чтобы продолжить ✅
          </p>
        )}

        {isTyping && !isFinished && (
          <p className="text-xs text-[var(--ui-text-muted)] text-center py-1">
            Octo печатает...
          </p>
        )}
      </div>
    </div>
  );
};
