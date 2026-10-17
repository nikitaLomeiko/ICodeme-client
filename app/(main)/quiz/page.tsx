"use client";

import { ITest, QuizPage, QuizProvider } from "@/shared/ui/kit";
import { Layout } from "@/widgets/layout";

export const TEST: ITest = {
  title: "Тест по основам JavaScript",
  description:
    "Проверьте свои знания: типы данных, методы массивов, системы контроля версий и не только. Следите за временем — некоторые вопросы ограничены по длительности.",
  settings: {
    isScore: true,
    isNavigate: true,
  },
  questions: [
    {
      id: "q1",
      type: "choice",
      title: "Что вернёт выражение `typeof null`?",
      options: [
        { id: "a", label: '"object"' },
        { id: "b", label: '"null"' },
        { id: "c", label: '"undefined"' },
        { id: "d", label: '"boolean"' },
      ],
      points: 5,
      correct: ["a"],
    },
    {
      id: "q2",
      type: "choice",
      title: "Какой метод массива изменяет исходный массив?",
      options: [
        { id: "a", label: "map()" },
        { id: "b", label: "filter()" },
        { id: "c", label: "slice()" },
        { id: "d", label: "splice()" },
      ],
      points: 3,
      timeLimit: 20,
      correct: ["d"],
    },
    {
      id: "q3",
      type: "choice",
      multiple: true,
      title: "Какие из перечисленных языков компилируются в машинный код?",
      options: [
        { id: "a", label: "C" },
        { id: "b", label: "C++" },
        { id: "c", label: "Python" },
        { id: "d", label: "JavaScript" },
        { id: "e", label: "Rust" },
      ],
      points: 4,
      timeLimit: 45,
      correct: ["a", "b", "e"],
    },
    {
      id: "q4",
      type: "text",
      title:
        "Назовите оператор строгого сравнения, который проверяет и значение, и тип.",
      points: 6,
      timeLimit: 60,
      correct: ["===", "строгое равенство", "strict equality"],
    },
    {
      id: "q5",
      type: "choice",
      title: 'Что делает команда `git commit -m "fix"`?',
      options: [
        { id: "a", label: "Отправляет изменения в удалённый репозиторий" },
        { id: "b", label: "Создаёт снимок изменений с сообщением" },
        { id: "c", label: "Удаляет последний коммит" },
        { id: "d", label: "Показывает историю коммитов" },
      ],
      points: 5,
      timeLimit: 30,
      correct: ["b"],
    },
    {
      id: "q6",
      type: "choice",
      multiple: true,
      title: "Что из перечисленного относится к системам контроля версий?",
      options: [
        { id: "a", label: "Git" },
        { id: "b", label: "Docker" },
        { id: "c", label: "SVN" },
        { id: "d", label: "Jenkins" },
        { id: "e", label: "Mercurial" },
      ],
      points: 3,
      correct: ["a", "c", "e"],
    },
    {
      id: "q7",
      type: "text",
      title:
        "Как называется CSS-свойство для создания гибкой раскладки элементов?",
      points: 5,
      correct: [
        "flex",
        "flexbox",
        "флекс",
        "флексбокс",
        "display flex",
        "display:flex",
      ],
    },
    {
      id: "q8",
      type: "choice",
      title: "Какая команда создаёт новую ветку в Git?",
      options: [
        { id: "a", label: "git checkout <имя>" },
        { id: "b", label: "git clone <имя>" },
        { id: "c", label: "git branch <имя>" },
        { id: "d", label: "git merge <имя>" },
      ],
      points: 2,
      correct: ["c"],
    },
  ],
};

export default function QuizRoute() {
  return (
    <Layout>
      <QuizProvider quiz={TEST}>
        <QuizPage />
      </QuizProvider>
    </Layout>
  );
}
