// gameBoard IIFE

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const container = document.querySelector(".container");

    const createNewBoard = () => {
        board = [];
        for (let i = 0; i < rows; i++) {
            board[i] = Array(columns).fill("");
        };
        container.innerHTML = "";
        createSquares();
    };

    const createSquares = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.column = j;
                container.appendChild(square);
            };
        };
    };

    createNewBoard();

    const getBoard = () => board;

    const insertMark = (rowNo, columnNo, playerMark) => {
        if (!(board[rowNo][columnNo] === "")) {
            console.log("Error: Space already marked!");
            return false;
        };

        board[rowNo][columnNo] = playerMark.toString();

        const square = document.querySelector(`.square[data-row="${rowNo}"][data-column="${columnNo}"]`);

        if (square) {
            square.textContent = playerMark;
        }

        return true;
    };

    const displayBoard = () => {
        let display = board.map((x) => x.join(" | ")).join("\n---------\n");
        console.log(display);
    };

    return {createNewBoard, getBoard, insertMark, displayBoard};
})();

// createPlayer factory function

function createPlayer(playerName, playerMark) {
    return {playerName, playerMark};
}

// gameBrain IIFE

const gameBrain = (function () {
    const gameInfo = document.querySelector(".game-info");
    const restartBtn = document.querySelector(".restart-button");
    const dialog = document.querySelector(".newGameDialog");
    const okBtn = document.querySelector(".newGameBtn");

    let players = [];
    let activePlayer = null;
    let isGameActive = false;

    const gameStart = function () {
        players = [];
        activePlayer = null;
        isGameActive = false;
        gameInfo.textContent = "";

        let boardEmpty = (x) => x === "";
        if (!(gameBoard.getBoard().every(boardEmpty))) {
            gameBoard.createNewBoard();
        };

        dialog.showModal();
    };

    okBtn.addEventListener("click", () => {
        const player1 = document.getElementById("player1").value || "Player 1";
        const player2 = document.getElementById("player2").value || "Player 2";

        players = [createPlayer(player1, "X"), createPlayer(player2, "O")];
        activePlayer = players[0];
        isGameActive = true;

        displayNewTurn();
        dialog.close();
        document.querySelector(".newGameForm").reset();
    });

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
    };

    const getActivePlayer = () => activePlayer;

    gameStart();

    const displayNewTurn = () => {
        if (activePlayer) {
            gameInfo.textContent = `${activePlayer.playerName}'s turn (${activePlayer.playerMark})`;
        };
    };

    const checkWinner = function () {
        const board = gameBoard.getBoard();

        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            };
        };

        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            };
        };

        if (board[1][1] !== "") {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                return board[0][0];
            };
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                return board[0][2];
            };
        };

        const squaresRemaining = board.some(row => row.includes(""));

        if (!squaresRemaining) {
            return "draw";
        };

        return null;
    };

    const gameOver = function (player) {
        gameInfo.textContent = `${player.playerName} wins!`;
    };

    const playTurn = (rowNo, columnNo) => {
        if (!isGameActive) return;

        if (gameBoard.insertMark(rowNo, columnNo, getActivePlayer().playerMark)) {

            let winner = checkWinner();

            if (winner === "X") {
                isGameActive = false;
                gameOver(players[0]);
                return;
            } else if (winner === "O") {
                isGameActive = false;
                gameOver(players[1]);
                return;
            } else if (winner === "draw") {
                isGameActive = false;
                gameInfo.textContent = `The game is a draw!`;
                return;
            };

            switchPlayerTurn();
            displayNewTurn();
        };
    };

    document.querySelector(".container").addEventListener("click", (e) => {
        const target = e.target.closest(".square");

        if (!target) return;

        const row = target.dataset.row;
        const column = target.dataset.column;

        playTurn(row, column);
    });

    const restartGame = (function () {
        restartBtn.addEventListener("click", (e) => {
            gameStart();
        });
    })();

    return {playTurn};
})();