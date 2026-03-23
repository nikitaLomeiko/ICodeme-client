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
  FaCode,
  FaStar,
} from "react-icons/fa";

type AuthMode = "login" | "register" | "forgot" | "verify";

interface AuthScreenProps {
  onSuccess?: () => void;
}

// Выносим InputField за пределы компонента
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

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
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

  // OAuth провайдеры - только Google, GitHub, Telegram
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

    // Имитация OAuth авторизации
    setTimeout(() => {
      setIsLoading(false);
      setSelectedOAuth(null);
      // Если пользователь уже есть - логиним, если нет - показываем форму для завершения регистрации
      if (provider === "google") {
        // Имитация: пользователь уже есть
        onSuccess?.();
      } else {
        // Имитация: новый пользователь, просим завершить регистрацию
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
      // Имитация регистрации
      setTimeout(() => {
        setIsLoading(false);
        setMode("verify");
        setSuccess("Код подтверждения отправлен на почту");
      }, 1500);
    } else if (mode === "login") {
      // Имитация входа
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
    <div className="h-screen w-screen flex relative overflow-hidden">
      {/* Левая часть с фоном - 80% */}
      <div className="relative w-[80%] h-full">
        {/* Туманность вверху */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full blur-3xl"
          />
          {/* Маленькие квадраты туманности */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-br from-emerald-300 to-teal-300 rounded-3xl blur-2xl"
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                top: Math.random() * 200,
                right: Math.random() * 200,
              }}
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
                rotate: [0, 90, 180, 360],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Фоновое изображение */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

        {/* Анимированные элементы на весь экран */}
        <div className="absolute inset-0 overflow-hidden w-full h-full pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: 0,
              }}
              animate={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              {i % 2 === 0 ? (
                <FaCode className="text-4xl" />
              ) : (
                <FaStar className="text-3xl" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-20 left-20 text-white text-8xl font-bold"
        >
          CODE
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-40 left-40 text-white text-8xl font-bold"
        >
          LEARN
        </motion.div>
      </div>

      {/* Правая часть с формой - 20% */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 w-[20%] h-full flex items-center justify-center bg-white/95 backdrop-blur-md shadow-2xl border-l border-emerald-100/50"
      >
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-full max-w-[280px]">
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
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;
