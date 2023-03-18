let ticTacToe = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    
    gameStatus: false,

    playerOne: {
        name: undefined,
        score: 0,
        char: 'X',
        turn: true,
    },

    playerTwo: {
        name: undefined,
        score: 0,
        char: '0',
        turn: false,
        status: false,
    },

    player_turn: null
}

const squares = document.querySelectorAll(".cell")
const square = document.querySelector(".cell")
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


function addPlayer1(event) {
    event.preventDefault();
    player1.innerText = player1Input.value + " <"
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
        ticTacToe.playerTwo.status = true
    }
}

let x = square.id[0]
let y = square.id[1]

function resetBoard(){
    for (i=0; i<squares.length;i++){
        squares[i].innerText = ''
    }
}

function startNewGame(event) {
    event.preventDefault()
    resetBoard()
    if (ticTacToe.playerOne.name && ticTacToe.playerTwo.name){
        ticTacToe.gameStatus = true
    }
    else {
        window.alert("Must submit player names to play game. To play vs computer submit player2 as empty. Then click New Game")
    }
    ticTacToe.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    playComputer()
}



function isTurn(){
    if (ticTacToe.player_turn % 2 === 0 && ticTacToe.playerOne.turn){
        player2.innerText += " <"
        player1.innerText = ticTacToe.playerOne.name
        ticTacToe.playerOne.turn = false
        ticTacToe.playerTwo.turn = true
    }
    
    if (ticTacToe.player_turn % 2 !== 0 && ticTacToe.playerTwo.turn && ticTacToe.playerTwo.status){
        player1.innerText += " <"
        player2.innerText = ticTacToe.playerTwo.name
        ticTacToe.playerTwo.turn = false
        ticTacToe.playerOne.turn = true
    }
}

function playGame(clickEvent) {
    const isGameActive = ticTacToe.gameStatus !== false
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
    
    let isTurnEven = ticTacToe.player_turn % 2 === 0
    if (isTurnEven && ticTacToe.playerOne.turn){
        clickEvent.target.innerText = 'X'
        ticTacToe.board[x][y]='x'
    }
    
    let isTurnOdd = ticTacToe.player_turn % 2 !== 0
    if (isTurnOdd && ticTacToe.playerTwo.turn && ticTacToe.playerTwo.status){
        clickEvent.target.innerText = '0'
        ticTacToe.board[x][y]='0'
    }
    
    isTurn()
    playComputer()
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
    const sectionsToCheck = [];
    let firstDiagonal = []
    let secondDiagonal = []
    for (i = 0, j = 0; i < grid.length, j < grid.length; i++, j++){
        let currChar = grid[i][j]
        firstDiagonal.push(currChar)
    }
    for (i = 0, j = grid.length-1; i < grid.length, j >= 0; i++, j--){
        let currChar = grid[i][j]
        secondDiagonal.push(currChar)
    }
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
        ticTacToe.gameStatus = false
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
        ticTacToe.gameStatus = false
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
        ticTacToe.gameStatus = false
    }
}


function playComputer(){
    setInterval(function () {
        if (!ticTacToe.gameStatus){
            return ticTacToe.board
        }
        if ((ticTacToe.player_turn % 2 !== 0) && (ticTacToe.playerTwo.status === false)){
            const randomSquareIndex = Math.floor(Math.random() * squares.length);
            let currSquare = squares[randomSquareIndex]
            if (squares[randomSquareIndex].innerText===''){
                x = currSquare.id[0]
                y = currSquare.id[1]
                squares[randomSquareIndex].innerText = '0'
                ticTacToe.board[x][y]='0'
                ticTacToe.player_turn++
                player1.innerText += " <"
                player2.innerText = ticTacToe.playerTwo.name
                ticTacToe.playerOne.turn = true
                ticTacToe.playerTwo.turn = false
            }
        }
        endGame()
    }, 3000);
}

/*function computerSmart(grid){
    for (let i = 0; i < grid.length; i++){
        let firstEl = grid[0][i]
        let secondEl = grid[1][i]
        let thirdEl = grid[2][i]
        if (firstEl && firstEl === secondEl && thirdEl === null){
            ticTacToe.board[i][2] = '0'
    }
        if (firstEl && firstEl === thirdEl && secondEl === null){
            ticTacToe.board[i][1] = '0'
        }
        if (!firstEl && secondEl === thirdEl){
            ticTacToe.board[i][0] = '0'
        }
    }
    for (let i = 0; i < grid.length; i++){
        let currArr = grid[i]
        let firstEl = currArr[0]
        let secondEl = currArr[1]
        let thirdEl = currArr[2]
        if (firstEl && firstEl === secondEl && thirdEl === null){
            ticTacToe.board[i][2] = '0'
        }
        if (firstEl && firstEl === thirdEl && secondEl === null){
            ticTacToe.board[i][1] = '0'
        }
        if (!firstEl && secondEl === thirdEl){
            ticTacToe.board[i][0] = '0'
        }
    }
    let firstEl = grid[0][0]
        let secondEl = grid[1][1]
        let thirdEl = grid[2][2]
        let fourthEl = grid[0][2]
        let fifthEl = grid[2][0]
        if (firstEl && firstEl === secondEl && thirdEl === null){
            grid[2][2] = '0'
        }
        if (firstEl && firstEl === thirdEl && secondEl === null){
            grid[1][1] = '0'
        }
        if (!firstEl && secondEl === thirdEl){
            grid[0][0] = '0'
        }
        if (fourthEl && fourthEl === secondEl && fifthEl === null){
            grid[2][0] = '0'
        }
        if (fourthEl && fourthEl === fifthEl && secondEl === null){
            grid[1][1] = '0'
        }
        if (!fourthEl && secondEl === fifthEl){
            grid[0][2] = '0'
        }
    return ticTacToe.board
}

function renderComputer(grid){
    let x = 0
    let y = 0
    for (i = 0; i < grid.length; i++)
    for (j = 0; j < grid.length; j++){
        if (grid[i][j]==='0')
        x = i
        y = j
    }
    const cell=document.getElementById(`${x}${y}`)
    cell.innerText='0'
}*/

//board.addEventListener("click", getAxis)
newGame.addEventListener("submit", startNewGame)
board.addEventListener("click", playGame)
board.addEventListener("click", endGame)
player1Submit.addEventListener("submit", addPlayer1)
player2Submit.addEventListener("submit", addPlayer2)