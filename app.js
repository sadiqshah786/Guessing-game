
const btn = document.querySelector('.btn');
const inputs = document.querySelector('.input-wrapper');
const hint = document.querySelector('.hint span');
const wrong = document.querySelector('.wrong span');
const guess = document.querySelector('.guess span');

const typeInput = document.querySelector('.inputValue');
let WordCount, noOfGuess, inCorrects = [], corrects = [];
const randomWordsGenerator = () => {
    let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    WordCount = randomWord.word;
    noOfGuess = 5;
    let HoldValues = '';
    for (i = 0; i < WordCount.length; i++) {
        HoldValues += `<input type="text" disabled>`
    }
    inputs.innerHTML = HoldValues;

    hint.innerHTML = randomWord.hint;
    guess.innerHTML = `0${noOfGuess}`
    wrong.innerHTML = 'Wrong Guesses Will show';
    inCorrects.length = 0;
}
randomWordsGenerator();

let OnlyAlphabtes = /^[A-Za-z]+$/;
const InitGame = (e) => {
    let eventInput = e.target.value;
    if (eventInput.match(OnlyAlphabtes) && !inCorrects.includes(`${eventInput}`)) {
        if (WordCount.includes(eventInput)) {
            for (i = 0; i < WordCount.length; i++) {
                if (WordCount[i] === eventInput) {
                    corrects.push(eventInput);
                    inputs.querySelectorAll('input')[i].value = eventInput;
                }
            }
        }
        else {
            noOfGuess--;
            inCorrects.push(`${eventInput}`)

        }
        guess.innerHTML = `0${noOfGuess}`
        wrong.innerHTML = inCorrects;
    }

    typeInput.value = "";

    if (corrects.length == WordCount.length) {
        swal({
            title: "You Won the Game!",
            icon: "success",
            button: "Play Again",
        });
                

    }
    else if (noOfGuess < 1) {
        guess.innerHTML = `${noOfGuess}`
        swal({
            title: "You Lost the Game!",
            icon: "error",
            button: "Play Again",
        });
        for (i = 0; i < WordCount.length; i++) {
            inputs.querySelectorAll('input')[i].value = WordCount[i];
            wrong.innerHTML = 'Wrong Guesses Will show';
        }

    }
}

btn.addEventListener("click", randomWordsGenerator);
typeInput.addEventListener("input", InitGame)
document.addEventListener("keydown", () => {
    typeInput.focus();
});
