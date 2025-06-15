import React, { useEffect } from "react";

const MistyBackground: React.FC = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes mist-drift-left {
        0% { transform: translateX(-100%); opacity: 0.3; }
        50% { transform: translateX(0%); opacity: 0.6; }
        100% { transform: translateX(100%); opacity: 0.3; }
      }
      @keyframes mist-drift-right {
        0% { transform: translateX(100%); opacity: 0.3; }
        50% { transform: translateX(0%); opacity: 0.6; }
        100% { transform: translateX(-100%); opacity: 0.3; }
      }
      @keyframes mist-fade-in-out {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div
        className="absolute w-[200%] h-full bg-white/30 rounded-full blur-3xl"
        style={{
          top: "0%",
          left: "-50%",
          animation:
            "mist-drift-left 25s linear infinite alternate, mist-fade-in-out 10s ease-in-out infinite alternate",
          transform: "scale(1.2)",
        }}
      ></div>
      <div
        className="absolute w-[200%] h-full bg-white/20 rounded-full blur-3xl"
        style={{
          bottom: "10%",
          right: "-70%",
          animation:
            "mist-drift-right 30s linear infinite alternate, mist-fade-in-out 12s ease-in-out infinite alternate",
          transform: "scale(1.1)",
          animationDelay: "1s",
        }}
      ></div>
      <div
        className="absolute w-[200%] h-full bg-white/25 rounded-full blur-3xl"
        style={{
          top: "20%",
          left: "-30%",
          animation:
            "mist-drift-left 20s linear infinite alternate, mist-fade-in-out 8s ease-in-out infinite alternate",
          transform: "scale(1.3)",
          animationDelay: "2s",
        }}
      ></div>
      <div
        className="absolute w-[200%] h-full bg-white/15 rounded-full blur-3xl"
        style={{
          bottom: "0%",
          right: "-40%",
          animation:
            "mist-drift-right 35s linear infinite alternate, mist-fade-in-out 14s ease-in-out infinite alternate",
          transform: "scale(1.05)",
          animationDelay: "0.5s",
        }}
      ></div>
    </div>
  );
};

export default MistyBackground;
