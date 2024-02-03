const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "rond";
infoDisplay.textContent = "C'est au joueur rond de commencer";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    gameBoard.append(cellElement);
    cellElement.addEventListener("click", addGo);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "rond" ? "croix" : "rond";
  infoDisplay.textContent = " c'est au tour de " + go;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const rondWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("rond")
    );

    if (rondWins) {
      infoDisplay.textContent = "Les ronds ont gagnés !";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const croixWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("croix")
    );

    if (croixWins) {
      infoDisplay.textContent = "Les croix ont gagnés !";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
