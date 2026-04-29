import { IQuiz } from "./quiz.types";

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
  //experience: number;
}

export interface ILevel {
  title: string;
  description: string;
  steps: IStep[];
  //experience: number;
}

export interface IStep {
  title: string;
  description: string;
  type: "document" | "code" | "quiz" | "exam";
  document?: string;
  code?: string;
  quiz?: IQuiz;
  exam?: IQuiz;
  //experience: number;
}
