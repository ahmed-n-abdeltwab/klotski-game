import React from 'react';
import { Block as BlockType } from '../types/game';

interface BlockProps {
  block: BlockType;
  isSelected: boolean;
  onClick: () => void;
}

export function Block({ block, isSelected, onClick }: BlockProps) {
  const width = `${block.width * 20}%`;
  const height = `${block.height * 25}%`;
  const left = `${block.x * 20}%`;
  const top = `${block.y * 25}%`;

  return (
    <div
      className={`absolute transition-all duration-200 cursor-pointer rounded-lg 
        ${isSelected ? 'ring-4 ring-blue-400' : ''}
        ${block.isTarget ? 'bg-red-500' : 'bg-indigo-600'} 
        hover:brightness-110`}
      style={{ width, height, left, top }}
      onClick={onClick}
    >
      <div className="w-full h-full flex items-center justify-center">
        {block.isTarget && (
          <span className="text-white font-bold text-sm">Target</span>
        )}
      </div>
    </div>
  );
}