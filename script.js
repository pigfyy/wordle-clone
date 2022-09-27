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
        const letterToAdd = document.createElement("button");
        letterToAdd.innerText = letter;
        letterToAdd.classList.add("keyboard-key");
        letterToAdd.setAttribute("keyboard-key", letter);
        if (letter.length > 1) {
          letterToAdd.classList.add("material-symbols-sharp");
          letterToAdd.classList.add("keyboard-symbols");
        }

        onClick();
        function onClick() {
          letterToAdd.addEventListener("click", (e) => {
            const textArea = document.querySelector("#input");
            e.preventDefault();
            if (letter === "backspace") {
              const str = textArea.value;
              textArea.value = str.slice(0, -1);
            } else if (letter === "keyboard_return") {
              alert("no function yet");
            } else {
              textArea.value = textArea.value + letter;
            }
          });
        }

        line.appendChild(letterToAdd);
      });
    }
  });

  keyboardClick();
  function keyboardClick() {
    document.addEventListener("keydown", (letter) => {
      console.log(letter.key);
      let key = letter.key;
      if (!lettersOnly()) {
        return;
      }

      const textArea = document.querySelector("#input");
      if (key === "Backspace") {
        const str = textArea.value;
        textArea.value = str.slice(0, -1);
      } else if (key === "Enter") {
        alert("no function yet");
      } else {
        textArea.value = textArea.value + key;
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
