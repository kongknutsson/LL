"use strict";

class Maze {
  constructor(row, col, cellSize) {
    this.rows = row
    this.columns = col
    this.cellSize = cellSizes
    this.goal_r = 0
    this.goal_c = 0
  }

  draw(player_r, player_c){
    for (let r = 0; r < this.rows; r++){
      for (let c = 0; c < this.columns; c++){
        let div = document.createElement("div")
        div.style.width = cellSize + "px"
        div.style.height = cellSize + "px"
        div.style.position = "absolute"
        div.style.left = r*cellSize + "px"
        div.style.top = c*cellSize + "px"
        div.style.border = "1px solid black"
        //div.innerHTML = r + "," +  c
        if (r == player_r && c == player_c){
          div.style.backgroundColor = "red"
        } else if (this.matrix[r][c] == false) {
          div.style.backgroundColor = "black"
        } else if (this.matrix[r][c] == true) {
          div.style.backgroundColor = "green"
        }
        document.getElementById("board").appendChild(div);
      }
    }
  }


}