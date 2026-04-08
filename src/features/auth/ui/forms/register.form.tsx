"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope } from "react-icons/fa";
import { PasswordField, TextField, Button, Checkbox } from "@/shared/ui/kit";
import { IBaseFormProps } from "../../model/types/form.props";
import {
  RegisterFormData,
  registerSchema,
} from "../../model/validate/auth.schema";
import { IAuthData, saveAuthToken, setAuthData } from "@/entities/auth";
import { useAppDispatch } from "@/shared/lib/hooks";

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
  const dispatch = useAppDispatch();

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // make a request to the server here ..
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const token = "mocktoken";

      dispatch(saveAuthToken(token));

      // make a request to the server here ..
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockData: IAuthData = {
        id: "1",
        email: "mock@data.com",
        name: "",
      };

      dispatch(setAuthData(mockData));

      // можно объединить в один запрос в целом

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
        variant="underline"
        {...register("email")}
        icon={FaEnvelope}
        required
        error={errors.email?.message}
        disabled={isLoading}
      />

      <PasswordField
        id="password"
        label="Пароль"
        variant="underline"
        {...register("password")}
        required
        error={errors.password?.message}
        disabled={isLoading}
      />

      <PasswordField
        id="confirmPassword"
        label="Подтвердите пароль"
        variant="underline"
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
