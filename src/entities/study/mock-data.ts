export const MOCK_STUDY: IStudy = {
  _id: "mock-study-1",
  userId: "user-123",
  levelPlanJSON: [
    {
      experienceToNextLevel: 1500,
      positionCount: 5,
      positionName: "Ученик",
    },
  ],
  level: {
    experienceToNextLevel: 1500,
    positionCount: 5,
    positionName: "Ученик",
  },
  studyPlanJSON: [
    {
      title: "Основы программирования",
      description: "Изучение фундаментальных концепций программирования",
      levels: [
        {
          title: "Уровень 1",
          description: "Введение в программирование",
          steps: [
            {
              title: "Переменные и типы данных",
              description: "Урок о переменных и типах данных",
              type: "document",
            },
            {
              title: "Урок 2: Циклы",
              description: "Урок о циклах и итерациях",
              type: "code",
            },
            {
              title: "Урок 3: Условия",
              description: "Урок о условных операторах",
              type: "quiz",
            },
          ],
        },
        {
          title: "Уровень 2",
          description: "Продвинутые концепции",
          steps: [
            {
              title: "Функции",
              description: "Урок о функциях",
              type: "document",
            },
            {
              title: "Урок 5: Объекты",
              description: "Урок об объектах",
              type: "code",
            },
          ],
        },
      ],
    },
    {
      title: "Работа с данными",
      description: "Изучение работы с базами данных и API",
      levels: [
        {
          title: "Уровень 1",
          description: "Основы работы с данными",
          steps: [
            {
              title: "SQL basics",
              description: "Урок по SQL",
              type: "document",
            },
            {
              title: "Запрос данных",
              description: "Практика запросов",
              type: "quiz",
            },
          ],
        },
      ],
    },
  ],
  study: {
    programmingLanguage: "TypeScript",
    module: 1,
    moduleTitle: "Основы программирования",
    level: 1,
    levelTitle: "Уровень 1",
    step: 1,
  },
};

export interface IStudy {
  _id: string;
  userId: string;
  levelPlanJSON: IPosition[];
  level: IPosition;
  studyPlanJSON: IModule[];
  study: IPlan;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPosition {
  experienceToNextLevel: number;
  positionCount: number;
  positionName: string;
}

export interface IPlan {
  programmingLanguage: string;
  module: number;
  moduleTitle: string;
  level: number;
  levelTitle: string;
  step: number;
}

export interface IModule {
  title: string;
  description: string;
  levels: ILevel[];
}

export interface ILevel {
  title: string;
  description: string;
  steps: IStep[];
}

export interface IStep {
  title: string;
  description: string;
  type: "document" | "code" | "quiz" | "exam";
  document?: string;
  code?: string;
  quiz?: IQuiz;
  exam?: IQuiz;
}

export interface IQuiz {
  title: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuestion {
  title: string;
  description: string;
  type: "abcd" | "input" | "code" | "true/false";
  variants?: IVariant[];
  inputs?: IInput[];
  code?: ICode;
  truefolse?: ITrueFolse;
  errors: IQuestionError[];
}

export interface IVariant {
  char: string;
  content: string;
  isTrue: boolean;
}

export interface IInput {
  label: string;
  input: string;
  correct: string[];
}

export interface ICode {
  code: string;
  correctCode: string[];
  correctResult: string[];
}

export interface ITrueFolse {
  isTrue: boolean;
  correct: boolean;
}

export interface IQuestionError {
  message: string;
}