let currentRow = 0;
let word;

getWord();
function getWord() {
  const words = ["apple", "great", "crank", "floss", "irate", "bread"];
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
}
console.log(word);

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

// on key press

function addLetter(c) {
  const gameBlockEls = document.querySelectorAll(".current-row");
  for (let i = 0; i < gameBlockEls.length; i++) {
    if (!gameBlockEls[i].classList.contains("filled")) {
      gameBlockEls[i].innerText = c.toUpperCase();
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

  let str = "";
  const gameBlockEls = document.querySelectorAll(".current-row");
  gameBlockEls.forEach((gameBlockEl) => {
    str += gameBlockEl.innerText;
  });

  isValidWord(str).then((response) => {
    if (response == true || str == "") {
      currentRow++;
      setCurrentRow(currentRow);
      checkPreviousRow();
    }
  });

  function setCurrentRow(rowNum) {
    const gameBlockEls = document.querySelectorAll(".game-block");
    gameBlockEls.forEach((gameBlockEl) => {
      if (gameBlockEl.getAttribute("game-row") == rowNum) {
        gameBlockEl.classList.add("current-row");
      } else if (gameBlockEl.getAttribute("game-row") == rowNum - 1) {
        gameBlockEl.classList.remove("current-row");
        gameBlockEl.classList.add("miss");
      }
    });
  }
  function isRowFilled() {
    const gameBlockEls = document.querySelectorAll(".current-row");
    let isFilled = true;
    gameBlockEls.forEach((gameBlockEl) => {
      if (!gameBlockEl.classList.contains("filled")) {
        isFilled = false;
      }
    });
    if (isFilled) return true;
    return false;
  }
}

//

function checkPreviousRow() {
  let wordArr = word.split("");

  firstCheck();
  function firstCheck() {
    const previousRowEls = document.querySelectorAll(".miss");
    previousRowEls.forEach((previousRowEl) => {
      const letter = previousRowEl.innerText;
      if (wordArr[previousRowEl.getAttribute("game-col") - 1] == letter) {
        previousRowEl.classList.add("correct");
        previousRowEl.classList.remove("miss");
        wordArr[previousRowEl.getAttribute("game-col") - 1] = "0";
      }
    });
  }

  secondCheck();
  function secondCheck() {
    const previousRowEls = document.querySelectorAll(".miss");
    previousRowEls.forEach((previousRowEl) => {
      const letter = previousRowEl.innerText;
      if (wordArr.includes(letter)) {
        previousRowEl.classList.add("present");
        previousRowEl.classList.remove("miss");

        for (let i = 0; i < wordArr.length; i++) {
          if (wordArr[i] == letter) {
            wordArr[i] = "0";
          }
        }
      }
    });
  }
}

isValidWord("hisdf").then((response) => {
  if (response == true) {
    console.log("true");
  }
});

function isValidWord(word) {
  let isValid;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f1c6a7468bmsh3764809616fe5cap16bde0jsn6889be4cfcd0",
      "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    },
  };

  return fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=${word}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const res = response.result_msg;
      if (res != "Success") {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => console.error(err));

  return isValid;
}
