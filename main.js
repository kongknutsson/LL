"use strict";

let info = document.getElementById("info")
let board = ""
let cellSize = 5
let boardR = 240
let boardC = 120
let density = 3

function random_maze_factory(){
  board = new RandomMaze(boardR, boardC, density, cellSize)
  info.innerHTML = "total steps: 0 | path steps: 0"
  clear_board()
  board.draw()
}


function prims_maze_factory(){
  board = new PrimsMaze(boardR, boardC)
  clear_board()
  board.update()
  board.draw()
}




function recursive_solver_factory(){
  p = new RecursiveSolver(board)
  if (p.move(board.start_r, board.start_c) == false){
    //TODO goal path wont be drawn if the recursive solver doesnt make it to the end.
    drawGoalPath(p.getGoalPath())
  } else {
    drawGoalPath(p.getGoalPath())
  }
}

function clear_board(){
  var parentNode = document.getElementById("board")
  parentNode.innerHTML = ""
}

function drawGoalPath(gp){
  let step = 0
  let blue = 0
  for (let i = 0; i < gp.length; i++){
    step += 1
    r = gp[i].split(" ")[0]
    c = gp[i].split(" ")[1]
    let div = document.createElement("div")
    div.style.width = cellSize + "px"
    div.style.height = cellSize + "px"
    div.style.position = "absolute"
    div.style.left = r*cellSize + "px"
    div.style.top = c*cellSize + "px"
    // div.style.border = "1px solid black"
    // div.innerHTML = r + "," +  c
    red = step*4+60
    if (red > 250){
      blue += 2
    }
    div.style.backgroundColor = "rgb(" + red + ",10," + blue + ")"
    if (i == gp.length-1){
      div.style.backgroundColor = "green"
    }
    document.getElementById("board").appendChild(div);
  }
  info.innerHTML += " | path steps: " + step
}