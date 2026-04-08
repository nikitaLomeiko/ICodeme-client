export type typeMode =
  | "login"
  | "register"
  | "forgot"
  | "verify"
  | "verify-reset"
  | "reset";

export interface IModeMeta {
  title: string;
  subtitle: string;
  buttonTitle?: string;
}

export type IModeData = Record<typeMode, IModeMeta>;
