"use client";

import { useEffect } from "react";

const ROBOT_IMAGES = [
  "/robot/Future_Robot_3d 1.png",
  "/robot/AI_Robot_04_3d 1.png",
  "/robot/AI_Robot_03_3d 1.png",
  "/robot/AI_Chat_03_3d 1.png",
  "/robot/AI_Chat_3d 1.png",
];

export function ImagePreloader() {
  useEffect(() => {
    // Preload robot images
    ROBOT_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
