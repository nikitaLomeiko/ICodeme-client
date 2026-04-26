"use client";

import React, { useState } from "react";
import {
  RegisterForm,
  ForgotForm,
  LoginForm,
  ResetPasswordForm,
  VerifyForm,
} from "./forms";
import { FormWrapper, AnimatedForm } from "./components";
import { typeMode } from "../model/types/mode.types";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<typeMode>("login");
  const [error, setError] = useState<string | null>(null);

  return (
    <FormWrapper error={error} mode={mode} onMode={setMode}>
      <AnimatedForm mode={mode}>
        {mode === "login" && (
          <LoginForm
            onSuccess={onSuccess}
            onForgotClick={() => setMode("forgot")}
            setError={setError}
          />
        )}
        {mode === "register" && (
          <RegisterForm
            setError={setError}
            onSuccess={() => setMode("verify")}
          />
        )}
        {mode === "forgot" && (
          <ForgotForm
            setError={setError}
            onSuccess={() => setMode("verify-reset")}
          />
        )}
        {mode === "verify" && (
          <VerifyForm
            typeConfirm="code-email"
            setError={setError}
            onSuccess={() => setMode("login")}
          />
        )}
        {mode === "verify-reset" && (
          <VerifyForm
            typeConfirm="code-reset-password"
            setError={setError}
            onSuccess={() => setMode("reset")}
          />
        )}
        {mode === "reset" && (
          <ResetPasswordForm
            setError={setError}
            onSuccess={() => setMode("register")}
          />
        )}
      </AnimatedForm>
    </FormWrapper>
  );
};
