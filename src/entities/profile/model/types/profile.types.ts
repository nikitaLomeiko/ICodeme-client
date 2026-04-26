export interface IProfile {
  _id: string;
  userId: string;
  data: IProfileData;
  level: IPosition;
  levelPlanJSON: IPosition[];
  studyPlanJSON: IModule[];
  study: IStudy;
  stats: IStats;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileData {
  avatar: string;
  status: string;
  about: string;
}

export interface IPosition {
  experienceToNextLevel: number;
  positionCount: number;
  positionName: string;
}

export interface IStudy {
  programmingLanguage: string;
  module: number;
  level: number;
  step: number;
}

export interface IStats {
  experience: number;
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
