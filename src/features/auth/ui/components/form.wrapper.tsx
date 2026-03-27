"use client";

import React, { useState } from "react";
import { OAuth } from "./ouath";
import { Notification } from "@/shared/ui/kit";
import { AuthModeSwitcher } from "./ui/auth.mode.switcher";
import { Logotype } from "@/shared/ui/logotype";

import { ModeData } from "../../model/data/mode.data";
import { typeMode } from "../../model/types/mode.types";

interface IProps {
  children: React.ReactNode;
  onMode: (mode: typeMode) => void;
  mode: typeMode;
  error?: string | null;
  onClearError: () => void;
}

export const FormWrapper: React.FC<IProps> = (props) => {
  const { children, mode, onMode, error, onClearError } = props;

  const [showError, setShowError] = useState(true);

  const handleCloseError = () => {
    setShowError(false);
    onClearError();
  };
  return (
    <div>
      <div className="text-center mb-4">
        <Logotype className="flex justify-center" />
        <h1 className="text-base font-bold text-emerald-800">
          {ModeData[mode].title}
        </h1>
        <p className="text-[12px] text-gray-600 mt-0.5">
          {ModeData[mode].subtitle}
        </p>
      </div>

      {error && showError && (
        <Notification
          type="error"
          message={error}
          onClose={handleCloseError}
          autoClose
          autoCloseDelay={5000}
        />
      )}

      <div className="form-container">
        <div className="form-content">{children}</div>
      </div>

      {(mode === "login" || mode === "register") && <OAuth />}

      <AuthModeSwitcher mode={mode} onModeChange={onMode} />
    </div>
  );
};
