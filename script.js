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

    const getBoard = () => board;

    return { resetBoard, setCell, getBoard };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GameController(
    playerOneName = 'Player 1', // Game should be initialised with customised player names entered via input forms. Something like; Onclick = GameController(name1, name2). Otherwise, these are the default names.
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
        winningPlayer.score++;
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

        console.log(printBoardValuesString());

        for (let i = 0; i < winningCombinations.length; i++) { //Loops through all winning combinations (8 of)
            let trioValue = '';

            for (let j = 0; j < winningCombinations[i].length; j++) { //Loops for each digit per combination (3 of)
                trioValue += printBoardValuesString()[winningCombinations[i][j]]; //Checks current game board locations against possible win combinations. Assigns each gameboard combination to a string.
            }
            
            //console.log(trioValue); //Logs the current string FOR TESTING
            
            if (trioValue == 111) { //Checks each individual string (8 of) against the board wins by player1/2. Assigns winning player and increments their score.
                gameEndStatus = true;
                console.log(`${playerOneName} wins!`);
                winningPlayer = players[0];
                incrementScore();
            } else if (trioValue == 222) {
                gameEndStatus = true;
                console.log(`${playerTwoName} wins!`);
                winningPlayer = players[1];
                incrementScore();
            } 
        }


        // If both above checks against individual strings comes back negative, this checks to see if the board still has available space.
        if (gameEndStatus == false && printBoardValuesString().includes('0')) {
            console.log('No wins, game continues!');
        } else if (printBoardValuesString().includes('0') == false) {
            console.log("It's a draw!");
            newRound();
        }
    }

    let winningPlayer = ''

    const getScores = () => {
        console.log(`${playerOneName}'s score: ${players[0].score}`);
        console.log(`${playerTwoName}'s score: ${players[1].score}`);
        return [players[0].score, players[1].score]
    }

    const getPlayerNames = () => {
        return [players[0].name, players[1].name]
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

    const newRound = () => {
        gameEndStatus = false;
        getScores();
        console.log('New round!')
        board.resetBoard();
        switchActivePlayer();
        console.log(`CONTROLLER - It is now ${activePlayer.name}'s turn!`);
    }

    const newGame = () => {
        console.log('The game has been restarted.')
        board.resetBoard();
        resetScores();
        console.log('Scores have been reset.')
        getScores();
        switchActivePlayer();
        console.log(`CONTROLLER - It is now ${activePlayer.name}'s turn!`);
    }

    let gameEndStatus = false;

    const playTurn = (cell) => {
        const randomNumberGenerator = () => Math.floor(Math.random() * 9); //TESTING RANDOM NUMBER GENERATOR
        let randomNumber = randomNumberGenerator(); //REMEMBER TO CHANGE ALL BELOW RANDOM NUMBER BACK TO CELL ONCE WORKING

        if (board.getBoard()[randomNumber] != 0) {
            console.log(`Chosen number = ${randomNumber}. Existing cell value = ${board.getBoard()[randomNumber]}. This does not = 0.`)
            console.log('ERROR - This cell is already taken! Choose another.');
            return
        }
        board.setCell(randomNumber, activePlayer.token);
        console.log(`CONTROLLER - ${activePlayer.name} chose cell ${randomNumber}!`);
        checkForWin();
        if (gameEndStatus == true){
            newRound();
        }
    };

    return { getActivePlayer, playTurn, newGame, getScores, getPlayerNames };

    //TESTING
    // return { getActivePlayer, switchActivePlayer, newRound, printBoardValuesString, incrementScore, getScores, resetScores, playTurn, checkForWin, gameEndStatus, newGame };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GLOBAL

const game = GameController();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TESTING

const TESTING = () => {
    for (let i = 0; i < 20; i++) {
        console.log(`*****Turn ${i + 1}*****`);
        game.playTurn();
    }
}