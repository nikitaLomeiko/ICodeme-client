"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField, Button } from "@/shared/ui/kit";
import { IBaseFormProps } from "../../model/types/form.props";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../model/validate/auth.schema";

export const ResetPasswordForm: React.FC<IBaseFormProps> = ({
  setError,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err) {
      setError("Ошибка сброса пароля");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-2">
      <PasswordField
        id="password"
        label="Новый пароль"
        variant="underline"
        {...register("password")}
        required
        error={errors.password?.message}
        disabled={isLoading}
      />

      <PasswordField
        id="confirmPassword"
        label="Подтвердите новый пароль"
        variant="underline"
        {...register("confirmPassword")}
        required
        error={errors.confirmPassword?.message}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Сбросить пароль
      </Button>
    </form>
  );
};
