// Flappy Bird JavaScript Code

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("flappyCanvas");
  const context = canvas.getContext("2d");

  // Bird settings
  let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -12,
    velocity: 0
  };

  // Pipe settings
  let pipes = [];
  let pipeWidth = 30;
  let pipeGap = 100;
  let pipeSpeed = 2;
  let frame = 0;

  // Score
  let score = 0;

  // Function to draw the bird
  function drawBird() {
    context.fillStyle = "yellow";
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
  }

  // Function to create pipes
  function createPipes() {
    if (frame % 90 === 0) {
      let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
      pipes.push({ x: canvas.width, y: pipeY });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= pipeSpeed;

      // Draw top pipe
      context.fillStyle = "green";
      context.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].y);

      // Draw bottom pipe
      context.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipeWidth, canvas.height);

      // Check for collision
      if (
        bird.x + bird.width > pipes[i].x &&
        bird.x < pipes[i].x + pipeWidth &&
        (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipeGap)
      ) {
        resetGame();
      }

      // Remove pipes when out of view
      if (pipes[i].x + pipeWidth < 0) {
        pipes.splice(i, 1);
        score++;
      }
    }
  }

  // Function to reset the game
  function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
  }

  // Game loop
  function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity to the bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Prevent bird from going off screen
    if (bird.y + bird.height > canvas.height) {
      bird.y = canvas.height - bird.height;
      bird.velocity = 0;
    } else if (bird.y < 0) {
      bird.y = 0;
      bird.velocity = 0;
    }

    // Draw and update bird
    drawBird();

    // Create and update pipes
    createPipes();

    // Display score
    context.fillStyle = "black";
    context.font = "20px Comic Sans MS";
    context.fillText("Score: " + score, 10, 25);

    // Increment frame counter
    frame++;

    requestAnimationFrame(gameLoop);
  }

  // Bird flaps when spacebar is pressed
  document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
      bird.velocity = bird.lift;
    }
  });

  // Start the game
  gameLoop();
});