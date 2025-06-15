import React from "react";
import { motion } from "framer-motion";

const MistIcon: React.FC<{
  size?: number;
  cloudColor?: string;
  mistColor?: string;
}> = ({
  size = 80,
  cloudColor = "#CBD5E1",
  mistColor = "rgba(255, 255, 255, 0.7)",
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      {/* Cloud */}
      <motion.path
        d="M48 40C52.4183 40 56 36.4183 56 32C56 29.5817 55.0601 27.3815 53.5135 25.7592C51.5273 22.8466 48.0694 20.893 44 20.893C42.8496 20.893 41.7335 21.0571 40.6723 21.3653C39.4005 16.4862 35.1557 12 30 12C25.1328 12 21.011 15.093 19.3496 19.3364C17.9734 17.5852 15.9388 16.2974 13.606 15.6565C10.7423 14.8463 7.65349 15.7176 5.37897 17.7651C3.10444 19.8126 1.83063 22.7845 2.00035 25.8679C2.17007 28.9513 3.8647 31.7854 6.4673 33.7381C9.06989 35.6908 12.3385 36.7846 15.7766 36.7846H48V40Z"
        fill={cloudColor}
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      />

      {/* Mist lines */}
      <motion.rect
        x="10"
        y="45"
        width="44"
        height="3"
        rx="1.5"
        fill={mistColor}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          x: [10, 15, 10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.rect
        x="15"
        y="50"
        width="34"
        height="3"
        rx="1.5"
        fill={mistColor}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          x: [15, 20, 15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
      />
      <motion.rect
        x="20"
        y="55"
        width="24"
        height="3"
        rx="1.5"
        fill={mistColor}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          x: [20, 25, 20],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </motion.svg>
  );
};

export default MistIcon;
