// Set up the canvas for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const grid = 20; // Size of the grid cell
const gridSize = canvas.width / grid; // Number of cells in the grid

// Snake settings
let snake = [{x: 10, y: 10}]; // Initial snake position
let snakeLength = 1;
let velocity = {x: 0, y: -1}; // Initial movement direction

// Food settings
let food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};

// Obstacles settings
let obstacles = [
    {x: 5, y: 5},
    {x: 8, y: 8}
]; // Initial obstacles positions

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update snake position
    const head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};
    snake.unshift(head);

    // Check for collisions with the game borders
    if (head.x >= gridSize) head.x = 0;
    if (head.y >= gridSize) head.y = 0;
    if (head.x < 0) head.x = gridSize - 1;
    if (head.y < 0) head.y = gridSize - 1;

    // Check for collisions with the snake itself
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        return alert('Game Over');
    }

    // Check for collisions with obstacles
    obstacles.forEach(obstacle => {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            return alert('Game Over');
        }
    });

    // Check for eating food
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
    } else {
        snake.pop(); // Remove the last part of the snake
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * grid, food.y * grid, grid - 1, grid - 1);

    // Draw obstacles
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'black'; // Obstacle color
        ctx.fillRect(obstacle.x * grid, obstacle.y * grid, grid - 1, grid - 1);
    });

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lime'; // Head is a different color
        ctx.fillRect(segment.x * grid, segment.y * grid, grid - 1, grid - 1);
    });

    // Move the snake
    setTimeout(gameLoop, 100);
}

// Change snake direction with keyboard arrows
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': velocity = {x: 0, y: -1}; break;
        case 'ArrowDown': velocity = {x: 0, y: 1}; break;
        case 'ArrowLeft': velocity = {x: -1, y: 0}; break;
        case 'ArrowRight': velocity = {x: 1, y: 0}; break;
    }
});

// Start the game
gameLoop();