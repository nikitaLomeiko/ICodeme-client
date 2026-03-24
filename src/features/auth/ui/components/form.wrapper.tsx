import { motion } from "framer-motion";
import { ModeData } from "../../model/data/mode.data";
import { typeMode } from "../../model/types/mode.types";

interface IProps {
  children: React.ReactNode;
  onMode: (mode: typeMode) => void;
  mode: typeMode;
}

export const FormWrapper: React.FC<IProps> = (props) => {
  const { children, mode, onMode } = props;
  return (
    <>
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
          {ModeData[mode].title}
        </h1>
        <p className="text-[12px] text-gray-600 mt-0.5">
          {ModeData[mode].subtitle}
        </p>
      </div>

      {children}

      <div className="mt-3 text-center">
        {mode === "login" && (
          <p className="text-[12px] text-gray-600">
            Нет аккаунта?{" "}
            <button
              onClick={() => onMode("register")}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {ModeData["register"].buttonTitle}
            </button>
          </p>
        )}
        {mode === "register" && (
          <p className="text-[12px] text-gray-600">
            Уже есть?{" "}
            <button
              onClick={() => onMode("login")}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {ModeData["login"].buttonTitle}
            </button>
          </p>
        )}
      </div>
    </>
  );
};
