"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TextField,
  TextareaField,
  InputWithSuggestions,
  ProgressBar,
  Avatar,
} from "@/shared/ui/kit";
import { Button } from "@/shared/ui/kit";

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Scala",
  "Haskell",
  "Elixir",
  "R",
  "MATLAB",
  "SQL",
  "HTML/CSS",
  "Shell",
];

const stepTitles = [
  {
    title: "Welcome!",
    subtitle: "What's your name?",
  },
  {
    title: "Выбери аватар 🎨",
    subtitle: "Пусть твой профиль будет уникальным",
  },
  {
    title: "Расскажи о себе 📝",
    subtitle: "Поделись своими интересами и целями",
  },
  {
    title: "Какой язык учим? 💻",
    subtitle: "Выбери язык программирования, который хочешь освоить",
  },
];

export interface ProfileFormData {
  name: string;
  avatar: string;
  bio: string;
  language: string;
}

interface ProfileFormProps {
  onSubmit?: (data: ProfileFormData) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    avatar: "",
    bio: "",
    language: "",
  });
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  const totalSteps = 4;

  const updateField = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (step === 0 && !formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (step === 1 && !formData.avatar) {
      newErrors.avatar = "Выберите аватар";
    }

    if (step === 2 && !formData.bio.trim()) {
      newErrors.bio = "Расскажите о себе";
    }

    if (step === 3 && !formData.language) {
      newErrors.language = "Выберите язык программирования";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit?.(formData);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TextField
            id="name"
            label="Name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            error={errors.name}
            variant="rounded"
            size="sm"
            fullWidth
            inputMode="floating"
          />
        );

      case 1:
        return (
          // <AvatarPicker
          //   value={formData.avatar}
          //   onChange={(color) => updateField("avatar", color)}
          //   size="xl"
          //   shape="circle"
          //   label="Выберите цвет аватара"
          //   error={errors.avatar}
          // />
          <>
            <Avatar src={formData.avatar} alt={formData.name || "Avatar"} />
          </>
        );

      case 2:
        return (
          <TextareaField
            id="bio"
            label="О себе"
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Расскажите о своих интересах, опыте и целях..."
            error={errors.bio}
            variant="rounded"
            size="md"
            fullWidth
            rows={6}
            autoExpand
            maxRows={10}
            inputMode="static"
          />
        );

      case 3:
        return (
          <InputWithSuggestions
            id="language"
            label="Язык программирования"
            value={formData.language}
            onChange={(e) => updateField("language", e.target.value)}
            onSelectSuggestion={(value) => updateField("language", value)}
            suggestions={programmingLanguages}
            placeholder="Начните вводить название языка"
            error={errors.language}
            variant="rounded"
            size="lg"
            fullWidth
            inputMode="static"
            maxSuggestions={8}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <ProgressBar
          value={progress}
          size="md"
          segments={totalSteps}
          state="success"
          variant="segmented-capsule"
          trackVariant="solid"
          duration={300}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-[var(--ui-text)] mb-2">
            {stepTitles[currentStep].title}
          </h2>
          <p className="text-sm text-[var(--ui-text-muted)]">
            {stepTitles[currentStep].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Form content */}
      <div className="min-h-[200px] mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            size="md"
            onClick={handleBack}
            className="flex-1"
          >
            Назад
          </Button>
        ) : (
          <div className="flex-1" />
        )}

        {currentStep < totalSteps - 1 ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            className="flex-1"
          >
            Далее
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            className="flex-1"
          >
            Завершить
          </Button>
        )}
      </div>
    </div>
  );
};
