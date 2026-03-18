import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

export const Notifications = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-4 gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <FaBell className="text-3xl" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"
        />
      </motion.button>
    </div>
  );
};
