// gameBoard IIFE

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const createNewBoard = () => {
        board = [];
        for (i = 0; i < rows; i++) {
            board[i] = Array(columns).fill("x");
        };
    };

    createNewBoard();

    const getBoard = () => board;

    const insertMark = (rowNo, columnNo, playerMark) => {
        if (board[rowNo][columnNo] === " ") {
            return "Error: Space already marked!"
        };
        
        board[rowNo][columnNo] = playerMark.toString();
    }

    const displayBoard = () => {
        let display = board.map((x) => x.join(" | ")).join("\n---------\n");
        console.log(display);
    }

    return {createNewBoard, getBoard, insertMark, displayBoard};
})();

gameBoard.displayBoard();