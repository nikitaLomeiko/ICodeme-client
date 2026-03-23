import { motion } from "framer-motion";
import { usePosition } from "../../../model/hooks/use.position";
import { TypePosition } from "../../../model/types/type.position";

interface IProps {
  position: TypePosition;
}

export const TextWater: React.FC<IProps> = ({ position }) => {
  const { textPosition } = usePosition(position);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: position === "left" ? 100 : -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`absolute bottom-20 ${textPosition} text-white text-8xl font-bold`}
      >
        CODE
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: position === "left" ? 100 : -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className={`absolute bottom-40 ${textPosition} text-white text-8xl font-bold`}
      >
        LEARN
      </motion.div>
    </div>
  );
};
