import { useState, useCallback, useEffect } from 'react';
import { Block, GameState, Grid, Position, Level } from '../types/game';
import { levels } from '../levels';

// ... (previous code remains the same until checkWinCondition)

const checkWinCondition = (blocks: Block[], targetPosition: Position): boolean => {
  const targetBlock = blocks.find(block => block.isTarget);
  if (!targetBlock) return false;

  // Check if the target block is at the bottom-right corner
  const isAtBottomRight = 
    targetBlock.x === targetPosition.x && 
    targetBlock.y === targetPosition.y &&
    // Ensure it's actually at the bottom (considering block height)
    targetBlock.y + targetBlock.height === 4;
  
  return isAtBottomRight;
};