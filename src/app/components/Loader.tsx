"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Droplet } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative mx-auto w-48 h-48"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sun */}
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
            animate={{
              rotate: 360,
              transition: {
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <Sun className="text-yellow-400" size={48} fill="currentColor" />
          </motion.div>

          {/* Cloud */}
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20"
            animate={{
              x: [-20, 20, -20],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Cloud className="text-white" size={64} fill="currentColor" />
          </motion.div>

          {/* Raindrops */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-full h-20 z-30">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 10}%`,
                }}
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: [0, 30, 60],
                  opacity: [0, 1, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  },
                }}
              >
                <Droplet className="text-blue-400" size={16} />
              </motion.div>
            ))}
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-2 left-0 right-0 text-white z-40"
            animate={{
              opacity: [0.6, 1, 0.6],
              transition: {
                duration: 2,
                repeat: Infinity,
              },
            }}
          >
            <p className="text-lg font-medium">Loading weather data...</p>
            <p className="text-sm mt-1">Just like checking outside!</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
