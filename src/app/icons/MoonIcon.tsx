import React from 'react';
import { motion } from 'framer-motion';

const MoonIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#BFDBFE' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <motion.circle
      cx="32"
      cy="32"
      r="24"
      fill={color}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    />
    <motion.circle
      cx="40"
      cy="20"
      r="4"
      fill="#93C5FD"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.3 }}
    />
    <motion.circle
      cx="24"
      cy="45"
      r="3"
      fill="#93C5FD"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.3 }}
    />
    <motion.circle
      cx="45"
      cy="40"
      r="5"
      fill="#93C5FD"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.3 }}
    />
  </motion.svg>
);

export default MoonIcon;