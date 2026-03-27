"use client";

import { motion } from "framer-motion";
import { FaCode, FaStar } from "react-icons/fa";

export const ParticleEffect = () => {
  return (
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
  );
};
