"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField, TextField, Button } from "@/shared/ui/kit";
import { FaEnvelope } from "react-icons/fa";
import { IBaseFormProps } from "../../model/types/form.props";
import { LoginFormData, loginSchema } from "../../model/validate/auth.schema";

interface LoginFormProps extends IBaseFormProps {
  onForgotClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onForgotClick,
  onSuccess,
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
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-2 mb-5">
      <TextField
        id="email"
        label="Email"
        type="email"
        {...register("email")}
        icon={FaEnvelope}
        required
        error={errors.email?.message}
        disabled={isLoading}
        variant="underline"
        autoComplete="off"
      />
      <PasswordField
        id="password"
        label="Пароль"
        {...register("password")}
        required
        error={errors.password?.message}
        variant="underline"
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
        >
          Забыли пароль?
        </Button>
      </div>
      <Button
        className="mt-2"
        type="submit"
        variant="outline"
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
