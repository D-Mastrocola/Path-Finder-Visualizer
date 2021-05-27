class Start {
  constructor(x, y, gridSize, array) {
    this.pos = createVector(x, y);
    this.setPos(x, y, array);
    this.gridSize = gridSize;
    this.selected = false;
    this.unvisitedNodes = [];
    this.vistedNodes = [];
  }
  aStarSolve(array) {
    this.unvisitedNodes = array;
    for (let i = 0; i < array.length; i++) {}
  }
  show() {
    fill(100, 100, 255);
    rect(
      this.pos.x * this.gridSize,
      this.pos.y * this.gridSize,
      this.gridSize,
      this.gridSize
    );
  }
  setPos(x, y, array) {
    if (array[x][y] !== "=") {
      array[this.pos.x][this.pos.y] = "0";
      this.pos.set(x, y);
      array[this.pos.x][this.pos.y] = "+";
    }
  }
}
