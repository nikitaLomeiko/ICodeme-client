"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGoogle,
  FaGithub,
  FaTelegram,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

type AuthMode = "login" | "register" | "forgot" | "verify";

interface AuthFormProps {
  onSuccess?: () => void;
}

// Компонент поля ввода
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ElementType;
  required?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
  required = false,
  showPasswordToggle = false,
  onTogglePassword,
  isPasswordVisible,
  focusedField,
  setFocusedField,
}) => {
  const isFocused = focusedField === id;
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        <Icon />
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(id)}
        onBlur={() => setFocusedField(null)}
        required={required}
        className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
      />
      <label
        htmlFor={id}
        className={`absolute left-10 transition-all pointer-events-none ${
          isFocused || hasValue
            ? "text-[10px] top-1 text-emerald-600"
            : "text-sm text-gray-400 top-1/2 -translate-y-1/2"
        }`}
      >
        {label}
      </label>
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="text-sm" />
          ) : (
            <FaEye className="text-sm" />
          )}
        </button>
      )}
    </div>
  );
};

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Состояния для фокуса полей
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedOAuth, setSelectedOAuth] = useState<string | null>(null);

  // OAuth провайдеры
  const oauthProviders = [
    {
      id: "google",
      name: "Google",
      icon: FaGoogle,
      color: "bg-white hover:bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      iconColor: "text-red-500",
    },
    {
      id: "github",
      name: "GitHub",
      icon: FaGithub,
      color: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white",
      borderColor: "border-gray-900",
      iconColor: "text-white",
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: FaTelegram,
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-500",
      iconColor: "text-white",
    },
  ];

  const handleOAuthLogin = (provider: string) => {
    setSelectedOAuth(provider);
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setSelectedOAuth(null);
      if (provider === "google") {
        onSuccess?.();
      } else {
        setMode("register");
        setEmail(`${provider}@example.com`);
        setUsername(`user_${provider}`);
        setSuccess(
          `Вы успешно авторизовались через ${provider}. Завершите регистрацию.`,
        );
      }
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Пароли не совпадают");
        setIsLoading(false);
        return;
      }
      if (!agreedToTerms) {
        setError("Необходимо согласиться с условиями");
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
        setMode("verify");
        setSuccess("Код подтверждения отправлен на почту");
      }, 1500);
    } else if (mode === "login") {
      setTimeout(() => {
        setIsLoading(false);
        onSuccess?.();
      }, 1500);
    } else if (mode === "forgot") {
      setTimeout(() => {
        setIsLoading(false);
        setSuccess("Инструкции по восстановлению отправлены на почту");
        setTimeout(() => setMode("login"), 3000);
      }, 1500);
    } else if (mode === "verify") {
      const code = verificationCode.join("");
      if (code.length === 6) {
        setTimeout(() => {
          setIsLoading(false);
          setSuccess("Email подтвержден!");
          setTimeout(() => onSuccess?.(), 2000);
        }, 1500);
      } else {
        setError("Введите полный код");
        setIsLoading(false);
      }
    }
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const resendCode = () => {
    setSuccess("Новый код отправлен на почту");
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <>
      {/* Заголовок */}
      <div className="text-center mb-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-2"
        />
        <h1 className="text-base font-bold text-emerald-800">
          {mode === "login" && "Вход"}
          {mode === "register" && "Регистрация"}
          {mode === "forgot" && "Восстановление"}
          {mode === "verify" && "Подтверждение"}
        </h1>
        <p className="text-[12px] text-gray-600 mt-0.5">
          {mode === "login" && "Войдите в аккаунт"}
          {mode === "register" && "Создайте аккаунт"}
          {mode === "forgot" && "Восстановите доступ"}
          {mode === "verify" && "Подтвердите email"}
        </p>
      </div>

      {/* Уведомления */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 p-1.5 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-600"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 p-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] text-emerald-600 flex items-center gap-1"
          >
            <FaCheckCircle className="text-xs" />
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {mode === "register" && (
          <InputField
            id="username"
            label="Имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={FaUser}
            required
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={FaEnvelope}
          required
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        {mode !== "forgot" && mode !== "verify" && (
          <InputField
            id="password"
            label="Пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FaLock}
            required
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            isPasswordVisible={showPassword}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}

        {mode === "register" && (
          <InputField
            id="confirmPassword"
            label="Подтвердите"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={FaLock}
            required
            showPasswordToggle
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            isPasswordVisible={showConfirmPassword}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        )}

        {mode === "verify" && (
          <div className="space-y-2">
            <div className="flex justify-between gap-1">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleVerificationChange(index, e.target.value)
                  }
                  className="w-8 h-8 text-center text-xs font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={resendCode}
              className="text-[10px] text-emerald-600 hover:text-emerald-700"
            >
              Отправить повторно
            </button>
          </div>
        )}

        {mode === "login" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="!text-[12px] text-emerald-600 hover:text-emerald-700"
            >
              Забыли пароль?
            </button>
          </div>
        )}

        {mode === "register" && (
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="terms" className="text-[12px] text-gray-600">
              Согласен с{" "}
              <a href="#" className="text-emerald-600 hover:text-emerald-700">
                условиями
              </a>
            </label>
          </div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
        >
          {isLoading && !selectedOAuth ? (
            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Загрузка...
            </div>
          ) : (
            <>
              {mode === "login" && "Войти"}
              {mode === "register" && "Создать"}
              {mode === "forgot" && "Отправить"}
              {mode === "verify" && "Подтвердить"}
            </>
          )}
        </motion.button>
      </form>

      {/* OAuth кнопки */}
      {(mode === "login" || mode === "register") && (
        <>
          <div className="grid grid-cols-3 gap-1 mb-3 mt-3">
            {oauthProviders.map((provider) => {
              const Icon = provider.icon;
              return (
                <motion.button
                  key={provider.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOAuthLogin(provider.id)}
                  disabled={isLoading}
                  className={`${provider.color} ${provider.textColor} border ${provider.borderColor} py-1.5 rounded-lg flex items-center justify-center transition-all shadow-xs hover:shadow disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {selectedOAuth === provider.id && isLoading ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon className={`text-sm ${provider.iconColor}`} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      {/* Переключатель */}
      <div className="mt-3 text-center">
        {mode === "login" && (
          <p className="text-[12px] text-gray-600">
            Нет аккаунта?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Создать
            </button>
          </p>
        )}
        {mode === "register" && (
          <p className="text-[12px] text-gray-600">
            Уже есть?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Войти
            </button>
          </p>
        )}
        {(mode === "forgot" || mode === "verify") && (
          <button
            onClick={() => setMode("login")}
            className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 hover:text-emerald-700"
          >
            <FaArrowLeft className="text-[8px]" />
            Назад
          </button>
        )}
      </div>
    </>
  );
};
