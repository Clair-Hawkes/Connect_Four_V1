"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  const board = [];

  //Creating rows
  for(let y = 0; y < HEIGHT;y++){
    let row = [];
    //Creating columns
    for(let x=0;x < WIDTH;x++){
      row.push(null);
    }
    board.push(row);

  }
  console.log(board);
  return board;
}

//New comment

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");

  // TODO: add row for panel buttons and add event listener the row
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add an id number for each column in the row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let row = document.createElement('tr');
    row.setAttribute("id", "row");

    //Fill with cells
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let cell = document.createElement('td');

      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);

      // TODO: append the table cell to the table row
      row.append(cell);

    }
    // TODO: append the row to the html board
    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled)
 * findSpotForCol takes a number (0-(width-1))
*/

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for(y=HEIGHT-1;y>=0;y--){
    if(gameBoard[y][x] === null){
      return y;
    }
  }
  //Loop exits after not finding an empty slot
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`);
  console.log(cell);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  gameBoard[y][x] = currPlayer;


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //If the top row is filled then all rows below it must be as well.
  //So oly the top row is checked.
  if(gameBoard[0].every(cell => cell !== null)){
    endGame();
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // [ [y, x], [y, x], [y, x], [y, x] ]
    for(let cell of cells){
      const [y,x] = cell;
      console.log(y,x);

      try{
        gameBoard[y][x]
      } catch(error) {
        return false;
      }

      if(gameBoard[y][x] !== currPlayer){
        return false;
      }
    }

    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y,x],[y+1,x],[y+2,x],[y+3,x]];
      // let diagDL = [[y+3,x],[y+2,x+1],[y+1,x+2],[y,x+3]];
      // diagDL = [[y,x],[y+1,x-1],[y+2,x-2],[y+3,x-3]]
      // let diagDR = [[y,x],[y+1,x+1],[y+2,x+2],[y+3,x+3]];

      // let diagDL = [[y,x],[y-1,x+1],[y-2,x+2],[y-3,x+3]];
      // let diagDR = [[y,x],[y+1,x-1],[y+2,x-2],[y+3,x-3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

//x | y
//0 | 3
//1 | 2
//2 | 1
//3 | 0

//y | x

// //Primary Planning stage no code used

// // No move = 0
// // Red move = 1
// // Blue move = 2

// //Move tracker:1 = red player, 2 = blue player

// const moveTracker = 2;

// gameBoard =
// [
//   [1,0,0,0],//index 0
//   [1,0,0,0],//index 1
//   [1,0,0,0],//index 2
//   [1,0,0,0],//index 3
//   [1,0,0,0],//index 4
//   [1,0,0,0],//index 5


// ];

// //Winning test cases from Index [3,0]
// //If ([3,1] === 1){
// //if(3,2)

// //Check with includes
// //let array = [Val at3,0, ]
// const ind3 = gameBoard[3].join('');
// for(let i =0;i<gameBoard.length;i++){
//   if (ind3 === '1111'||ind3==='2222'){

// }


// }

