"use strict";

class PrimsMaze {
  constructor(row, col, cellSize) {
    this.rows = row,
    this.columns = col,
    this.goal_r = 0
    this.goal_c = 0
    // Brukes av Solver til å finne startsted
    this.start_r = 0
    this.start_C = 0
    this.cellSize = cellSize
    this.matrix = this.makeMatrix(row, col)
    this.frontier = this.add_frontier_from(this.next_r, this.next_c)
    // Disse er kommentert ut fordi det ikke funker om de står her...
    // blir derfor opprettet i makeMatrix() istedenfor.
    // this.next_r = 0
    // this.next_c = 0
  }

  isPath(row, col){
    if (row == null || col == null){
      return false
    }
    return this.matrix[row][col]
  }

  isGoal(row, col){
    if(this.goal_r == row && this.goal_c == col){
      return true
    }
    return false
  }

  makeMatrix(row, col){
    let matrix = []
    for (let r = 0; r < row; r++){
      let row_list = []
      for (let c = 0; c < col; c++){
        row_list.push(false)
      }
      matrix.push(row_list)
    }
    // Velger en random START celle til høyre.
    let r = this.rows-1
    let c = 1 + getRandomInt(this.columns-2)
    this.next_r = r
    this.next_c = c
    // Brukes av Solver til å starte
    this.start_r = r
    this.start_c = c
    matrix[r][c] = true
    return matrix
  }

  add_frontier_from(r, c){
    let new_frontiers = []
    r = parseInt(r)
    c = parseInt(c)

    if (r < this.rows-1 && c-2 > 0){
      let north_frontier = this.matrix[r][c-2]
      if (north_frontier == false){
        new_frontiers.push(String(r) + "," + String(c-2))
      }
    }

    if (r < this.rows-1 && c+2 < this.columns-1){
      let south_frontier = this.matrix[r][c+2]
      if (south_frontier == false){
        new_frontiers.push(String(r) + "," + String(c+2))
      }
    }
    if (r-2 > 0){
      let west_frontier = this.matrix[r-2][c]
      if (west_frontier == false){
        new_frontiers.push(String(r-2) + "," + String(c))
      }
    }
    if (r+2 < this.rows-1){
      let east_frontier = this.matrix[r+2][c]
      if (east_frontier == false){
        new_frontiers.push(String(r+2) + "," + String(c))
      }
    }
    return new_frontiers
  }

  update(){
    if (this.frontier.length == 0){
      this.goal_r = this.next_r
      this.goal_c = this.next_c
      return 1
    } else {
      // Velger en random frontier celle
      let i = getRandomInt(this.frontier.length)
      let frontier_cell = this.frontier[i]

      // Finner naboene til frontier cellen.
      let neighbor_cells = this.neighbors(frontier_cell)

      // Velger en random av naboene til frontier cellen.
      let neighbor_cell = neighbor_cells[getRandomInt(neighbor_cells.length)]

      // Fjerner veggen som skiller frontier og nabo cellen.
      // Den gjør også om frontier cellen til en path.
      // returnerer kordinatene til den fjernete pikselen.
      let removed = this.remove_separation(frontier_cell, neighbor_cell)
      this.next_r = frontier_cell.split(",")[0]
      this.next_c = frontier_cell.split(",")[1]

      // Henter ut frontier cellene til den frontier cellen vi nettop gjorde til path
      let new_frontiers = this.add_frontier_from(this.next_r, this.next_c)
      for (let i = 0; i < new_frontiers.length; i++){
        if (this.frontier.includes(new_frontiers[i]) == false){
          this.frontier.push(new_frontiers[i])
        }
      }

      // fjerner deretter frontier cellen vi brukte fra listen av frontiers.
      this.frontier.splice(this.frontier.indexOf(frontier_cell), 1)

      // Dette trengs ikke. Bare digg å ha for å debugge om man kjører en og en update.
      // tegner de rutene som er i frontier eller som nettop er blitt path
      // for (let i = 0; i < this.frontier.length; i++){
      //   let frontier_r = this.frontier[i].split(",")[0]
      //   let frontier_c = this.frontier[i].split(",")[1]
      //   this.draw_single(frontier_r, frontier_c)
      // }
      // this.draw_single(this.next_r, this.next_c)
      // this.draw_single(removed.split(",")[0], removed.split(",")[1])

      this.update()
    }
  }

  remove_separation(cell1, cell2){
    // antar at cell 1 er frontier cell
    let cell1_r = parseInt(cell1.split(",")[0])
    let cell1_c = parseInt(cell1.split(",")[1])
    let cell2_r = parseInt(cell2.split(",")[0])
    let cell2_c = parseInt(cell2.split(",")[1])
    this.matrix[cell1_r][cell1_c] = true
    this.matrix[cell2_r][cell2_c] = true
    let removed = 0

    if (cell1_c == cell2_c){
      let r = Math.max(cell1_r, cell2_r) - 1
      this.matrix[r][cell1_c] = true
      removed = r + "," + cell1_c
    }
    if (cell1_r == cell2_r){
      let c = Math.max(cell1_c, cell2_c) - 1
      this.matrix[cell1_r][c] = true
      removed = cell1_r + "," + c
    }
    return removed
  }

  draw_single(r, c, player_r, player_c){
    let div = document.createElement("div")
    div.style.width = cellSize + "px"
    div.style.height = cellSize + "px"
    div.style.position = "absolute"
    div.style.left = r*cellSize + "px"
    div.style.top = c*cellSize + "px"
    // div.style.border = "1px solid black"
    div.style.color = "red"
    if (this.matrix[r][c] == false) {
      div.style.backgroundColor = "black"
    }
    if (this.matrix[r][c] == true) {
      div.style.backgroundColor = "white"
    }
    if (this.frontier.includes(r + "," + c)){
      div.style.backgroundColor = "teal"
    }
    document.getElementById("board").appendChild(div);
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
        // div.style.border = "1px solid black"
        div.style.color = "red"
        if (this.matrix[r][c] == false) {
          div.style.backgroundColor = "black"
        }
        if (this.matrix[r][c] == true) {
          div.style.backgroundColor = "white"
        }
        if (r == this.goal_r && c == this.goal_c){
          div.style.backgroundColor = "green"
        }
        document.getElementById("board").appendChild(div);
      }
    }
  }

  // Henter ut alle naboene som er true(passage)
  neighbors(frontier_cell){
    let rc = frontier_cell.split(",")
    let r = parseInt(rc[0])
    let c = parseInt(rc[1])
    let neighbors = []

    if (r < this.rows-1 && c-2 > 0){
      let north = this.matrix[r][c-2]
      if (north == true){
        neighbors.push(String(r) + "," + String(c-2))
      }
    }
    if (r < this.rows-1 && c+2 < this.columns-1){
      let south = this.matrix[r][c+2]
      if (south == true){
        neighbors.push(String(r) + "," + String(c+2))
      }
    }
    if (r-2 > 0){
      let west = this.matrix[r-2][c]
      if (west == true){
        neighbors.push(String(r-2) + "," + String(c))
      }
    }
    if (r+2 < this.rows){
      let east = this.matrix[r+2][c]
      if (east == true){
        neighbors.push(String(r+2) + "," + String(c))
      }
    }
    return neighbors
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


