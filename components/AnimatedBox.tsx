import { motion } from "framer-motion";
import { FC } from "react";

const AnimatedBox: FC = () => {
  return (
    <motion.div
      className="w-32 h-32 bg-blue-500"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

export default AnimatedBox;
