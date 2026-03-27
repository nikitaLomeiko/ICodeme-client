"use client";

import { useState } from "react";
import { TextField, PasswordField, CodeField } from "@/shared/ui/kit";

export default function Test() {
  const [values, setValues] = useState({
    text: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    disabled: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [field]: e.target.value });
    };

  return (
    <div className="min-h-screen bg-[var(--ui-background)] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--ui-text)] mb-8">
          Все виды полей ввода
        </h1>

        {/* Обычные поля */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Обычные поля
          </h2>
          <div className="space-y-4">
            <TextField
              id="text"
              label="Текстовое поле"
              value={values.text}
              onChange={handleChange("text")}
              variant="underline"
            />

            <TextField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              variant="underline"
              required
            />
          </div>
        </div>

        {/* Поля с иконками */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Поля с иконками
          </h2>
          <div className="space-y-4">
            <TextField
              id="search"
              label="Поиск"
              value={values.text}
              onChange={handleChange("text")}
              icon={() => (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            />

            <TextField
              id="user"
              label="Имя пользователя"
              value={values.text}
              onChange={handleChange("text")}
              icon={() => (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            />
          </div>
        </div>

        {/* Парольные поля */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Парольные поля
          </h2>
          <div className="space-y-4">
            <PasswordField
              id="password"
              label="Пароль"
              value={values.password}
              onChange={handleChange("password")}
            />

            <PasswordField
              id="confirmPassword"
              label="Подтвердите пароль"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />
          </div>
        </div>

        {/* Поля с ошибками */}
        <div className="">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] ">
            Поля с ошибками
          </h2>
          <div className="space-y-4">
            <TextField
              id="error"
              label="Поле с ошибкой"
              value={values.error}
              onChange={handleChange("error")}
              error="Это поле обязательно для заполнения"
              inputMode="static"
              required
            />

            <PasswordField
              id="errorPassword"
              label="Пароль с ошибкой"
              value={values.password}
              onChange={handleChange("password")}
              error="Пароль должен содержать минимум 6 символов"
            />
          </div>
        </div>

        {/* Отключенные поля */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Отключенные поля
          </h2>
          <div className="space-y-4">
            <TextField
              id="disabled"
              label="Отключенное поле"
              value={values.disabled}
              onChange={handleChange("disabled")}
              disabled
            />

            <PasswordField
              id="disabledPassword"
              label="Отключенный пароль"
              value="secret"
              onChange={() => {}}
              disabled
            />
          </div>
        </div>

        {/* Разные размеры */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--ui-text-secondary)] mb-4">
            Разные размеры
          </h2>
          <div className="space-y-4">
            <TextField
              id="small"
              label="Маленькое поле"
              value={values.text}
              onChange={handleChange("text")}
              className="px-3 py-2 text-xs"
            />

            <TextField
              id="medium"
              label="Среднее поле"
              value={values.text}
              onChange={handleChange("text")}
              className="px-4 py-3 text-sm"
            />

            <TextField
              id="large"
              label="Большое поле"
              value={values.text}
              onChange={handleChange("text")}
              className="px-5 py-4 text-base"
            />
          </div>
          <CodeField onChange={() => null} value="" variant="square" />
        </div>
      </div>
    </div>
  );
}
