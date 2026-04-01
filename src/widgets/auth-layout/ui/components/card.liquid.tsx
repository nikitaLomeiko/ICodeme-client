import { motion, MotionValue } from "framer-motion";
import { Title } from "@/shared/ui/kit";

interface IProps {
  children: React.ReactNode;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  translateX: MotionValue<number>;
  translateY: MotionValue<number>;
  title: string;
  subtitle: string;
}

export const CardLiquid: React.FC<IProps> = (props) => {
  const {
    rotateX,
    rotateY,
    translateX,
    translateY,
    children,
    title,
    subtitle,
  } = props;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
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
        <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl" />

        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.1)] pointer-events-none" />

        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, rgba(99,102,241,0.15), rgba(16,185,129,0.1))",
              "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(99,102,241,0.15))",
              "linear-gradient(225deg, rgba(99,102,241,0.15), rgba(16,185,129,0.1))",
              "linear-gradient(315deg, rgba(16,185,129,0.1), rgba(99,102,241,0.15))",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-3xl p-[1px] opacity-30"
        />

        <motion.div
          animate={{
            backgroundPosition: [
              "0% 0%",
              "100% 100%",
              "0% 100%",
              "100% 0%",
              "0% 0%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.08), transparent 50%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.08), transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />

        <motion.div
          style={{
            x: translateX,
            y: translateY,
          }}
          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)",
            }}
          />

          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              width: "50%",
              height: "100%",
            }}
          />
        </motion.div>

        <div className="relative p-8 overflow-hidden">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Title
                size="4xl"
                weight="bold"
                color="gradient"
                align="center"
                as="h1"
              >
                {title}
              </Title>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 mt-2 font-mono text-center"
            >
              {subtitle}
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
  );
};
