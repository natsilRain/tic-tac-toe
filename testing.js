// gameBoard IIFE

const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const createNewBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = Array(columns).fill(" ");
        };
    };

    createNewBoard();

    const getBoard = () => board;

    const insertMark = (row, column, player) => {

    }
})();