"use client";

import React, { useEffect, useRef } from "react";

interface RainyBackgroundProps {
  intensity?: number;
  speed?: number;
  color?: string;
}

const RainyBackground: React.FC<RainyBackgroundProps> = ({
  intensity = 100,
  speed = 10,
  color = "rgba(255, 255, 255, 0.6)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drops: { x: number; y: number; length: number; speed: number }[] = [];

    // Initialize raindrops
    const initDrops = () => {
      drops = [];
      for (let i = 0; i < intensity; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 20 + 10,
          speed: Math.random() * 5 + speed,
        });
      }
    };

    initDrops();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Draw raindrop
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Move raindrop
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
          drop.length = Math.random() * 20 + 10;
          drop.speed = Math.random() * 5 + speed;
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default RainyBackground;
