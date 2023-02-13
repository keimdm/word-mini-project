//DEPENDENCIES:
var startButton = document.getElementById("start-button");

var wordSpace = document.getElementById("word-space");

var winScore = document.getElementById("win-score");
var loseScore = document.getElementById("lose-score");
var resetButton = document.getElementById("reset");
var timer = document.getElementById("timer");

//STATE VARIABLES
var words = ["cantaloupe", "banana", "papaya", "coconut", "strawberry", "pineapple"];
var currentTime = 0;
var interval;
var currentWord = "";
var currentWordArray = [];

//FUNCTIONS:
function updateRecord() {
    winScore.textContent = "Wins: " + (localStorage.getItem("wins") || 0);
    loseScore.textContent = "Losses: " + (localStorage.getItem("losses") || 0);
}

function startGame() {
    currentTime = 10;
    updateTimer(currentTime);
    wordRand = Math.floor(Math.random() * words.length);
    currentWord = words[wordRand];
    currentWordArray = currentWord.split("");
    clearChildren(wordSpace);
    for (i = 0; i < currentWordArray.length; i++) {
        var newWordSpace = document.createElement("li");
        newWordSpace.textContent = "_ ";
        newWordSpace.id = "word-space-" + i
        wordSpace.appendChild(newWordSpace);
    }
    interval = setInterval(gameLoop, 1000);
    console.log("start");
}

function clearChildren(x) {
    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }
}

function updateTimer(x) {
    timer.textContent = "Time Remaining: " + x;
}

function gameLoop() {
    console.log("loop");
    currentTime = currentTime - 1;
    updateTimer(currentTime);
    if (currentTime <= 0) {
        endGame("lose");
    }
}

function endGame(x) {
    console.log("end");
    currentTime = 0;
    updateTimer(currentTime);
    clearInterval(interval);
    clearChildren(wordSpace);
    var endMessage = document.createElement("li");
    if (x === "win") {
        endMessage.textContent = "You Win";
        var tempWins = localStorage.getItem("wins") || 0;
        localStorage.setItem("wins", Number(tempWins) + 1);
    }
    else {
        endMessage.textContent = "You Lose";
        var tempLosses = localStorage.getItem("losses") || 0;
        localStorage.setItem("losses", Number(tempLosses) + 1);
    }
    updateRecord();
    wordSpace.appendChild(endMessage);
}

function resetScore() {
    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
    updateRecord();
}

function checkWord() {
    var good = true;
    for (i = 0; i < currentWordArray.length; i++) {
        var currentChild = document.getElementById("word-space-" + i);
        if (currentChild.textContent === "_ ") {
            good = false
        }
    }
    return good;
}

function checkKey(event) {
    console.log("key pressed");
    var letterInput = event.key;
    for (i = 0; i < currentWordArray.length; i++) {
        if (letterInput === currentWordArray[i]) {
            var currentChild = document.getElementById("word-space-" + i);
            currentChild.textContent = letterInput + " ";
        }
    }
    if (checkWord()) {
        endGame("win");
    }
}

//USER INTERACTIONS:
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);
document.addEventListener("keydown", checkKey);

updateRecord();
updateTimer(currentTime);