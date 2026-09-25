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
    }

    const displayBoard = () => {
        let display = board.map((x) => x.join(" | ")).join("\n---------\n");
        console.log(display);
    }

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
    alert("Welcome to Tic-Tac-Toe!");

    let playerName = prompt("Name of player (X) ?");
    const player1 = createPlayer(playerName);

    playerName = prompt("Name of player (O) ?");
    const player2 = createPlayer(playerName);

    const players = [player1, player2];

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

    const playTurn = (rowNo, columnNo) => {
        if (gameBoard.insertMark(rowNo, columnNo, getActivePlayer().playerMark)) {
            switchPlayerTurn();
            displayNewTurn();
        } else {
            displayNewTurn();
        };
    };

    displayNewTurn();

    return {playTurn, getActivePlayer};
})();