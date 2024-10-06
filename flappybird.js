document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("flappyCanvas");
  const ctx = canvas.getContext("2d");

  // Game variables
  let birdY = 150;
  const birdX = 50;
  const birdSize = 20;
  let gravity = 1.5;
  let lift = -20;
  let velocity = 0;

  let pipes = [];
  const pipeWidth = 30;
  const pipeGap = 100;
  let frameCount = 0;
  let score = 0;

  const scoreElement = document.getElementById("score");

  // Draw bird
  function drawBird() {
      ctx.fillStyle = "#FFDD00";  // Yellow bird
      ctx.fillRect(birdX, birdY, birdSize, birdSize);
  }

  // Create pipes
  function createPipes() {
      if (frameCount % 100 === 0) {
          const pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
          pipes.push({
              x: canvas.width,
              y: pipeY
          });
      }
  }

  // Draw pipes
  function drawPipes() {
      pipes.forEach(pipe => {
          ctx.fillStyle = "#008000";  // Green pipes
          ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);  // Upper pipe
          ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);  // Lower pipe
      });
  }

  // Move pipes
  function movePipes() {
      pipes.forEach(pipe => {
          pipe.x -= 2;
      });

      // Remove off-screen pipes and increment score
      pipes = pipes.filter(pipe => {
          if (pipe.x + pipeWidth < 0) {
              score++;
              scoreElement.textContent = "Score: " + score;
              return false;
          }
          return true;
      });
  }

  // Handle bird's movement
  function updateBird() {
      velocity += gravity;
      birdY += velocity;

      // Prevent bird from going off the screen
      if (birdY + birdSize > canvas.height || birdY < 0) {
          resetGame();
      }
  }

  // Detect collisions with pipes
  function detectCollision() {
      pipes.forEach(pipe => {
          if (
              birdX + birdSize > pipe.x &&
              birdX < pipe.x + pipeWidth &&
              (birdY < pipe.y || birdY + birdSize > pipe.y + pipeGap)
          ) {
              resetGame();
          }
      });
  }

  // Reset game function
  function resetGame() {
      birdY = 150;
      velocity = 0;
      pipes = [];
      score = 0;
      scoreElement.textContent = "Score: 0";
  }

  // Main game loop
  function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      createPipes();
      movePipes();
      drawPipes();
      drawBird();
      updateBird();
      detectCollision();

      frameCount++;
      requestAnimationFrame(gameLoop);
  }

  // Flap bird when space key is pressed
  document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
          velocity = lift;
      }
  });

  // Start the game loop
  gameLoop();
});
