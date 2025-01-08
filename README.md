# Klotski Sliding Block Puzzle Game

This is a simple Klotski sliding block puzzle game implemented using HTML, CSS, and JavaScript. The goal of the game is to move the large block to the target position on the grid by sliding smaller blocks around. The game includes multiple difficulty levels, a move counter, and the ability to save the player's progress.

## Features
- **Multiple Difficulty Levels**: Easy, Medium, Hard, Expert, and Random.
- **Move Counter**: Tracks the number of moves the player has made.
- **Win Condition**: The player wins when the large block reaches the bottom-right corner of the grid.
- **Save Progress**: The game saves the number of moves and the puzzle state in `localStorage` so the player can resume where they left off.
- **Reset Button**: Allows the player to reset the game and start over.
- **Responsive Layout**: The game is designed to be centered on the screen and is responsive to different screen sizes.

## How to Play
1. The game will present you with a grid of blocks. Your goal is to move the large block to the bottom-right corner of the grid.
2. Click on a block to move it to an adjacent empty space. Blocks can only move horizontally or vertically.
3. The game tracks the number of moves you've made and displays it at the top.
4. When you reach the goal, the game will notify you of your success and save your progress.

## Levels
- **Easy**: A simple layout with fewer blocks.
- **Medium**: A more complex layout with more blocks.
- **Hard**: A challenging layout with many blocks.
- **Expert**: An expert-level layout with difficult block arrangements.
- **Random**: A dynamically generated random layout for a unique challenge every time.

## Technologies Used
- **HTML**: For the game structure and layout.
- **CSS**: For styling the game interface and making it responsive.
- **JavaScript**: For game logic, handling user interactions, and saving/loading the game state using `localStorage`.

## Installation
To run the game locally on your machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/klotski-game.git
    ```

2. Navigate to the project folder:
    ```bash
    cd klotski-game
    ```

3. Open the `index.html` file in your browser to play the game.

## How to Contribute
If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a description of what you've done.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
