"use client";

import React from "react";
import { OAuth } from "./ouath";
import { Notification, Title } from "@/shared/ui/kit";
import { AuthModeSwitcher } from "./ui/auth.mode.switcher";
import { Logotype } from "@/shared/ui/logotype";

import { ModeData } from "../../model/data/mode.data";
import { typeMode } from "../../model/types/mode.types";

interface IProps {
  children: React.ReactNode;
  onMode: (mode: typeMode) => void;
  mode: typeMode;
  error?: string | null;
}

export const FormWrapper: React.FC<IProps> = (props) => {
  const { children, mode, onMode, error } = props;

  return (
    <div>
      <div className="text-center mb-4">
        <Logotype className="flex justify-center" />
        <Title size="base" weight="bold" color="emerald-800" align="center">
          {ModeData[mode].title}
        </Title>
        <Title
          as="p"
          size="xs"
          weight="normal"
          color="gray-600"
          align="center"
          className="mt-0.5"
        >
          {ModeData[mode].subtitle}
        </Title>
      </div>

      {error && (
        <Notification
          className="bg-transparent border-none mb-10"
          autoClose={false}
          type="error"
          message={error}
        />
      )}

      <div className="form-content">{children}</div>

      {(mode === "login" || mode === "register") && <OAuth />}
      <AuthModeSwitcher mode={mode} onModeChange={onMode} />
    </div>
  );
};
