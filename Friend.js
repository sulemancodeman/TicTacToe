let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boxes = document.querySelectorAll('#Box');
const message = document.getElementById('Msg');
const resetButton = document.getElementById('Reset');

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Tie';
    }

    return null;
}

function handleBoxClick(index) {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        if (winner === 'Tie') {
            message.textContent = 'ITS TIE!';
        } else {
            message.textContent = `${winner} WINS!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer} TURN'S`;
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `${currentPlayer} TURN'S`;

    boxes.forEach(box => {
        box.textContent = '';
    });
}

resetButton.addEventListener('click', resetGame);