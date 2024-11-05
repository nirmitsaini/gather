"use client";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface PlayerProps {
  position: { x: number; y: number };
}

export default function Player({ position }: PlayerProps) {
  return (
    <div
      className={cn(
        "absolute transition-all duration-100 ease-out",
        "flex flex-col items-center justify-center"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="absolute -inset-0.5 animate-pulse rounded-full bg-indigo-500/20" />
        <div className="relative rounded-full bg-white p-2 shadow-lg ring-2 ring-indigo-500 dark:bg-gray-800">
          <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <span className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
        You
      </span>
    </div>
  );
}