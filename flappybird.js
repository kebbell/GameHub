document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("flappyCanvas");
  const ctx = canvas.getContext("2d");

  // Game variables
  const bird = {
      x: 50,
      y: 150,
      width: 20,
      height: 20,
      gravity: 1.5,
      lift: -20,
      velocity: 0
  };

  const pipes = [];
  const pipeWidth = 30;
  const pipeGap = 100;
  let frameCount = 0;
  let score = 0;

  // Load the bird image
  const birdImage = new Image();
  birdImage.src = 'bird.png'; // Make sure you have an image named 'bird.png' in your project directory

  // Load the pipe images
  const pipeNorthImage = new Image();
  pipeNorthImage.src = 'pipeNorth.png'; // Add pipe images to your project
  const pipeSouthImage = new Image();
  pipeSouthImage.src = 'pipeSouth.png';

  // Draw bird
  function drawBird() {
      ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  }

  // Create pipes
  function createPipes() {
      if (frameCount % 100 === 0) {
          const pipeY = Math.floor(Math.random() * canvas.height) - pipeGap;
          pipes.push({
              x: canvas.width,
              y: pipeY
          });
      }
  }

  // Draw pipes
  function drawPipes() {
      pipes.forEach(pipe => {
          ctx.drawImage(pipeNorthImage, pipe.x, pipe.y, pipeWidth, canvas.height);
          ctx.drawImage(pipeSouthImage, pipe.x, pipe.y + canvas.height + pipeGap, pipeWidth, canvas.height);
      });
  }

  // Move pipes
  function movePipes() {
      pipes.forEach(pipe => {
          pipe.x -= 2;
      });

      // Remove off-screen pipes
      pipes.forEach((pipe, index) => {
          if (pipe.x + pipeWidth < 0) {
              pipes.splice(index, 1);
              score++;
          }
      });
  }

  // Draw score
  function drawScore() {
      ctx.fillStyle = "#000";
      ctx.font = "24px Arial";
      ctx.fillText("Score: " + score, 10, 30);
  }

  // Handle bird's movement
  function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      // Prevent bird from going off the screen
      if (bird.y + bird.height > canvas.height || bird.y < 0) {
          resetGame();
      }
  }

  // Detect collisions with pipes
  function detectCollision() {
      pipes.forEach(pipe => {
          if (
              bird.x + bird.width > pipe.x &&
              bird.x < pipe.x + pipeWidth &&
              (bird.y < pipe.y + canvas.height || bird.y + bird.height > pipe.y + canvas.height + pipeGap)
          ) {
              resetGame();
          }
      });
  }

  // Reset game function
  function resetGame() {
      bird.y = 150;
      bird.velocity = 0;
      pipes.length = 0;
      score = 0;
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
      drawScore();

      frameCount++;
      requestAnimationFrame(gameLoop);
  }

  // Flap bird when space key is pressed
  document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
          bird.velocity = bird.lift;
      }
  });

  // Start the game loop
  gameLoop();
});
