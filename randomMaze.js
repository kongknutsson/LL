"use strict";

class RandomMaze {
  constructor(row, col, density, cellSize) {
    this.rows = row,
    this.columns = col,
    this.cellSize = cellSize
    this.goal_r = 0
    this.goal_c = 0
    // Disse endres av make matrix funksjonen
    this.start_c = 0
    this.start_r = this.rows-1
    this.matrix = this.makeMatrix(row, col, density)
  }

  isPath(row, col){
    return this.matrix[row][col]
  }

  isGoal(row, col){
    if(this.goal_r == row && this.goal_c == col){
      return true
    }
    return false
  }

  makeMatrix(row, col, density){
    let matrix = this._createGrid(row, col)
    matrix = this._addWalls(matrix, density)
    matrix = this._addExit(matrix)
    return matrix
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
          div.style.backgroundColor = "teal"
        } else if (this.matrix[r][c] == false) {
          div.style.backgroundColor = "black"
        } else if (this.matrix[r][c] == true) {
          div.style.backgroundColor = "white"
        }
        if (r == this.goal_r && c == this.goal_c){
          div.style.backgroundColor = "green"
        }
        document.getElementById("board").appendChild(div);
      }
    }
  }

  _addExit(matrix){
    let x = getRandomInt(this.columns-2) + 1
    let y = getRandomInt(this.columns-2) + 1
    matrix[0][x] = true
    this.goal_r = 0
    this.goal_c = x
    matrix[this.rows-1][y] = true
    this.start_c = y

    return matrix
  }

  _addWalls(matrix, density){
    // Legger først til på alle sidene.
    for (let r = 0; r < this.rows; r++){
      for (let c = 0; c < this.columns; c++){
        if (r == 0 || r == this.rows-1){
          matrix[r][c] = false
        }
        if (c == 0 || c == this.columns-1){
          matrix[r][c] = false
        }
      }
    }
    // Deretter legger vi til på randome steder,
    // men IKKE på linjene som er direkte over ut/inngang.
    for (let r = 2; r < this.rows-2; r++){
      for (let c = 0; c < this.columns; c++){
        let n = getRandomInt(density)
        if (n == 1) {
          matrix[r][c] = false
        }
      }
    }
    return matrix
  }

  _createGrid(row, col){
    let matrix = []
    for (let r = 0; r < row; r++){
      let row_list = []
      for (let c = 0; c < col; c++){
        row_list.push(true)
      }
      matrix.push(row_list)
    }
    return matrix
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
