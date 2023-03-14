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
const player1Score = document.querySelector("#score1Num")
const player2Score = document.querySelector("#score2Num")

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
        ticTacToe.player_turn = 0
        player1.innerText = ticTacToe.playerOne.name + " <"
        player2.innerText = ticTacToe.playerTwo.name
    }
    else {
        window.alert("Must submit player names to play game. To play vs computer submit player2 as empty. Then click New Game")
    }
    return ticTacToe.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

function isTurn(){
    if (ticTacToe.player_turn % 2 === 0){
        player2.innerText += " <"
        player1.innerText = ticTacToe.playerOne.name
    }
    if (ticTacToe.player_turn % 2 !== 0){
        player1.innerText += " <"
        player2.innerText = ticTacToe.playerTwo.name
    }
}

function playGame(clickEvent) {
    const isGameActive = ticTacToe.player_turn !== null
    if (!isGameActive){
        return ticTacToe.board
    }

    const isCell = clickEvent.target.matches('.cell')
    if (!isCell){
        return ticTacToe.board
    }

    x = clickEvent.target.id[0]
    y = clickEvent.target.id[1]
    
    const isCellEmpty = ticTacToe.board[x][y] === null
    if (!isCellEmpty){
        return ticTacToe.board
    }
    isTurn()
    const isTurnEven = ticTacToe.player_turn % 2 === 0
    if (isTurnEven){
        clickEvent.target.innerText = 'X'
        ticTacToe.board[x][y]='x'
    }
    
    const isTurnOdd = ticTacToe.player_turn % 2 !== 0
    if (isTurnOdd){
        clickEvent.target.innerText = '0'
        ticTacToe.board[x][y]='0'
    }

    ticTacToe.player_turn++
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

function getWinConditions(grid) {
    const firstDiagonal = [ticTacToe.board[0][0], ticTacToe.board[1][1], ticTacToe.board[2][2]] 
    const secondDiagonal = [ticTacToe.board[0][2], ticTacToe.board[1][1], ticTacToe.board[2][0]]
    const sectionsToCheck = [];
    sectionsToCheck.push(firstDiagonal)
    sectionsToCheck.push(secondDiagonal)
    for (let i = 0; i < grid.length; i++) {
        const currentRow = getRow(grid, i)
        const currentColumn = getColumn(grid, i)
        sectionsToCheck.push(currentRow)
        sectionsToCheck.push(currentColumn)
    }
    return sectionsToCheck
}

function xWins(){
    let plays = getWinConditions(ticTacToe.board)
    for (i=0;i<plays.length;i++){
        let play = plays[i]
        let check = ['x', 'x', 'x']
        if (String(play) === String(check)){
            return true
        }
    }
    return false
}

function yWins(){
    let plays = getWinConditions(ticTacToe.board) 
    for (i=0;i<plays.length;i++){
        let play = plays[i]
        let check = ['0', '0', '0']
        if (String(play) === String(check)){
            return true
        }
    }
    return false
}

function isGridFull(grid){
    for (let i=0; i<grid.length; i++){
        let currRow = []
        for (let j=0; j<grid.length; j++){
            let currEl = grid[i][j]
            if (currEl !== null){
            currRow.push(currEl)
            }
            else {
            return false
            }
        }
        }
        return true
}

function endGame(){
    let value1 = xWins()
    if (value1){
        ticTacToe.playerOne.score++
        ticTacToe.player_turn = null
        player1Score.innerText = ticTacToe.playerOne.score
        ticTacToe.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }
    let value2 = yWins()
    if (value2){
        ticTacToe.playerTwo.score++
        ticTacToe.player_turn = null
        player2Score.innerText = ticTacToe.playerTwo.score
        ticTacToe.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    }

    let value3 = isGridFull(ticTacToe.board)
    if (!!value3 && !value1 && !value2){
        window.alert("stalemate")
    }

}

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
board.addEventListener("click", endGame)
player1Submit.addEventListener("submit", addPlayer1)
player2Submit.addEventListener("submit", addPlayer2)