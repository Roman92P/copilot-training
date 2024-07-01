window.onload = function() {
    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var gridSize = 20;
    var tileSize = canvas.width / gridSize - 2;
    var snake = [{x: 10, y: 10}];
    var food = {x: 15, y: 15};
    var velocity = {x: 0, y: 0};
    var newVelocity = {x: 0, y: 0};
    var snakeLength = 5;

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        velocity = {...newVelocity};
        var head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

        if (head.x >= gridSize) head.x = 0;
        if (head.y >= gridSize) head.y = 0;
        if (head.x < 0) head.x = gridSize - 1;
        if (head.y < 0) head.y = gridSize - 1;

        snake.unshift(head);

        if (snake[0].x == food.x && snake[0].y == food.y) {
            snakeLength++;
            food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
        }

        while (snake.length > snakeLength) {
            snake.pop();
        }

        ctx.fillStyle = 'lime';
        snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, tileSize, tileSize));

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, tileSize, tileSize);

        setTimeout(gameLoop, 1000 / 10);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && velocity.x === 0) newVelocity = {x: -1, y: 0};
        if (e.key === 'ArrowUp' && velocity.y === 0) newVelocity = {x: 0, y: -1};
        if (e.key === 'ArrowRight' && velocity.x === 0) newVelocity = {x: 1, y: 0};
        if (e.key === 'ArrowDown' && velocity.y === 0) newVelocity = {x: 0, y: 1};
    });

    gameLoop();
};