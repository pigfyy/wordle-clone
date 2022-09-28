let currentRow = 0;

makeKeyboard();
function makeKeyboard() {
  const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdRow = [
    "keyboard_return",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "backspace",
  ];

  const keyboardLineEls = document.querySelectorAll(".keyboard-line");
  keyboardLineEls.forEach((line) => {
    let row;
    if (line.getAttribute("data-row") === "first-row") row = firstRow;
    if (line.getAttribute("data-row") === "second-row") row = secondRow;
    if (line.getAttribute("data-row") === "third-row") row = thirdRow;

    makeRow();
    function makeRow() {
      row.forEach((letter) => {
        const letterToAddEl = document.createElement("button");
        letterToAddEl.innerText = letter;
        letterToAddEl.classList.add("keyboard-key");
        letterToAddEl.setAttribute("keyboard-key", letter);
        if (letter.length > 1) {
          letterToAddEl.classList.add("material-symbols-sharp");
          letterToAddEl.classList.add("keyboard-symbols");
        }

        onClick();
        function onClick() {
          letterToAddEl.addEventListener("mouseup", () => {
            console.log("hi");
            if (letter === "backspace") {
              removeLetter();
            } else if (letter === "keyboard_return") {
              nextRow();
            } else {
              addLetter(letter);
            }
            letterToAddEl.style.filter = "brightness(0.7)";
            setTimeout(() => {
              letterToAddEl.style.filter = "brightness(1)";
            }, 30);
          });
        }

        line.appendChild(letterToAddEl);
      });
    }
  });

  keyboardClick();
  function keyboardClick() {
    document.addEventListener("keydown", (letter) => {
      let key = letter.key;
      if (!lettersOnly()) {
        return;
      }
      if (key === "Backspace") {
        removeLetter();
      } else if (key === "Enter") {
        nextRow();
      } else {
        addLetter(key);
      }
      function lettersOnly() {
        var charCode = letter.keyCode;
        if (
          (charCode > 64 && charCode < 91) ||
          (charCode > 96 && charCode < 123) ||
          charCode == 8 ||
          charCode == 13
        )
          return true;
        else return false;
      }
    });
  }
}

makeGameBoard();
function makeGameBoard() {
  const gameContainerEl = document.querySelector(".game-board");
  createBlocks();
  function createBlocks() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        const blockEl = document.createElement("div");
        blockEl.classList.add("game-block");
        blockEl.setAttribute("game-row", i + 1);
        blockEl.setAttribute("game-col", j + 1);
        gameContainerEl.appendChild(blockEl);
      }
    }
  }
}

function addLetter(c) {
  const gameBlockEls = document.querySelectorAll(".current-row");
  for (let i = 0; i < gameBlockEls.length; i++) {
    if (!gameBlockEls[i].classList.contains("filled")) {
      gameBlockEls[i].innerText = c;
      gameBlockEls[i].classList.add("filled");
      break;
    }
  }
}

function removeLetter() {
  const gameBlockEls = document.querySelectorAll(".current-row.filled");
  if (gameBlockEls.length === 0) return;
  gameBlockEls[gameBlockEls.length - 1].innerText = "";
  gameBlockEls[gameBlockEls.length - 1].classList.remove("filled");
}

nextRow();
function nextRow() {
  if (!isRowFilled()) return;
  currentRow++;
  setCurrentRow(currentRow);
}

function isRowFilled() {
  const gameBlockEls = document.querySelectorAll(".current-row");
  let isFilled = true;
  gameBlockEls.forEach((gameBlockEl) => {
    if (!gameBlockEl.classList.contains("filled")) {
      console.log("hi");
      isFilled = false;
    }
  });
  if (isFilled) return true;
  return false;
}

function setCurrentRow(rowNum) {
  const lastRowEls = document.querySelectorAll(".current-row");
  lastRowEls.forEach((lastRowEl) => {
    lastRowEl.classList.remove("current-row");
  });

  const gameBlockEls = document.querySelectorAll(".game-block");
  gameBlockEls.forEach((gameBlockEl) => {
    if (gameBlockEl.getAttribute("game-row") == rowNum) {
      gameBlockEl.classList.add("current-row");
    }
  });
}
