"use client";

import Image from "next/image";

const ROBOT_IMAGES = [
  "/robot/Future_Robot_3d 1.png",
  "/robot/AI_Robot_04_3d 1.png",
  "/robot/AI_Robot_03_3d 1.png",
  "/robot/AI_Chat_03_3d 1.png",
  "/robot/AI_Chat_3d 1.png",
];

export function ImagePreloader() {
  return (
    <div className="hidden">
      {ROBOT_IMAGES.map((src) => (
        <Image
          key={src}
          src={src}
          alt="Preload"
          width={120}
          height={120}
          priority
        />
      ))}
    </div>
  );
}
