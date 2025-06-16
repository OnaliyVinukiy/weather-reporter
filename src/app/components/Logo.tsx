import React from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Droplet, CloudSnow, Zap } from "lucide-react";

const Logo: React.FC<{ size?: number }> = ({ size = 80 }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main logo container */}
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          {/* Elements */}
          <motion.div
            className="relative"
            animate={{
              rotate: 360,
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <Sun
              size={size * 0.8}
              className="text-yellow-400 absolute -top-4 -left-4"
              fill="currentColor"
            />
          </motion.div>

          {/* Cloud base */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9 }}
            animate={{
              scale: [0.9, 1, 0.9],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Cloud
              size={size}
              className="text-white"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 right-2"
            animate={{
              opacity: [0, 1, 0],
              y: [10, 0, -10],
              transition: {
                duration: 6,
                repeat: Infinity,
                repeatDelay: 2,
              },
            }}
          >
            <Droplet size={size * 0.3} className="text-blue-400" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 left-4"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1, 0.8],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 1,
              },
            }}
          >
            <CloudSnow size={size * 0.3} className="text-blue-200" />
          </motion.div>

          <motion.div
            className="absolute -top-2 right-6"
            animate={{
              opacity: [0, 1, 0],
              rotate: [0, 10, -10, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 2,
              },
            }}
          >
            <Zap
              size={size * 0.25}
              className="text-yellow-300"
              fill="currentColor"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-blue-300 font-[Edu_VIC_WA_NT_Hand_Pre]">
          Weatherly
        </h1>
        <motion.p
          className="text-xl text-white/80 font-light text-center"
          animate={{
            opacity: [0.8, 1, 0.8],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          Your Modern Weather Dashboard
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Logo;
