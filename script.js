let currentNumber = 1; // Start at 1
let gridSize = 4; // 4x4 grid
let totalNumbers = gridSize * gridSize; // Total cells (16 for a 4x4 grid)
let numbers = []; 
let gridElement = document.getElementById("grid");
let messageElement = document.getElementById("message");
let gamesCompleted = 0; 

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
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function handleCellClick(cell, number) {
    if (number === currentNumber) {
        cell.classList.add('visited');
        cell.classList.add('correct');
        currentNumber++;

        if (currentNumber > totalNumbers) {
            gamesCompleted++;
            if (gamesCompleted < 5) {
                messageElement.textContent = `Congratulations! You've completed game ${gamesCompleted}! New Challenge Coming Up!`;
                setTimeout(() => {
                    currentNumber = 1;
                    resetGame(); 
                }, 2000);
            } else {
                messageElement.textContent = "That’s enough for today, go touch grass. Bye!";
                setTimeout(() => {
                    gridElement.innerHTML = ''; // 
                }, 2000); // 
            }
        } else {
            messageElement.textContent = `Correct! Now, find ${currentNumber}`;
        }
    } else {
        cell.classList.add('wrong');
        messageElement.textContent = `Oops! Wrong number. Try again!`;
    }
}

function resetGame() {
    generateGrid();
}

generateGrid();
