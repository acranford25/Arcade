const ticTacToe = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],

    
}

const squares = document.getElementsByClassName("cell")
const scoreBoard = document.querySelector("#scoreboard")
const player1Submit = document.querySelector("#player1_submit")
const player1Input = document.querySelector("#player1_input")
const player1 = document.querySelector("#player1_name")
const player2Submit = document.querySelector("#player2_submit")
const player2Input = document.querySelector("#player2_input")
const player2 = document.querySelector("#player2_name")

const board = document.querySelector("#board")

let counter = 0
let x = 0
let y = 0

function playGame(clickEvent) {
    if (clickEvent.target.matches('.cell')){
        x = clickEvent.target.id[0]
        y = clickEvent.target.id[1]
    
        if (clickEvent.target.matches('.cell') && (counter % 2 === 0) && (ticTacToe.board[x][y]===null)){
            clickEvent.target.innerText = 'X'
            ticTacToe.board[x][y]='X'
            counter++
        }
        if (clickEvent.target.matches(".cell") && (counter % 2 !== 0) && (ticTacToe.board[x][y]===null)){
            clickEvent.target.innerText = '0'
            ticTacToe.board[x][y]='0'
            counter++
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

/*
const ticTacToe = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    move: function(char, row, col){
      if (this.board[row][col]===null){
      this.board[row][col]=char
      }
      return this.board
    },
    clear: function(){
      this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
      return this.board
    }
}
*/





function addPlayer1(event) {
    event.preventDefault();
    player1.innerText = player1Input.value
}

function addPlayer2(event) {
    event.preventDefault();
    if (!player2Input.value){
        player2.innerText = 'CPU'
    }
    else {
        player2.innerText = player2Input.value
    }
}

//board.addEventListener("click", getAxis)
board.addEventListener("click", playGame)
player1Submit.addEventListener("submit", addPlayer1)
player2Submit.addEventListener("submit", addPlayer2)