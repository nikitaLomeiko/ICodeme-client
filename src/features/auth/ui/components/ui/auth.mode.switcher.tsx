"use client";

import React from "react";
import { AuthMode } from "../../../model/types/auth.types";
import { Button } from "@/shared/ui/kit";
import { FaArrowLeft } from "react-icons/fa";

interface AuthModeSwitcherProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const AuthModeSwitcher: React.FC<AuthModeSwitcherProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <div className="mt-3 text-center">
      {mode === "login" && (
        <p className="small text-gray-500 mb-0">
          Нет аккаунта?{" "}
          <Button
            variant="ghost"
            onClick={() => onModeChange("register")}
            className="text-emerald-600 p-0 align-baseline"
          >
            Создать
          </Button>
        </p>
      )}
      {mode === "register" && (
        <p className="small text-gray-500 mb-0">
          Уже есть?{" "}
          <Button
            variant="ghost"
            onClick={() => onModeChange("login")}
            className="text-emerald-600 p-0 align-baseline"
          >
            Войти
          </Button>
        </p>
      )}
      {(mode === "forgot" || mode === "verify") && (
        <Button
          variant="ghost"
          onClick={() => onModeChange("login")}
          className="text-emerald-600 p-0 d-inline-flex align-items-center gap-1"
        >
          <FaArrowLeft className="small" />
          <span className="small">Назад</span>
        </Button>
      )}
    </div>
  );
};
