"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<IProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Motion values для 3D эффекта
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Очень плавный и едва заметный поворот
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [2, -2]), {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-2, 2]), {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  // Эффект смещения для жидкого стекла
  const translateX = useSpring(useTransform(mouseX, [-1, 1], [5, -5]), {
    stiffness: 80,
    damping: 25,
  });

  const translateY = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), {
    stiffness: 80,
    damping: 25,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Нормализуем координаты мыши относительно экрана
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Светлый фон с сеткой */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 59px,
                rgba(0, 0, 0, 0.03) 59px,
                rgba(0, 0, 0, 0.03) 60px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 59px,
                rgba(0, 0, 0, 0.03) 59px,
                rgba(0, 0, 0, 0.03) 60px
              )
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Светлые градиентные сферы */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      {/* Плавающие частицы */}
      {windowSize.width > 0 &&
        [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            animate={{
              y: [null, Math.random() * windowSize.height],
              x: [null, Math.random() * windowSize.width],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full"
            style={{
              opacity: Math.random() * 0.3,
            }}
          />
        ))}

      {/* Контент */}
      <div className="relative min-h-screen flex items-center justify-center p-4 perspective-1000">
        {/* Карточка с эффектом жидкого стекла */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Жидкое стекло - основной слой */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl" />

            {/* Дополнительный слой для глубины */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />

            {/* Анимированное свечение границы */}
            <motion.div
              animate={{
                background: [
                  "linear-gradient(0deg, rgba(99,102,241,0.2), rgba(16,185,129,0.2))",
                  "linear-gradient(360deg, rgba(99,102,241,0.2), rgba(16,185,129,0.2))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-indigo-400 to-emerald-400 opacity-40"
            />

            {/* Эффект жидкого стекла - смещающийся блик */}
            <motion.div
              style={{
                x: translateX,
                y: translateY,
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 rounded-2xl" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            <div className="relative p-8">
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent"
                >
                  ICodeMe
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-500 mt-2 font-mono"
                >
                  Learn programming with AI
                </motion.p>
              </div>

              <div className="relative z-10">{children}</div>

              <div className="mt-6 text-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
