"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="text-4xl md:text-6xl font-bold tracking-tighter text-gradient">
          TG Code
        </div>
        <div className="absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="mt-8 text-sm text-muted-foreground">
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  );
}
