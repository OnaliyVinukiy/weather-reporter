import React from "react";
import { motion } from "framer-motion";

const CloudyIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = "#CBD5E1",
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    animate="visible"
  >
    <motion.circle
      cx="32"
      cy="40"
      r="16"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
      }}
    />
    {/* Left side large puff */}
    <motion.circle
      cx="18"
      cy="36"
      r="14"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { delay: 0.1, duration: 0.5 },
        },
      }}
    />
    {/* Right side large puff */}
    <motion.circle
      cx="46"
      cy="36"
      r="15"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { delay: 0.2, duration: 0.5 },
        },
      }}
    />
    {/* Top left puff */}
    <motion.circle
      cx="22"
      cy="28"
      r="12"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { delay: 0.3, duration: 0.5 },
        },
      }}
    />
    {/* Top right puff */}
    <motion.circle
      cx="40"
      cy="26"
      r="13"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { delay: 0.4, duration: 0.5 },
        },
      }}
    />
    {/* Small top center puff */}
    <motion.circle
      cx="32"
      cy="22"
      r="10"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { delay: 0.5, duration: 0.5 },
        },
      }}
    />
  </motion.svg>
);

export default CloudyIcon;
