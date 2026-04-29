"use client";

import { Button, InputWithSuggestions, Title } from "@/shared/ui/kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { LanguageAddFormData, languageAddSchema } from "../model/validate";
import { programmingLanguages } from "../model/data/language.data";

interface IProps {
  initLanguage?: string;
  onSuccess: (language: string) => void;
  onCancel: () => void;
}

export const LanguageAddForm: React.FC<IProps> = (props) => {
  const { initLanguage = "", onCancel, onSuccess } = props;

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<LanguageAddFormData>({
    resolver: zodResolver(languageAddSchema),
    defaultValues: {
      language: initLanguage,
    },
    mode: "onChange",
  });

  const languageValue = watch("language");

  useEffect(() => {
    reset({
      language: initLanguage,
    });
  }, [initLanguage, reset]);

  const onSubmit = async (data: LanguageAddFormData) => {
    try {
      await onSuccess(data.language);
    } catch (error) {
      console.error("Failed to add language:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          Язык программирования
        </Title>
        <InputWithSuggestions
          id="language"
          name="language"
          value={languageValue}
          onChange={(e) =>
            setValue("language", e.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          onSelectSuggestion={(value) =>
            setValue("language", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          suggestions={programmingLanguages}
          placeholder="Выберите язык программирования"
          error={errors.language?.message}
          variant="underline"
          size="lg"
          fullWidth
          inputMode="static"
          maxSuggestions={8}
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
          <FaPlus size={14} />
          {isSubmitting ? "Добавление..." : "Добавить"}
        </Button>
      </div>
    </form>
  );
};
