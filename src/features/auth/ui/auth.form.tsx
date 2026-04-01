"use client";

import React, { useState } from "react";
import { AuthMode } from "../model/types/auth.types";
import { RegisterForm } from "./forms/register.form";
import { LoginForm } from "./forms/login.form";
import { ForgotForm } from "./forms/forgot.form";
import { VerifyForm } from "./forms/verify.form";
import { FormWrapper } from "./components/form.wrapper";
import { AnimatedForm } from "./components/animated.form";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>("login");
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
          <VerifyForm setError={setError} onSuccess={onSuccess} />
        )}
      </AnimatedForm>
    </FormWrapper>
  );
};
