const grid = document.getElementById('grid');
const resetBtn = document.getElementById('reset-btn');
const moveCounter = document.getElementById('move-counter');
const victoryMessage = document.getElementById('victory-message');
const winningMoves = document.getElementById('winning-moves');

let blocks = [];
let gridSize = 4;
let moves = 0;

function initializeGame() {
    blocks = generateRandomBlocks();
    renderGrid();
}

function generateRandomBlocks() {
    let blockArray = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        if (i === gridSize * gridSize - 2) {
            blockArray.push('large-block');
        } else if (i === gridSize * gridSize - 1) {
            blockArray.push('small-block');
        } else {
            blockArray.push('');
        }
    }
    return shuffle(blockArray);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderGrid() {
    grid.innerHTML = '';
    blocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.classList.add('block', block);
        div.addEventListener('click', () => moveBlock(index));
        grid.appendChild(div);
    });
}

function moveBlock(index) {
    if (index === gridSize * gridSize - 1) return; // The large block is at the bottom-right corner

    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    let possibleMoves = [];

    if (row > 0 && blocks[index - gridSize] === '') {
        possibleMoves.push(index - gridSize); // Move up
    }
    if (row < gridSize - 1 && blocks[index + gridSize] === '') {
        possibleMoves.push(index + gridSize); // Move down
    }
    if (col > 0 && blocks[index - 1] === '') {
        possibleMoves.push(index - 1); // Move left
    }
    if (col < gridSize - 1 && blocks[index + 1] === '') {
        possibleMoves.push(index + 1); // Move right
    }

    if (possibleMoves.length > 0) {
        const newIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        swapBlocks(index, newIndex);
        moves++;
        moveCounter.textContent = moves;
        checkVictory();
    }
}

function swapBlocks(index1, index2) {
    [blocks[index1], blocks[index2]] = [blocks[index2], blocks[index1]];
    renderGrid();
}

function checkVictory() {
    if (blocks[gridSize * gridSize - 2] === 'large-block' && blocks[gridSize * gridSize - 1] === 'small-block') {
        victoryMessage.style.display = 'block';
        winningMoves.textContent = moves;
        localStorage.removeItem('gameState');
    }
}

function loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState) {
        blocks = gameState.blocks;
        moves = gameState.moves;
        moveCounter.textContent = moves;
        renderGrid();
    } else {
        initializeGame();
    }
}

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('gameState');
    initializeGame();
});

initializeGame();
loadGameState();

window.addEventListener('beforeunload', saveGameState);
function saveGameState() {
    const gameState = { blocks, moves };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}
