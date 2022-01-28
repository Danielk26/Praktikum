// Ensure the DOM is loaded before attempting to mutate or add elements.
window.onload = function () {

    // Use a multidemnsional array to represent the x and y respectively
    // where the value is a boolean to represent whether the light is on
    let boardContainer = [];

    let xlength;
    let ylength;

    let attemptsCounter = 0;
    let boardCompleted = false;

    let boardDiv = document.getElementById("board");
    let restartButton = document.getElementById("restart");
    let newBoardButton = document.getElementById("newboard");
    let createGameForm = document.forms["createGameForm"];
    let attemptsPara = document.getElementById("attempts");

    // Initally hide game option functionality
    restartButton.style.display = 'none';
    newBoardButton.style.display = 'none';

    // Once DOM items are loaded attach the event handlers
    createGameForm.onsubmit = e => newGame(e);
    restartButton.onclick = e => restartGame(e);
    newBoardButton.onclick = e => showGameForm(e);



    /* --- Display functions --- */

    // Current issues here are the display functions are interacting with global variables which would ideally be
    // managed by some global state using Redux or a similar approach instead of global variables.

    function newGame(e) {
        e.preventDefault();

        // Update x and y lengths
        xlength = createGameForm["width"].value;
        ylength = createGameForm["height"].value;




        createGame();

        createGameForm.style.display = 'none';
        restartButton.style.display = 'inline';
        newBoardButton.style.display = 'inline';
        attemptsPara.style.display = 'block';
    }

    function showGameForm(e) {
        e.preventDefault();

        while (boardDiv.hasChildNodes()) {
            boardDiv.removeChild(boardDiv.lastChild);
        }

        createGameForm.style.display = 'inline';
        attemptsPara.style.display = 'none';
        restartButton.style.display = 'none';
        newBoardButton.style.display = 'none';
    }

    function restartGame(e) {
        e.preventDefault();

        createGame();
    }

    function createGame() {

        // Update board container
        boardContainer = createBoard(xlength, ylength);

        // Reset counter
        attemptsCounter = 0;
        attemptsPara.innerHTML = `Versuche: ${attemptsCounter}`;

        // Reset board completed
        boardCompleted = false;

        // Finally display the board
        displayBoard(boardContainer);


    }

    function userClick(x, y) {

        if (!boardCompleted) {

            // Update attempts counter information
            attemptsCounter++;
            attemptsPara.innerHTML = `Versuche: ${attemptsCounter}`;

            updateBoard(boardContainer, x, y);

            if (checkBoardCompleted(boardContainer)) {

                boardCompleted = true;
                let attemptText = attemptsCounter === 1 ? 'Versuche' : 'Versuche';
                attemptsPara.innerHTML = `Geschafft! Du hast ${attemptsCounter} ${attemptText} gebracuht. Versuche es doch gleich noch nal mit einem anderen Spielfeld`;
            }

            displayBoard(boardContainer);
        }
    }

    function displayBoard(board) {

        while (boardDiv.hasChildNodes()) {
            boardDiv.removeChild(boardDiv.lastChild);
        }

        for (i=0; i<ylength; i++) {

            let row = document.createElement('div');
            row.className = 'row';

            for (j=0; j<xlength; j++) {

                let boardItem = document.createElement('div');
                boardItem.className = board[i][j] ? 'boardItemLightOn' : 'boardItemLightOff';
                boardItem.onclick = userClick.bind(undefined, i, j);
                row.appendChild(boardItem);
            }

            boardDiv.appendChild(row);
        }
    }



    /* --- Application logic functions --- */

    function createBoard(x, y) {

        let newBoard = [];

        // Ensure that at least one random light gets turned on
        let atLeastOneLightOn = false;

        for (j=0; j<y; j++) {

            let xRow = [];

            for (i=0; i<x; i++) {

                let lightOn = Math.round(Math.random()) === 1 ? true : false;

                if (!atLeastOneLightOn && lightOn) {
                    atLeastOneLightOn = true;
                }

                xRow.push(lightOn);
            }

            newBoard.push(xRow);
        }

        // If no lights on - let's try again with that random generator!
        if (!atLeastOneLightOn) {
            createBoard(x, y)
        } else {
            return newBoard;
        }
    }

    function updateBoard(board, x, y) {

        board[x][y] = !board[x][y];

        // Update surrounding lights if they exist
        if (x > 0)                  { board[x-1][y] = !board[x-1][y]; }
        if (x < board.length-1)     { board[x+1][y] = !board[x+1][y]; }
        if (y > 0)                  { board[x][y-1] = !board[x][y-1]; }
        if (y < board[0].length-1)  { board[x][y+1] = !board[x][y+1]; }
    }

    function checkBoardCompleted(board) {

        for (i=0; i<board.length; i++) {
            for (j=0; j<board[0].length; j++) {
                if (board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }


    function changeBackground() {
        var color = document.getElementById("color").value; // cached

        // The working function for changing background color.
        document.bgColor = color;

        // The code I'd like to use for changing the text simultaneously - however it does not work.
        document.getElementById("coltext").style.color = color;
    }

    document.getElementById("submitColor").addEventListener("click", changeBackground, false);







}