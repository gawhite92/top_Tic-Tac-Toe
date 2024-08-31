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

    return {
        resetBoard,
        setCell,
        getBoard
    };
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

    const board = GameBoard(); // Initialises the gameboard. Allows this to access the returned 'board' objects.

    let activePlayer = players[0];

    console.log('GameController / GameBoard initialised.')

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

        } else if (printBoardValuesString().includes('0') == false) {
            console.log("It's a draw!");
            newRound();
        }
    }

    let winningPlayer = ''

    const getWinningPlayer = () => winningPlayer;

    const getScores = () => {
        return [players[0].score, players[1].score]
    }

    const getPlayerNames = () => {
        return [players[0].name, players[1].name]
    }

    const resetScores = () => { //
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
        console.log(`It is now ${activePlayer.name}'s turn!`);
    }

    const newGame = () => {
        console.log('The game has been restarted.')
        board.resetBoard();
        resetScores();
        console.log('Scores have been reset.')
        getScores();
        switchActivePlayer();
        console.log(`It is now ${activePlayer.name}'s turn!`);
    }

    let gameEndStatus = false;

    const playTurn = (cell) => {
        if (board.getBoard()[cell] != 0) {
            console.log(`Chosen number = ${cell}. Existing cell value = ${board.getBoard()[cell]}. This does not = 0.`)
            console.log('ERROR - This cell is already taken! Choose another.');
            return
        }
        board.setCell(cell, activePlayer.token);
        console.log(`${activePlayer.name} chose cell ${Number(cell)+1}!`);
        checkForWin();
        switchActivePlayer();
        if (gameEndStatus == true) {
            newRound();
        }
    };

    const getGameEndStatus = () => gameEndStatus;

    return {
        getActivePlayer,
        playTurn,
        newGame,
        getScores,
        getPlayerNames,
        printBoardValuesString,
        getGameEndStatus,
        getWinningPlayer
    };

};

(function ScreenController() {
    console.log('Screen controller initialised.')

    let game = ''

    const
        player1Input = document.getElementById('player1input'),
        player2Input = document.getElementById('player2input'),
        resetButton = document.getElementById("gamerestart-btn"),
        startButton = document.getElementById("gamestart-btn"),
        announcement = document.getElementById("announcement"),
        scorePlayer1 = document.getElementById("scoreplayer1"),
        scorePlayer2 = document.getElementById("scoreplayer2"),
        cells = document.querySelectorAll(".cell");

    startButton.addEventListener("click", () => {
        player1Input.value == '' ? player1Name = undefined : player1Name = player1Input.value;
        player2Input.value == '' ? player2Name = undefined : player2Name = player2Input.value;
   
        game = GameController(player1Name, player2Name)

        announcement.textContent = `It is ${game.getActivePlayer().name}'s turn!`;
    });

    resetButton.addEventListener("click", () => {
        announcement.textContent = `Resetting game...`;

        setTimeout(function () {
            game.newGame();
            updateScreen();
            announcement.textContent = `It is ${game.getActivePlayer().name}'s turn!`;
        }, 1000);

    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (cell.textContent != '') {
                announcement.textContent = `ERROR. Choose another cell!`;
                return
            }

            //Doesn't allow gameplay until user names are entered. Flashes prompt.
            if (game == '') {
                blinkElement(announcement, 200, 1500)
                return
            }

            game.playTurn((cell.id).slice(4));
            updateScreen();
        });
    });

    const updateScreen = () => {
        cells.forEach((cell) => {
            cell.textContent = game.printBoardValuesString()[(cell.id).slice(4)];
            if (cell.textContent == 1) {
                cell.textContent = 'X'
            } else if (cell.textContent == 2) {
                cell.textContent = 'O';
            } else {
                cell.textContent = '';
            }
        });
        scorePlayer1.textContent = game.getScores()[0];
        scorePlayer2.textContent = game.getScores()[1];

        console.log(`${game.getActivePlayer().name}'s turn!`)

        announcement.textContent = `It is ${game.getActivePlayer().name}'s turn!`
        
        if (game.getGameEndStatus() == true) {
            console.log('Round has ended');
            announcement.textContent = `${game.getWinningPlayer().name}`;

            setTimeout(function () {
                announcement.textContent = `It is ${game.getActivePlayer().name}'s turn!`;
            }, 2000);
        }
    };

    function blinkElement(elm, interval, duration) {

        elm.style.visibility = (elm.style.visibility === "hidden" ? "visible" : "hidden");

        if (duration > 0) {
            setTimeout(blinkElement, interval, elm, interval, duration - interval);
        } else {
            elm.style.visibility = "visible";
        }
    }
})();