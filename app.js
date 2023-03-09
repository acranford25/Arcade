let ticTacToe = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    
    playerOne: {
        name: undefined,
        score: 0,
        char: 'X'
    },

    playerTwo: {
        name: undefined,
        score: 0,
        char: '0'
    },

    player_turn: null
}

const squares = document.querySelectorAll(".cell")
const scoreBoard = document.querySelector("#scoreboard")
const player1Submit = document.querySelector("#player1_submit")
const player1Input = document.querySelector("#player1_input")
const player1 = document.querySelector("#player1_name")
const player2Submit = document.querySelector("#player2_submit")
const player2Input = document.querySelector("#player2_input")
const player2 = document.querySelector("#player2_name")
const newGame = document.querySelector("#new_game")

const board = document.querySelector("#board")

let x = 0
let y = 0

function resetBoard(){
    for (i=0; i<squares.length;i++){
        squares[i].innerText = ''
    }
}

function startNewGame(event) {
    event.preventDefault()
    resetBoard()
    if (ticTacToe.playerOne.name && ticTacToe.playerTwo.name){
        ticTacToe.player_turn = 2
    }
    else {
        window.alert("Must submit player names to play game. To play vs computer submit player2 as empty.")
    }
    return ticTacToe.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

function playGame(clickEvent) {
    if (clickEvent.target.matches('.cell')){
        x = clickEvent.target.id[0]
        y = clickEvent.target.id[1]
    
        if (clickEvent.target.matches('.cell') && (ticTacToe.player_turn % 2 === 0) && (ticTacToe.board[x][y]===null) && (ticTacToe.player_turn)){
            clickEvent.target.innerText = 'X'
            ticTacToe.board[x][y]='X'
            ticTacToe.player_turn++
        }
        if (clickEvent.target.matches(".cell") && (ticTacToe.player_turn % 2 !== 0) && (ticTacToe.board[x][y]===null) && (ticTacToe.player_turn)){
            clickEvent.target.innerText = '0'
            ticTacToe.board[x][y]='0'
            ticTacToe.player_turn++
        }
    }
    return ticTacToe.board
}

function getRow(grid,num){
    let row = []
    for (i=0;i<3;i++){
        let currChar = grid[num][i]
        row.push(currChar)
    }
    return row
}

function getColumn(grid, num){
    let column = []
    for (i=0;i<3;i++){
        let currChar = grid[i][num]
        column.push(currChar)
    }
    return column
}

/*
need to get diagonals
[0][0], [1][1], [2][2]
[0][2], [1][1], [2][0]
*/ 




/*
function getAxis(clickEvent){
    if (clickEvent.target.matches('.cell')){
        x = clickEvent.target.id[0]
        y = clickEvent.target.id[1]
    }
}
*/


function addPlayer1(event) {
    event.preventDefault();
    player1.innerText = player1Input.value
    ticTacToe.playerOne.name = player1Input.value
}

function addPlayer2(event) {
    event.preventDefault();
    if (!player2Input.value){
        player2.innerText = 'CPU'
        ticTacToe.playerTwo.name = 'CPU'
    }
    else {
        player2.innerText = player2Input.value
        ticTacToe.playerTwo.name = player2Input.value
    }
}

//board.addEventListener("click", getAxis)
newGame.addEventListener("submit", startNewGame)
board.addEventListener("click", playGame)
player1Submit.addEventListener("submit", addPlayer1)
player2Submit.addEventListener("submit", addPlayer2)