"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NameStep, AvatarStep, AboutStep, LanguageStep } from "./steps";
import { StepWrapper } from "./components/step.wrapper";
import { stepTitles } from "../model/data/step.data";
import {
  ProfileFormData,
  profileSchema,
} from "../model/validate/profile.schema";
import { useProfileForm } from "../model/hooks/use.profile.form";
import { useCreateProfileMutation } from "@/entities/profile";
import { isApiError } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useNotification } from "@/shared/ui/kit";

const TOTAL_STEPS = 4;

interface ProfileFormProps {
  onSubmit?: (data: ProfileFormData) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      avatar: "",
      bio: "",
      language: "",
    },
  });

  const router = useRouter();
  const notification = useNotification();
  const [create, { isLoading }] = useCreateProfileMutation();
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, getFieldState } = methods;
  const manageProfileForm = useProfileForm({
    methods,
    totalSteps: TOTAL_STEPS,
  });

  const onSubmitForm = async (data: ProfileFormData) => {
    setError(null);

    const result = await create({
      about: data.bio,
      avatar: data.avatar,
      languageProgram: data.language,
      name: data.name,
    });

    if (result.error && isApiError(result.error)) {
      setError(result.error.data.message);
      return;
    }

    notification.success("The profile was successfully created");

    router.push("/");
  };

  const renderStep = () => {
    switch (manageProfileForm.currentStep) {
      case 0:
        return (
          <NameStep
            value={methods.watch("name")}
            onChange={(value) => methods.setValue("name", value)}
            error={getFieldState("name").error?.message}
          />
        );

      case 1:
        return (
          <AvatarStep
            value={methods.watch("avatar")}
            onChange={(value) => methods.setValue("avatar", value)}
            error={getFieldState("avatar").error?.message}
          />
        );

      case 2:
        return (
          <AboutStep
            value={methods.watch("bio")}
            onChange={(value) => methods.setValue("bio", value)}
            error={getFieldState("bio").error?.message}
          />
        );

      case 3:
        return (
          <LanguageStep
            value={methods.watch("language")}
            onChange={(value) => methods.setValue("language", value)}
            error={getFieldState("language").error?.message}
          />
        );

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <StepWrapper
        {...manageProfileForm}
        totalSteps={TOTAL_STEPS}
        progress={((manageProfileForm.currentStep + 1) / TOTAL_STEPS) * 100}
        handleSubmit={handleSubmit(onSubmitForm)}
        title={stepTitles[manageProfileForm.currentStep]}
        error={error}
        isLoading={isLoading}
      >
        {renderStep()}
      </StepWrapper>
    </FormProvider>
  );
};
