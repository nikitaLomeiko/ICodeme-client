"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField, TextField, Button } from "@/shared/ui/kit";
import { LoginFormData, loginSchema } from "../../model/types/auth.types";
import { FaEnvelope } from "react-icons/fa";

interface LoginFormProps {
  onSuccess?: () => void;
  setError: (message: string | null) => void;
  onForgotClick: () => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onForgotClick,
  focusedField,
  onSuccess,
  setFocusedField,
  setError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err) {
      setError("Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
      <TextField
        id="email"
        label="Email"
        type="email"
        {...register("email")}
        icon={FaEnvelope}
        required
        error={errors.email?.message}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        disabled={isLoading}
        variant="primary"
        autoComplete="off"
      />

      <PasswordField
        id="password"
        label="Пароль"
        {...register("password")}
        required
        error={errors.password?.message}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        disabled={isLoading}
        autoComplete="off"
      />

      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onForgotClick}
          disabled={isLoading}
          className="text-emerald-600 hover:text-emerald-700"
        >
          Забыли пароль?
        </Button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Войти
      </Button>
    </form>
  );
};
