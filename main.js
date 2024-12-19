// Game variables
let wordList = ["apple", "grain", "paint", "flask", "stone"];
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentGuess = "";
let attempts = 0;

let board = document.getElementById("game-board");
let input = document.getElementById("guess-input");
let submitButton = document.getElementById("submit-guess");
let feedback = document.getElementById("feedback");

// Initialize the game board
function initializeBoard() {
  for (let i = 0; i < 30; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    board.appendChild(tile);
  }
}

initializeBoard();

// Handle guesses
submitButton.addEventListener("click", function () {
  if (input.value.length !== 5) {
    feedback.textContent = "Guess must be 5 letters!";
    return;
  }

  currentGuess = input.value.toLowerCase();
  updateBoard();
  checkGuess();
  input.value = "";
});

function updateBoard() {
  let tiles = document.querySelectorAll(".tile");
  let rowStart = attempts * 5;

  for (let i = 0; i < 5; i++) {
    tiles[rowStart + i].textContent = currentGuess[i];
  }
}

function checkGuess() {
  let tiles = document.querySelectorAll(".tile");
  let rowStart = attempts * 5;

  for (let i = 0; i < 5; i++) {
    let letter = currentGuess[i];
    if (letter === targetWord[i]) {
      tiles[rowStart + i].classList.add("green");
    } else if (targetWord.includes(letter)) {
      tiles[rowStart + i].classList.add("yellow");
    } else {
      tiles[rowStart + i].classList.add("gray");
    }
  }

  attempts++;
  if (currentGuess === targetWord) {
    feedback.textContent = "🎉 You guessed it!";
    submitButton.disabled = true;
  } else if (attempts === 6) {
    feedback.textContent = `Game Over! The word was ${targetWord}.`;
    submitButton.disabled = true;
  } 
}
