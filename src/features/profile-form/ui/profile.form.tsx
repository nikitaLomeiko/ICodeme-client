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

interface ProfileFormProps {
  onSubmit?: (data: ProfileFormData) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

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

  const { handleSubmit, trigger, getFieldState, formState, setError } = methods;

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldNames: Record<number, keyof ProfileFormData> = {
      0: "name",
      1: "avatar",
      2: "bio",
      3: "language",
    };

    const field = fieldNames[currentStep];
    const isValid = await trigger(field);

    if (!isValid) {
      setError(field, {
        type: "manual",
        message: formState.errors[field]?.message || "Invalid field",
      });

      const element = document.querySelector(
        `[name="${field}"]`,
      ) as HTMLElement | null;
      element?.focus();
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmitForm = (data: ProfileFormData) => {
    onSubmit?.(data);
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
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
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSubmit={handleSubmit(onSubmitForm)}
        title={stepTitles[currentStep]}
      >
        {renderStep()}
      </StepWrapper>
    </FormProvider>
  );
};
