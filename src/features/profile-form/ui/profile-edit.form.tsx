"use client";

import { Button, TextField, Title } from "@/shared/ui/kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { ProfileEditFormData, profileEditSchema } from "../model/validate";
import { AvatarList } from "./components/avatar.list";
import { illustratedAvatars } from "@/entities/profile";

interface IProps {
  initName: string;
  initAvatar: string;
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProfileEditForm: React.FC<IProps> = (props) => {
  const { initAvatar, initName, onCancel, onSuccess, userId } = props;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: initName,
      avatar: initAvatar,
    },
    mode: "onChange",
  });

  const avatarValue = watch("avatar");

  useEffect(() => {
    reset({
      name: initName,
      avatar: initAvatar,
    });
  }, [initName, initAvatar, reset]);

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      onSuccess();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          Имя пользователя
        </Title>
        <TextField
          {...register("name")}
          id="name"
          placeholder="Ваше имя пользователя"
          error={errors.name?.message}
          fullWidth
          size="md"
          variant="rounded"
        />
        <p className="mt-1 text-xs text-gray-500">
          От 2 до 50 символов. Разрешены буквы, цифры, пробелы, - и _
        </p>
      </div>

      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          Аватар
        </Title>
        <AvatarList
          avatars={illustratedAvatars}
          isSelected={(avatarLabel: string) => avatarValue === avatarLabel}
          handleSelect={(value) =>
            setValue("avatar", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          error={errors.avatar?.message}
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
