"use client";

import React from "react";
import { AuthMode } from "../../../model/types/auth.types";
import { Button, Title } from "@/shared/ui/kit";
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
        <Title
          as="p"
          size="sm"
          weight="normal"
          align="center"
          className="light:text-gray-500 dark:text-slate-400 transition-colors duration-500"
        >
          Нет аккаунта?{" "}
          <Button
            variant="ghost"
            onClick={() => onModeChange("register")}
            className="light:!text-emerald-600 dark:!text-emerald-400 p-0 align-baseline hover:light:bg-emerald-50 hover:dark:bg-emerald-900/20 transition-colors duration-500"
          >
            Создать
          </Button>
        </Title>
      )}
      {mode === "register" && (
        <Title
          as="p"
          size="sm"
          weight="normal"
          align="center"
          className="light:text-gray-500 dark:text-slate-400 transition-colors duration-500"
        >
          Уже есть?{" "}
          <Button
            variant="ghost"
            onClick={() => onModeChange("login")}
            className="light:!text-emerald-600 dark:!text-emerald-400 p-0 align-baseline hover:light:bg-emerald-50 hover:dark:bg-emerald-900/20 transition-colors duration-500"
          >
            Войти
          </Button>
        </Title>
      )}
      {(mode === "forgot" || mode === "verify") && (
        <Button
          variant="ghost"
          onClick={() => onModeChange("login")}
          className="light:!text-emerald-600 dark:!text-emerald-400 p-0 d-inline-flex align-items-center gap-1 hover:light:bg-emerald-50 hover:dark:bg-emerald-900/20 transition-colors duration-500"
        >
          <FaArrowLeft className="small" />
          <span className="small">Назад</span>
        </Button>
      )}
    </div>
  );
};
