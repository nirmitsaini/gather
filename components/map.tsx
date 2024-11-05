"use client";

import Player from "@/components/player";
import { cn } from "@/lib/utils";
import { Monitor, Users } from "lucide-react";
import { ReactNode } from "react";

export const TILE_SIZE = 32;
export const GRID_SIZE = 20;

// Define walls and obstacles
export const OBSTACLES = [
  // Walls around the edges
  ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: 0, y: i })), // Left wall
  ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: GRID_SIZE - 1, y: i })), // Right wall
  ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: 0 })), // Top wall
  ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: GRID_SIZE - 1 })), // Bottom wall
  
  // Interior walls and obstacles
  { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, // Horizontal wall
  { x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }, // Vertical wall
  { x: 15, y: 15 }, // Single block obstacle
  { x: 3, y: 8 }, { x: 4, y: 8 }, // Small horizontal wall
  { x: 8, y: 12 }, { x: 8, y: 13 }, { x: 8, y: 14 }, // Another vertical wall
];

interface MapProps {
  position: { x: number; y: number };
  children: ReactNode;
}

export default function Map({ position, children }: MapProps) {
  const items = [
    { x: 3, y: 3, icon: Monitor, label: "Screen 1" },
    { x: 12, y: 8, icon: Monitor, label: "Screen 2" },
    { x: 7, y: 15, icon: Users, label: "Meeting Area" },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {children}
      
      <div className="absolute left-0 top-0">
        <div
          className="relative"
          style={{
            width: TILE_SIZE * GRID_SIZE,
            height: TILE_SIZE * GRID_SIZE,
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0 grid"
            style={{
              backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
              backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(128,128,128,0.1) 1px, transparent 1px)`,
            }}
          />

          {/* Walls and Obstacles */}
          {OBSTACLES.map((obstacle, index) => (
            <div
              key={index}
              className="absolute bg-gray-800 dark:bg-gray-700"
              style={{
                left: obstacle.x * TILE_SIZE,
                top: obstacle.y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          ))}

          {/* Interactive Items */}
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute flex flex-col items-center justify-center",
                "transition-transform hover:scale-110 cursor-pointer"
              )}
              style={{
                left: item.x * TILE_SIZE,
                top: item.y * TILE_SIZE,
              }}
            >
              <item.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            </div>
          ))}

          {/* Player */}
          <Player position={position} />
        </div>
      </div>
    </div>
  );
}