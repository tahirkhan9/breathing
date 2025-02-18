import { motion } from "framer-motion";

interface BreathingCircleProps {
  isActive: boolean;
  phase: "inhale" | "hold" | "exhale";
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
}

export default function BreathingCircle({
  isActive,
  phase,
  inhaleTime,
  holdTime,
  exhaleTime,
}: BreathingCircleProps) {
  const baseSize = 200;
  const expandedSize = 300;

  const variants = {
    inhale: {
      scale: expandedSize / baseSize,
      transition: { duration: inhaleTime, ease: "easeInOut" }
    },
    hold: {
      scale: expandedSize / baseSize,
      transition: { duration: holdTime, ease: "linear" }
    },
    exhale: {
      scale: 1,
      transition: { duration: exhaleTime, ease: "easeInOut" }
    }
  };

  return (
    <div className="flex justify-center items-center h-[400px]">
      <motion.div
        animate={isActive ? phase : "exhale"}
        variants={variants}
        className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-50"
        style={{
          width: baseSize,
          height: baseSize
        }}
      />
    </div>
  );
}
