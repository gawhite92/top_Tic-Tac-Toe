function Gameboard() {
    board = [];
    columns = 3;
    rows = 3;

    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    //const chooseSpot = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() ===0)
        console.log(availableCells);
        return {availableCells}
    //}

    console.log(board)
    
    return { getBoard, dropToken, /*printBoard*/ }
}

function Cell() {
    let value = 0;
    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(
    activePlayer
) { }

Gameboard();
