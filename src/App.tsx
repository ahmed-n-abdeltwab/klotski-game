import React, { useEffect } from 'react';
import { Block } from './components/Block';
import { Grid } from './components/Grid';
import { useKlotski } from './hooks/useKlotski';
import { RefreshCw, Timer, Move, Save, Trash2, Trophy } from 'lucide-react';
import { levels } from './levels';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function App() {
  const { gameState, selectBlock, moveBlock, resetGame, clearSavedGame, setDifficulty } = useKlotski();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveBlock(0, -1);
          break;
        case 'ArrowDown':
          moveBlock(0, 1);
          break;
        case 'ArrowLeft':
          moveBlock(-1, 0);
          break;
        case 'ArrowRight':
          moveBlock(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveBlock]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Klotski Puzzle</h1>
          <p className="text-gray-400">
            Move the red block to the bottom center position
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {Object.keys(levels).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                gameState.difficulty === difficulty
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <div className="relative aspect-[5/4] w-full">
            <Grid />
            {gameState.blocks.map((block) => (
              <Block
                key={block.id}
                block={block}
                isSelected={block.id === gameState.selectedBlockId}
                onClick={() => selectBlock(block.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Move size={16} />
              <span className="text-white font-bold">{gameState.moves}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Timer size={16} />
              <span className="text-white font-bold">{formatTime(gameState.elapsedTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Save size={16} />
              <span className="text-white text-sm">Auto-saved</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearSavedGame}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Clear saved game"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {gameState.isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Puzzle Complete! 🎉</h2>
              <div className="space-y-2 mb-6">
                <p className="font-semibold text-gray-700">
                  Difficulty: <span className="text-indigo-600">{gameState.difficulty}</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Moves: <span className="text-indigo-600">{gameState.moves}</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Time: <span className="text-indigo-600">{formatTime(gameState.elapsedTime)}</span>
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setDifficulty(
                    Object.keys(levels)[
                      (Object.keys(levels).indexOf(gameState.difficulty) + 1) % Object.keys(levels).length
                    ]
                  )}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next Level
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;