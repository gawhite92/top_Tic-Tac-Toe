function GameBoard() {

    const board = [
        [0], [0], [0],
        [0], [0], [0],
        [0], [0], [0]
    ];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = [0];
        }
    };

    const setCell = (cell, value) => {
        board[cell] = [value];
    };

    const getCell = (cell) => board[cell];

    const getBoard = () => board;

    return { resetBoard, setCell, getCell, getBoard };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GameController(
    playerOneName = 'Player 1', // Game to be initialised with the customised player names entered via input forms. These are the default names.
    playerTwoName = 'Player 2'
) {
    const players = [
        {
            name: playerOneName,
            token: 1,
            score: 0
        },
        {
            name: playerTwoName,
            token: 2,
            score: 0
        }
    ]

    const board = GameBoard(); // Initialises the gameboard. Allows this factory to access the returned 'board' objects.

    let activePlayer = players[0];

    console.log('GameController Initialised. Players set, activeplayer set, board initialised.')

    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const incrementScore = () => {
        winningPlayer().score++;
        return winningPlayer.score;
    }

    const checkForWin = () => {

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];

        ///////////////
        for (let i = 0; i < 5; i++) { //TESTING ONLY TO GIVE REAL NUMBERS
            playTurn()
        }
        ///////////////

        console.log(printBoardValuesString());

        for (i = 0; i < winningCombinations.length; i++) { //Loops to check all 8 combinations
            let trioValue = '';

            for (j = 0; j < winningCombinations[i].length; j++) { //Loops for each digit in the triplet grouping
                trioValue += printBoardValuesString()[winningCombinations[i][j]]; //Assigns each digit to a variable
            }
            console.log(trioValue);
            if (trioValue == 111) {
                console.log(`${playerOneName} wins!`);
                winningPlayer = players[0];
                incrementScore();
            } else if (trioValue == 222) {
                console.log(`${playerTwoName} wins!`);
                winningPlayer = players[1];
                incrementScore();
            }
        }

        if (printBoardValuesString().includes('0')) {
            console.log('No wins, game continues!');
        } else {
            console.log("It's a draw!");
            //newRound();
        }
    }

    const winningPlayer = () => activePlayer;


    const getScores = () => {
        console.log(`${playerOneName}'s score: ${players[0].score}`);
        console.log(`${playerTwoName}'s score: ${players[1].score}`);
    }

    const resetScores = () => { // Reset points completely on 'Restart' button.
        players[0].score = 0;
        players[1].score = 0;
    }

    const printBoardValuesString = () => {
        let boardValues = '';
        for (let i = 0; i < board.getBoard().length; i++) {
            boardValues += board.getBoard()[i];
        }
        return boardValues;
    }

    const newRound = () => board.resetBoard();

    const playTurn = (cell) => {
        const randomNumberGenerator = () => Math.floor(Math.random() * 9); //TESTING RANDOM NUMBER GENERATOR
        let randomNumber = randomNumberGenerator(); //REMEMBER TO CHANGE ALL BELOW RANDOM NUMBER BACK TO CELL ONCE WORKING

        if (board.getBoard()[randomNumber] != 0) {
            console.log(`Chosen number = ${randomNumber}. Existing cell value = ${board.getBoard()[randomNumber]}. This does not = 0.`)
            console.log('ERROR - This cell is already taken! Choose another.');
            printBoardValuesString();
            return
        }
        board.setCell(randomNumber, activePlayer.token);
        console.log(`CONTROLLER - ${activePlayer.name} chose cell ${randomNumber}!`);
        printBoardValuesString();
        switchActivePlayer();
        console.log(`CONTROLLER - It is now ${activePlayer.name}'s turn!`);
    };

    return { getActivePlayer, switchActivePlayer, newRound, printBoardValuesString, incrementScore, getScores, resetScores, playTurn, checkForWin };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GLOBAL

const game = GameController();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TESTING

const TESTING = () => {
    for (let i = 0; i < 6; i++) {
        console.log(`*****Turn ${i + 1}*****`);
        game.playTurn();
        game.incrementScore();
        game.getScores();
        //game.checkForWin();
    }
}