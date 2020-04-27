"use strict";

let info = document.getElementById("info")
let board = ""
let cellSize = 10
let boardR = 120
let boardC = 60
let density = 3

function random_maze_factory(){
  board = new RandomMaze(boardR, boardC, density, cellSize)
  info.innerHTML = "total steps: 0 | path steps: 0"
  clear_board()
  board.drawMatrix()
}


function prims_maze_factory(){
  board = new PrimsMaze(boardR, boardC, cellSize)
  clear_board()
  board.update()
  board.drawMatrix()
  board.update()
}

function recursive_solver_factory(){
  let p = new RecursiveSolver(board)
  if (p.move(board.start_r, board.start_c) == false){
    //TODO goal path wont be drawn if the recursive solver doesnt make it to the end.
    drawGoalPath(p.getGoalPath())
  } else {
    drawGoalPath(p.getGoalPath())
  }
}

function dijkstra_solver_factory(){
  let d = new dijkstraSolver(board)
  d.step()
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
    let r = gp[i].split(" ")[0]
    let c = gp[i].split(" ")[1]
    let div = document.createElement("div")
    div.style.width = cellSize + "px"
    div.style.height = cellSize + "px"
    div.style.position = "absolute"
    div.style.left = r*cellSize + "px"
    div.style.top = c*cellSize + "px"
    // div.style.border = "1px solid black"
    // div.innerHTML = r + "," +  c
    let red = step*4+60
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
