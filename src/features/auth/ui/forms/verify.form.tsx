"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CodeField } from "@/shared/ui/kit";
import { VerifyFormData, verifySchema } from "../../model/types/auth.types";
import { IBaseFormProps } from "../../model/types/form.props";

export const VerifyForm: React.FC<IBaseFormProps> = ({
  setError,
  onSuccess,
}) => {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const codeValue = watch("code");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleVerify = async (data: VerifyFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
      setTimeout(() => onSuccess?.(), 2000);
    } catch (err) {
      setError("Ошибка подтверждения");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setValue("code", value);
  };

  return (
    <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
      <CodeField
        length={6}
        value={codeValue}
        onChange={handleCodeChange}
        disabled={isLoading}
        error={errors.code?.message}
        autoFocus
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Подтвердить
      </Button>
    </form>
  );
};
