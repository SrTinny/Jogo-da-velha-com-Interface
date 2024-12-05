const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const xWinsElement = document.getElementById("x-wins");
const oWinsElement = document.getElementById("o-wins");

let isCircleTurn;
let xWins = 0;
let oWins = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle", "x", "highlight");
    cell.innerText = ""; // Limpa qualquer texto da célula
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    if (isCircleTurn) {
      oWins++;
      oWinsElement.innerText = oWins; // Atualiza o contador de vitórias do O
      winningMessageTextElement.innerText = "O Venceu!";
    } else {
      xWins++;
      xWinsElement.innerText = xWins; // Atualiza o contador de vitórias do X
      winningMessageTextElement.innerText = "X Venceu!";
    }
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  const winningCombination = winningCombinations.find((combination) =>
    combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    })
  );

  if (winningCombination) {
    highlightWinningCells(winningCombination);
    return true;
  }
  return false;
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
  cell.innerText = classToAdd === "circle" ? "O" : "X"; // Adiciona texto para clareza
};

const setBoardHoverClass = () => {
  board.classList.remove("circle", "x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const highlightWinningCells = (combination) => {
  combination.forEach((index) => {
    cellElements[index].classList.add("highlight"); // Adiciona destaque às células vencedoras
  });
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
