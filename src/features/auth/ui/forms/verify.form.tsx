"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CodeField, useNotification } from "@/shared/ui/kit";
import { IBaseFormProps } from "../../model/types/form.props";
import { VerifyFormData, verifySchema } from "../../model/validate/auth.schema";
import { selectUserId, useConfirmCodeMutation } from "@/entities/auth";
import { useAppSelector } from "@/shared/lib/hooks";
import { isApiError } from "@/shared/api";

export const VerifyForm: React.FC<IBaseFormProps & { typeConfirm: string }> = ({
  setError,
  onSuccess,
  typeConfirm,
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

  const [confirm, { isLoading }] = useConfirmCodeMutation();
  const notification = useNotification();
  const userId = useAppSelector(selectUserId);

  const handleVerify = async (data: VerifyFormData) => {
    setError(null);

    const result = await confirm({ code: data.code, userId, typeConfirm });

    if (result.error && isApiError(result.error)) {
      setError(result.error.data.message);
      return;
    }
    if (result.data?.message) {
      notification.success(result.data?.message);
      onSuccess?.();
    }
  };

  const handleCodeChange = (value: string) => {
    setValue("code", value);
  };

  return (
    <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
      <CodeField
        length={5}
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
