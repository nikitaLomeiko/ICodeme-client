import { z } from "zod";

export type AuthMode = "login" | "register" | "forgot" | "verify";

export interface AuthFormProps {
  onSuccess?: () => void;
}
