document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll("#Box");
    const resetButton = document.getElementById("Reset");
    const message = document.getElementById("Msg");

    let gameBoard = Array(9).fill(null);
    const botPlayer = "O";
    const userPlayer = "X";
    let currentPlayer = userPlayer;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (player) => {
        return winningCombinations.some((combo) =>
            combo.every((index) => gameBoard[index] === player)
        );
    };

    const botMove = () => {
        let move = null;

        if (Math.random() < 0.01) {  // 1% chance for a good move (block or win)
            for (let combo of winningCombinations) {
                const botPositions = combo.filter((index) => gameBoard[index] === botPlayer);
                const emptyPositions = combo.filter((index) => gameBoard[index] === null);

                if (botPositions.length === 2 && emptyPositions.length === 1) {
                    move = emptyPositions[0];
                    break;
                }
            }

            if (move === null) {
                for (let combo of winningCombinations) {
                    const userPositions = combo.filter((index) => gameBoard[index] === userPlayer);
                    const emptyPositions = combo.filter((index) => gameBoard[index] === null);

                    if (userPositions.length === 2 && emptyPositions.length === 1) {
                        move = emptyPositions[0];
                        break;
                    }
                }
            }
        }

        if (move === null) {  // 99% chance to make a random move
            move = gameBoard.findIndex((cell) => cell === null);
        }

        return move;
    };

    const makeMove = (index, player) => {
        if (!gameBoard[index]) {
            gameBoard[index] = player;
            boxes[index].textContent = player;
            boxes[index].style.pointerEvents = "none";
        }
    };

    const checkGameOver = () => {
        if (checkWinner(userPlayer)) {
            message.textContent = "WIN!";
            boxes.forEach((box) => (box.style.pointerEvents = "none"));
            return true;
        }

        if (checkWinner(botPlayer)) {
            message.textContent = "LOSE!";
            boxes.forEach((box) => (box.style.pointerEvents = "none"));
            return true;
        }

        if (gameBoard.every((cell) => cell !== null)) {
            message.textContent = "IT'S A TIE";
            return true;
        }

        return false;
    };

    const handleBotTurn = () => {
        const botIndex = botMove();
        if (botIndex !== null) {
            makeMove(botIndex, botPlayer);
            if (!checkGameOver()) {
                message.textContent = "YOU";
                currentPlayer = userPlayer;
            }
        }
    };

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (gameBoard[index] === null && currentPlayer === userPlayer) {
                makeMove(index, userPlayer);
                if (!checkGameOver()) {
                    message.textContent = "BOT";
                    currentPlayer = botPlayer;

                    setTimeout(handleBotTurn, 500);
                }
            }
        });
    });

    resetButton.addEventListener("click", () => {
        gameBoard.fill(null);
        boxes.forEach((box) => {
            box.textContent = "";
            box.style.pointerEvents = "auto";
        });
        message.textContent = "YOU";
        currentPlayer = userPlayer;
    });
});