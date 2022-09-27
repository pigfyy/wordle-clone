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
          letterToAddEl.addEventListener("click", () => {
            if (letter === "backspace") {
              // on backspace
            } else if (letter === "keyboard_return") {
              // return word
            } else {
              // add character
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

      const textArea = document.querySelector("#input");
      if (key === "Backspace") {
        // on backspace
      } else if (key === "Enter") {
        // return word
      } else {
        // add character
      }
      function lettersOnly() {
        var charCode = letter.keyCode;

        if (
          (charCode > 64 && charCode < 91) ||
          (charCode > 96 && charCode < 123) ||
          charCode == 8
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
        blockEl.innerText = "A";
        gameContainerEl.appendChild(blockEl);
      }
    }
  }
}
