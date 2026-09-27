// gameBoard IIFE

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const createNewBoard = () => {
        board = [];
        for (i = 0; i < rows; i++) {
            board[i] = Array(columns).fill("-");
        };
    };

    createNewBoard();

    const getBoard = () => board;

    const insertMark = (rowNo, columnNo, playerMark) => {
        if (!(board[rowNo][columnNo] === "-")) {
            console.log("Error: Space already marked!");
            return false;
        };

        board[rowNo][columnNo] = playerMark.toString();
        return true;
    };

    const displayBoard = () => {
        let display = board.map((x) => x.join(" | ")).join("\n---------\n");
        console.log(display);
    };

    return {createNewBoard, getBoard, insertMark, displayBoard};
})();

// Player ID incrementor

function incrementId() {
    let id = 0;

    return function increment () {
        id++;
        return id;
    };
};

const newId = incrementId();

// createPlayer factory function

function createPlayer(playerName) {
    const playerId = newId();

    if (playerId === 1) {
        playerMark = "X";
    } else {
        playerMark = "O";
    }
    
    return {playerId, playerName, playerMark};
}

// gameBrain IIFE

const gameBrain = (function () {
    const gameStart = function () {
        let boardEmpty = (x) => x === "-";
        if (!(gameBoard.getBoard().every(boardEmpty))) {
            gameBoard.createNewBoard();
        };

        alert("Welcome to Tic-Tac-Toe!");

        let playerName = prompt("Name of player (X) ?");
        const player1 = createPlayer(playerName);

        playerName = prompt("Name of player (O) ?");
        const player2 = createPlayer(playerName);

        return [player1, player2];
    };

    let players = gameStart();
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
    };

    const getActivePlayer = () => activePlayer;

    const displayNewTurn = () => {
        gameBoard.displayBoard();
        console.log(`It's ${getActivePlayer().playerName}'s turn!`);
    };

    const checkWinner = function () {
        board = gameBoard.getBoard();

        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== "-" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            };
        };

        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== "-" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            };
        };

        if (board[1][1] !== "-") {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                return board[0][0];
            };
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                return board[0][2];
            };
        };

        const squaresRemaining = board.some(row => row.includes("-"));

        if (!squaresRemaining) {
            return "draw";
        };

        return null;
    };

    const gameOver = function (player) {
        alert(`${player.playerName} wins!`);
        console.log(`${player.playerName} wins!`);
        
        const playAgain = confirm("Start new game?");

        if (playAgain) {
            players = gameStart();
            activePlayer = players[0];
        };
    };

    const playTurn = (rowNo, columnNo) => {
        if (gameBoard.insertMark(rowNo, columnNo, getActivePlayer().playerMark)) {

            winner = checkWinner();

            if (winner === "X") {
                gameOver(players[0]);
                return;
            } else if (winner === "O") {
                gameOver(players[1]);
                return;
            } else if (winner === "Draw") {
                alert("The game is a draw!");
                console.log("The game is a draw!");
                const playAgain = confirm("Start new game?");

                if (playAgain) {
                    players = gameStart();
                    activePlayer = players[0];
                };
            };

            switchPlayerTurn();
            displayNewTurn();
        } else {
            displayNewTurn();
        };
    };

    displayNewTurn();

    return {playTurn};
})();