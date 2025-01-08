export interface Block {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  isTarget?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export type Grid = (string | null)[][];

export interface GameState {
  blocks: Block[];
  selectedBlockId: string | null;
  moves: number;
  isComplete: boolean;
  startTime: number;
  elapsedTime: number;
  difficulty: string;
}

export interface Level {
  name: string;
  blocks: Block[];
  targetPosition: Position;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';