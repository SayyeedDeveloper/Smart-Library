import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RobotMascotProps {
  variant?: "wave" | "chat" | "happy" | "think" | "robot" | "future";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const ROBOT_IMAGES: Record<string, string> = {
  wave: "/robot/AI_Robot_3d 1.png",
  chat: "/robot/AI_Chat_3d 1.png",
  happy: "/robot/AI_Chat_02_3d 1.png",
  think: "/robot/AI_Robot_02_3d 1.png",
  robot: "/robot/AI_Robot_04_3d 1.png",
  future: "/robot/Future_Robot_3d 1.png",
};

const SIZES = {
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
};

/**
 * RobotMascot - A friendly robot character that appears throughout the app
 * to make it more engaging and kid-friendly
 */
export function RobotMascot({
  variant = "wave",
  size = "md",
  className,
  animate = true,
}: RobotMascotProps) {
  const robotSrc = ROBOT_IMAGES[variant];
  const robotSize = SIZES[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        animate && "animate-in zoom-in duration-700",
        className
      )}
    >
      <Image
        src={robotSrc}
        alt="Friendly robot mascot"
        width={robotSize}
        height={robotSize}
        className={cn(
          "object-contain drop-shadow-xl",
          animate && "animate-float"
        )}
        priority={size === "xl" || size === "lg"}
      />
    </div>
  );
}
