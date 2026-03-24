"use client";

import React, { useState } from "react";
import { AuthMode } from "../model/types/auth.types";
import { RegisterForm } from "./forms/register.form";
import { LoginForm } from "./forms/login.form";
import { ForgotForm } from "./forms/forgot.form";
import { VerifyForm } from "./forms/verify.form";
import { FormWrapper } from "./components/form.wrapper";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <FormWrapper
        onClearError={() => setError(null)}
        error={error}
        mode={mode}
        onMode={setMode}
      >
        {mode === "login" && (
          <LoginForm
            onSuccess={onSuccess}
            onForgotClick={() => setMode("forgot")}
            setError={setError}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}
        {mode === "register" && (
          <RegisterForm
            setError={setError}
            onSuccess={() => setMode("verify")}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}
        {mode === "forgot" && (
          <ForgotForm
            setError={setError}
            onSuccess={() => setMode("verify")}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}
        {mode === "verify" && (
          <VerifyForm setError={setError} onSuccess={onSuccess} />
        )}
      </FormWrapper>
    </>
  );
};
