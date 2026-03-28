"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { PasswordField, TextField, Button, Checkbox } from "@/shared/ui/kit";
import { RegisterFormData, registerSchema } from "../../model/types/auth.types";
import { IBaseFormProps } from "../../model/types/form.props";

export const RegisterForm: React.FC<IBaseFormProps> = ({
  onSuccess,
  setError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err) {
      setError("Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="pill"
        {...register("email")}
        icon={FaEnvelope}
        required
        error={errors.email?.message}
        disabled={isLoading}
      />

      <PasswordField
        id="password"
        label="Пароль"
        variant="pill"
        {...register("password")}
        required
        error={errors.password?.message}
        disabled={isLoading}
      />

      <PasswordField
        id="confirmPassword"
        label="Подтвердите пароль"
        variant="pill"
        {...register("confirmPassword")}
        required
        error={errors.confirmPassword?.message}
        disabled={isLoading}
      />

      <Checkbox
        id="terms"
        checked={watch("agreedToTerms")}
        onChange={(checked) =>
          register("agreedToTerms").onChange({ target: { value: checked } })
        }
        disabled={isLoading}
        error={errors.agreedToTerms?.message}
        label={
          <>
            Согласен с{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700">
              условиями
            </a>
          </>
        }
      />

      <Button
        type="submit"
        variant="outline"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Создать аккаунт
      </Button>
    </form>
  );
};
