"use client";

import { Button, TextareaField, Title } from "@/shared/ui/kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { AboutEditFormData, aboutEditSchema } from "../model/validate";

interface IProps {
  initAbout: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AboutEditForm: React.FC<IProps> = (props) => {
  const { initAbout, onCancel, onSuccess } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<AboutEditFormData>({
    resolver: zodResolver(aboutEditSchema),
    defaultValues: {
      about: initAbout || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      about: initAbout || "",
    });
  }, [initAbout, reset]);

  const onSubmit = async (data: AboutEditFormData) => {
    try {
      console.log(data.about);
      // Запрос
      onSuccess();
    } catch (error) {
      console.error("Failed to save about:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          О себе
        </Title>
        <TextareaField
          {...register("about")}
          id="about"
          placeholder="Расскажите о себе..."
          error={errors.about?.message}
          maxLength={2000}
          rows={6}
          autoExpand
          fullWidth
          size="md"
          variant="rounded"
        />
      </div>

      <div className="flex gap-3 justify-end pt-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            reset();
            onCancel();
          }}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isDirty || !isValid}
          className="gap-2"
        >
          <FaSave size={16} />
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </form>
  );
};
