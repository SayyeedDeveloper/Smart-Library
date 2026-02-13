"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";

export function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#b3d9ff] via-[#8ec5ff] to-[#1d80dd] flex items-center justify-center z-50">
      {/* Floating decorations */}
      <div className="pointer-events-none absolute -left-8 top-20 h-40 w-40 rounded-full bg-[#ff9f40]/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-4 top-40 h-32 w-32 rounded-full bg-[#f7d94c]/35 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute left-1/3 bottom-20 h-28 w-28 rounded-full bg-[#d85085]/30 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center space-y-6">
        {/* Animated Robot */}
        <div className="flex justify-center">
          <div className="animate-bounce" style={{ animationDuration: '1.5s' }}>
            <Image
              src="/robot/Future_Robot_3d 1.png"
              alt="Loading Robot"
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-white animate-pulse" />
            <h2 className="font-heading text-3xl font-bold text-white">
              Smart Library
            </h2>
          </div>
          <p className="font-heading text-xl text-white/90">
            Loading amazing books{dots}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-white rounded-full animate-pulse"
            style={{
              animation: 'loading 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
