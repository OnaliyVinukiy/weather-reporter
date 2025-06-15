import React from 'react';
import { motion } from 'framer-motion';

const CloudyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#CBD5E1' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      d="M32 24C25.373 24 20 29.373 20 36C20 37.073 20.158 38.106 20.457 39.09C15.01 40.528 11 45.452 11 51C11 57.075 15.925 62 22 62H42C48.075 62 53 57.075 53 51C53 47.962 51.75 45.163 49.697 43.109C52.474 41.229 54 38.258 54 35C54 28.373 48.627 23 42 23C40.697 23 39.438 23.255 38.297 23.702C36.937 16.924 30.932 12 24 12C18.232 12 13.197 15.58 10.999 20.67C9.923 18.223 7.828 16.143 5.485 14.417"
      fill={color}
      variants={{
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      }}
      transition={{ duration: 1.5, delay: 0.3 }}
    />
    <motion.circle
      cx="22"
      cy="36"
      r="10"
      fill={color}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 100 }}
    />
    <motion.circle
      cx="42"
      cy="35"
      r="9"
      fill={color}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
    />
    <motion.circle
      cx="32"
      cy="24"
      r="8"
      fill={color}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 100 }}
    />
  </motion.svg>
);

export default CloudyIcon;