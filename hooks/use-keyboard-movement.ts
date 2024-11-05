"use client";

import { useEffect } from "react";
import { OBSTACLES, TILE_SIZE, GRID_SIZE } from "@/components/map";

const MOVEMENT_SPEED = 4;
const DIAGONAL_FACTOR = Math.sqrt(2) / 2;

export function useKeyboardMovement(
  position: { x: number; y: number },
  setPosition: (pos: { x: number; y: number }) => void
) {
  const checkCollision = (newX: number, newY: number): boolean => {
    // Get the player's bounding box
    const playerLeft = newX - 16; // Half player width
    const playerRight = newX + 16;
    const playerTop = newY - 16;
    const playerBottom = newY + 16;

    // Check collision with obstacles
    return OBSTACLES.some(obstacle => {
      const obstacleLeft = obstacle.x * TILE_SIZE;
      const obstacleRight = (obstacle.x + 1) * TILE_SIZE;
      const obstacleTop = obstacle.y * TILE_SIZE;
      const obstacleBottom = (obstacle.y + 1) * TILE_SIZE;

      return !(
        playerLeft >= obstacleRight ||
        playerRight <= obstacleLeft ||
        playerTop >= obstacleBottom ||
        playerBottom <= obstacleTop
      );
    });
  };

  useEffect(() => {
    const keys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.add(e.key.toLowerCase());
      updatePosition();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };

    function updatePosition() {
      let dx = 0;
      let dy = 0;

      // WASD or Arrow keys
      if (keys.has("w") || keys.has("arrowup")) dy -= 1;
      if (keys.has("s") || keys.has("arrowdown")) dy += 1;
      if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
      if (keys.has("d") || keys.has("arrowright")) dx += 1;

      // Adjust speed for diagonal movement
      if (dx !== 0 && dy !== 0) {
        dx *= DIAGONAL_FACTOR;
        dy *= DIAGONAL_FACTOR;
      }

      if (dx !== 0 || dy !== 0) {
        const newX = position.x + dx * MOVEMENT_SPEED;
        const newY = position.y + dy * MOVEMENT_SPEED;

        // Keep player within bounds and check for collisions
        if (
          newX >= 32 &&
          newX <= (GRID_SIZE - 1) * TILE_SIZE - 32 &&
          newY >= 32 &&
          newY <= (GRID_SIZE - 1) * TILE_SIZE - 32 &&
          !checkCollision(newX, newY)
        ) {
          setPosition({ x: newX, y: newY });
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const interval = setInterval(updatePosition, 16); // ~60fps

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [position, setPosition]);
}