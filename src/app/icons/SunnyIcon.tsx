import React from 'react';
import { motion } from 'framer-motion';

const SunnyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = '#FDE68A' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    animate="visible"
  >
    {/* Sun Circle */}
    <motion.circle
      cx="32"
      cy="32"
      r="16"
      fill={color}
      variants={{
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
      }}
    />

    {/* Sun Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <motion.line
        key={angle}
        x1="32"
        y1="12"
        x2="32"
        y2="6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${angle} 32 32)`}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } },
        }}
      />
    ))}
  </motion.svg>
);

export default SunnyIcon;