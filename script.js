const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const undoButton = document.getElementById("undo-button");
const moveCounter = document.getElementById("move-counter");
const levelIndicator = document.getElementById("level-indicator");
const winMessage = document.getElementById("win-message");

let currentLevel = 1;
let moves = 0;
let boardState = [];
let moveHistory = [];

const levels = [
  {
    board: [
      [1, 1, 0, 0, 0],
      [1, 1, 2, 0, 0],
      [3, 0, 2, 0, 0],
      [3, 0, 0, 0, "exit"],
    ],
    blocks: {
      1: { width: 2, height: 2, color: "red" }, // Main block
      2: { width: 1, height: 2, color: "blue" },
      3: { width: 1, height: 2, color: "green" },
    },
    exit: { row: 3, col: 4 }, // Exit position
  },
  {
    board: [
      [1, 1, 2, 0, 0],
      [1, 1, 2, 0, 0],
      [3, 0, 0, 0, 0],
      [3, 0, 0, 0, "exit"],
    ],
    blocks: {
      1: { width: 2, height: 2, color: "red" }, // Main block
      2: { width: 1, height: 2, color: "blue" },
      3: { width: 1, height: 2, color: "green" },
    },
    exit: { row: 3, col: 4 }, // Exit position
  },
];

function initializeGame() {
  const level = levels[currentLevel - 1];
  boardState = JSON.parse(JSON.stringify(level.board)); // Deep copy
  renderBoard();
  moves = 0;
  moveCounter.textContent = moves;
  winMessage.style.display = "none";
}

function renderBoard() {
  gameBoard.innerHTML = "";
  const level = levels[currentLevel - 1];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const cellValue = boardState[row][col];
      const cell = document.createElement("div");
      if (cellValue === "exit") {
        cell.classList.add("block", "exit");
      } else if (cellValue !== 0) {
        const block = level.blocks[cellValue];
        cell.classList.add("block");
        cell.style.backgroundColor = block.color;
        if (block.width === 2 && block.height === 2) {
          cell.classList.add("main");
        }
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.value = cellValue;
        cell.addEventListener("click", () => moveBlock(row, col));
      }
      gameBoard.appendChild(cell);
    }
  }
}

function moveBlock(row, col) {
  const blockValue = boardState[row][col];
  if (blockValue === 0 || blockValue === "exit") return;

  const level = levels[currentLevel - 1];
  const block = level.blocks[blockValue];
  const directions = [
    { row: -1, col: 0, direction: "up" }, // Up
    { row: 1, col: 0, direction: "down" }, // Down
    { row: 0, col: -1, direction: "left" }, // Left
    { row: 0, col: 1, direction: "right" }, // Right
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (canMove(blockValue, newRow, newCol, dir.direction)) {
      moveHistory.push(JSON.parse(JSON.stringify(boardState)));
      updateBoard(blockValue, row, col, newRow, newCol, dir.direction);
      moves++;
      moveCounter.textContent = moves;
      checkWin();
      return;
    }
  }
}

function canMove(blockValue, newRow, newCol, direction) {
  const level = levels[currentLevel - 1];
  const block = level.blocks[blockValue];

  // Check boundaries and overlapping
  if (direction === "up" || direction === "down") {
    for (let i = 0; i < block.width; i++) {
      const row = newRow + (direction === "down" ? block.height - 1 : 0);
      const col = newCol + i;
      if (
        row < 0 ||
        row >= 4 ||
        col < 0 ||
        col >= 5 ||
        (boardState[row][col] !== 0 && boardState[row][col] !== blockValue)
      ) {
        return false;
      }
    }
  } else if (direction === "left" || direction === "right") {
    for (let i = 0; i < block.height; i++) {
      const row = newRow + i;
      const col = newCol + (direction === "right" ? block.width - 1 : 0);
      if (
        row < 0 ||
        row >= 4 ||
        col < 0 ||
        col >= 5 ||
        (boardState[row][col] !== 0 && boardState[row][col] !== blockValue)
      ) {
        return false;
      }
    }
  }
  return true;
}

function updateBoard(blockValue, oldRow, oldCol, newRow, newCol, direction) {
  const level = levels[currentLevel - 1];
  const block = level.blocks[blockValue];

  // Clear old position
  for (let i = 0; i < block.height; i++) {
    for (let j = 0; j < block.width; j++) {
      boardState[oldRow + i][oldCol + j] = 0;
    }
  }

  // Update new position
  for (let i = 0; i < block.height; i++) {
    for (let j = 0; j < block.width; j++) {
      boardState[newRow + i][newCol + j] = blockValue;
    }
  }

  renderBoard();
}

function checkWin() {
  const level = levels[currentLevel - 1];
  const exitRow = level.exit.row;
  const exitCol = level.exit.col;
  if (boardState[exitRow][exitCol] === 1) {
    winMessage.style.display = "block";
    setTimeout(() => {
      if (currentLevel < levels.length) {
        currentLevel++;
        levelIndicator.textContent = currentLevel;
        initializeGame();
      } else {
        alert("Congratulations! You completed all levels!");
      }
    }, 1000);
  }
}

resetButton.addEventListener("click", initializeGame);
undoButton.addEventListener("click", () => {
  if (moveHistory.length > 0) {
    boardState = moveHistory.pop();
    renderBoard();
    moves--;
    moveCounter.textContent = moves;
  }
});

initializeGame();
