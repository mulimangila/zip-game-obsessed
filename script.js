let currentNumber = 1; 
let gridSize = 6; 
let totalNumbers = gridSize * gridSize; 
let numbers = []; 
let gridElement = document.getElementById("grid");
let messageElement = document.getElementById("message");
let timerElement = document.getElementById("timerValue");
let timer = 60; 
let timerInterval;
let timerRunning = false;
let gameOver = false;
let gamesPlayed = 0; 
let lastGameTime = 0; 

function loadGameData() {
    gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) || 0;
    lastGameTime = parseInt(localStorage.getItem('lastGameTime')) || 0;
}

function canStartNewGame() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastGameTime;
    const oneHour = 60 * 60 * 1000;
   
    if (timeElapsed < oneHour && gamesPlayed >= 5) {
        messageElement.textContent = "You can only play 5 games in an hour. Please try again later.";
        return false;
    }
    return true;
}

function updateGameData() {
    localStorage.setItem('gamesPlayed', gamesPlayed);
    localStorage.setItem('lastGameTime', Date.now());
}

function generateGrid() {
    gridElement.innerHTML = ''; 
    numbers = [];

    for (let i = 1; i <= totalNumbers; i++) {
        numbers.push(i);
    }

    numbers = shuffleArray(numbers);

    for (let i = 0; i < totalNumbers; i++) {
        let cell = document.createElement('div');
        cell.textContent = numbers[i];
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, numbers[i]));
        gridElement.appendChild(cell);
    }

    startTimer();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCellClick(cell, number) {
    if (gameOver) return; 

    if (number === currentNumber) {
        cell.classList.add('visited');
        cell.classList.add('correct');
        currentNumber++;

        if (currentNumber > totalNumbers) {
            clearInterval(timerInterval);
            messageElement.textContent = "Congratulations! You've completed the game!";
            gamesPlayed++;
            updateGameData();
            showNewGameButton();
        } else {
            messageElement.textContent = `Correct! Now, find ${currentNumber}`;
        }
    } else {
        cell.classList.add('wrong');
        messageElement.textContent = `Oops! Wrong number. Try again!`;
    }
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(function () {
            if (timer > 0) {
                timer--;
                timerElement.textContent = timer;
            } else {
                clearInterval(timerInterval);
                messageElement.textContent = "Game Over! Try again!";
                gameOver = true; // Disable the grid after time runs out
                disableGrid();
                showNewGameButton();
            }
        }, 1000);
    }
}

function disableGrid() {
    const cells = gridElement.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick); // Disable further clicks
    });
}

function showNewGameButton() {
    document.getElementById("newGameButton").style.display = "inline-block";
}

function startNewGame() {
    if (!canStartNewGame()) return;

    gameOver = false;
    currentNumber = 1;
    timer = 60;
    timerElement.textContent = timer;
    messageElement.textContent = `Start with 1!`;
    document.getElementById("newGameButton").style.display = "none";
    generateGrid();
}

function resetGame() {
    gameOver = false;
    currentNumber = 1;
    timer = 60;
    timerElement.textContent = timer;
    messageElement.textContent = `Start with 1!`;
    document.getElementById("newGameButton").style.display = "none";
    generateGrid();
}

loadGameData();
generateGrid();
