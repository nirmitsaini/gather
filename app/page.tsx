"use client";

import { useState } from 'react';
import Map from '@/components/map';
import { useKeyboardMovement } from '@/hooks/use-keyboard-movement';
import Providers from '@/components/providers';
import { TILE_SIZE } from '@/components/map';

export default function Home() {
  const [position, setPosition] = useState({ x: 3 * TILE_SIZE, y: 3 * TILE_SIZE });
  useKeyboardMovement(position, setPosition);

  return (
    <Providers>
      <div className="w-full h-screen">
        <Map position={position}>
          <div className="fixed top-4 left-4 z-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-2">Virtual Space</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use WASD or arrow keys to move
            </p>
          </div>
        </Map>
      </div>
    </Providers>
  );
}