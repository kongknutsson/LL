class RecursiveSolver {
  constructor(board) {
    this.board = board
    this.rpos = board.start_r
    this.cpos = board.start_c
    this.goalPath = []
    this.saveCondition = true
    this.totalSteps = 0
  }

  move(r, c, visited=[]){
    this.totalSteps += 1
    document.getElementById("info").innerHTML = "total steps: " + this.totalSteps
    if (this.totalSteps >= 100000){
      if (this.saveCondition == true){
        this.goalPath = visited
        this.rpos = r
        this.cpos = c
        this.saveCondition = false
      }
      return false
    }

    let rc = r + " " + c
    if (visited.includes(rc) || this.board.isPath(r, c) == false){
      return false
    }

    visited.push(rc)
    if (board.isGoal(r, c)){
      this.goalPath = visited
      this.rpos = r
      this.cpos = c
      return true
    }

    if (this.move(r-1, c, visited)){  // West
      return true
    }
    if (this.move(r, c-1, visited)){  // North
      return true
    }
    if (this.move(r+1, c, visited)){  // East
      return true
    }
    if (this.move(r, c+1, visited)){  // South
      return true
    }
    visited.pop()
    return false
  }

  getGoalPath(){
    return this.goalPath
  }
}
