"use client";

import React, { useState } from "react";
import { RegisterForm } from "./forms/register.form";
import { LoginForm } from "./forms/login.form";
import { ForgotForm } from "./forms/forgot.form";
import { VerifyForm } from "./forms/verify.form";
import { FormWrapper } from "./components/form.wrapper";
import { AnimatedForm } from "./components/animated.form";
import { ResetPasswordForm } from "./forms/reset-password.form";
import { typeMode } from "../model/types/mode.types";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<typeMode>("login");
  const [error, setError] = useState<string | null>(null);

  return (
    <FormWrapper
      onClearError={() => setError(null)}
      error={error}
      mode={mode}
      onMode={setMode}
    >
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
          <ForgotForm setError={setError} onSuccess={() => setMode("verify")} />
        )}
        {mode === "verify" && (
          <VerifyForm setError={setError} onSuccess={() => setMode("login")} />
        )}
        {mode === "verify-reset" && (
          <VerifyForm setError={setError} onSuccess={() => setMode("reset")} />
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
