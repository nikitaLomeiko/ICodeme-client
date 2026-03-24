"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { PasswordField, TextField, Button, Checkbox } from "@/shared/ui/kit";
import { RegisterFormData, registerSchema } from "../../model/types/auth.types";

interface RegisterFormProps {
  onSuccess?: () => void;
  setError: (message: string | null) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  setError,
  focusedField,
  setFocusedField,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
        id="username"
        label="Имя"
        {...register("username")}
        icon={FaUser}
        required
        error={errors.username?.message}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        disabled={isLoading}
      />

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
      />

      <PasswordField
        id="confirmPassword"
        label="Подтвердите пароль"
        {...register("confirmPassword")}
        required
        error={errors.confirmPassword?.message}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
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
        variant="primary"
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
