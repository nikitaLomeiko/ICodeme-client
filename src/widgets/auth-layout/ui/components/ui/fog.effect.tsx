import { motion } from "framer-motion";

export const FogEffect = () => {
  return (
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
  );
};
