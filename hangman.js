document.addEventListener('DOMContentLoaded', () => {
  const word = "RETRO";
  let guessedLetters = [];
  let remainingAttempts = 6;
  
  function drawHangman() {
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');
    // Drawing code will go here
  }

  function updateDisplay() {
    // Update the display for guessed letters and remaining attempts
  }

  document.addEventListener('keypress', (event) => {
    const guess = event.key.toUpperCase();
    if (word.includes(guess) && !guessedLetters.includes(guess)) {
      guessedLetters.push(guess);
      updateDisplay();
    } else {
      remainingAttempts--;
      drawHangman();
    }
  });

  updateDisplay();
});


// Hangman JavaScript

document.addEventListener("DOMContentLoaded", function() {
  const words = ["javascript", "hangman", "retro", "canvas", "coding"];
  const canvas = document.getElementById("hangmanCanvas");
  const context = canvas.getContext("2d");

  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let wordDisplay = document.getElementById("wordDisplay");
  let wrongGuesses = document.getElementById("wrongGuesses");
  let letterInput = document.getElementById("letterInput");
  let submitGuess = document.getElementById("submitGuess");

  let guesses = [];
  let wrongGuessCount = 0;

  // Create blank spaces for the selected word
  let displayWord = Array(selectedWord.length).fill("_");

  // Update the word display
  wordDisplay.textContent = "Word: " + displayWord.join(" ");

  // Draw initial hangman structure
  function drawHangman() {
    context.lineWidth = 2;
    context.strokeStyle = "#000";

    // Base
    context.beginPath();
    context.moveTo(50, 380);
    context.lineTo(250, 380);
    context.stroke();

    // Vertical post
    context.beginPath();
    context.moveTo(100, 380);
    context.lineTo(100, 50);
    context.stroke();

    // Horizontal post
    context.beginPath();
    context.moveTo(100, 50);
    context.lineTo(200, 50);
    context.stroke();

    // Rope
    context.beginPath();
    context.moveTo(200, 50);
    context.lineTo(200, 100);
    context.stroke();
  }

  // Draw hangman body based on wrong guesses
  function drawBodyPart(part) {
    context.strokeStyle = "#000";

    switch (part) {
      case 1: // Head
        context.beginPath();
        context.arc(200, 130, 30, 0, Math.PI * 2);
        context.stroke();
        break;
      case 2: // Body
        context.beginPath();
        context.moveTo(200, 160);
        context.lineTo(200, 250);
        context.stroke();
        break;
      case 3: // Left arm
        context.beginPath();
        context.moveTo(200, 180);
        context.lineTo(150, 220);
        context.stroke();
        break;
      case 4: // Right arm
        context.beginPath();
        context.moveTo(200, 180);
        context.lineTo(250, 220);
        context.stroke();
        break;
      case 5: // Left leg
        context.beginPath();
        context.moveTo(200, 250);
        context.lineTo(150, 300);
        context.stroke();
        break;
      case 6: // Right leg
        context.beginPath();
        context.moveTo(200, 250);
        context.lineTo(250, 300);
        context.stroke();
        break;
      default:
        break;
    }
  }

  // Function to check the guessed letter
  function checkGuess(letter) {
    let correct = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        displayWord[i] = letter;
        correct = true;
      }
    }

    if (!correct) {
      wrongGuessCount++;
      drawBodyPart(wrongGuessCount);
    }

    wordDisplay.textContent = "Word: " + displayWord.join(" ");
    wrongGuesses.textContent = "Wrong Guesses: " + wrongGuessCount;

    // Check if the game is over
    if (wrongGuessCount === 6) {
      alert("Game over! The word was: " + selectedWord);
      resetGame();
    }

    if (!displayWord.includes("_")) {
      alert("You win! The word was: " + selectedWord);
      resetGame();
    }
  }

  // Reset game function
  function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(selectedWord.length).fill("_");
    wrongGuessCount = 0;
    wordDisplay.textContent = "Word: " + displayWord.join(" ");
    wrongGuesses.textContent = "Wrong Guesses: " + wrongGuessCount;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawHangman();
  }

  // Initialize game
  drawHangman();

  // Event listener for guessing letters
  submitGuess.addEventListener("click", function() {
    let guessedLetter = letterInput.value.toLowerCase();
    if (guessedLetter && !guesses.includes(guessedLetter)) {
      guesses.push(guessedLetter);
      checkGuess(guessedLetter);
      letterInput.value = "";
    }
  });
});
