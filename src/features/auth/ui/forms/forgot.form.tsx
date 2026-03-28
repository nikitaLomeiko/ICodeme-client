"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope } from "react-icons/fa";
import { TextField, Button } from "@/shared/ui/kit";
import { ForgotFormData, forgotSchema } from "../../model/types/auth.types";
import { IBaseFormProps } from "../../model/types/form.props";

export const ForgotForm: React.FC<IBaseFormProps> = ({
  setError,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForgot = async (data: ForgotFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err) {
      setError("Ошибка отправки");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForgot)} className="space-y-2">
      <TextField
        id="email"
        label="Email"
        variant="pill"
        type="email"
        {...register("email")}
        icon={FaEnvelope}
        required
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="outline"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Отправить инструкции
      </Button>
    </form>
  );
};
