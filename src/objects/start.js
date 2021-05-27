class Start {
  constructor(x, y, gridSize) {
    this.pos = createVector(x, y);
    this.gridSize = gridSize;
    this.selected = false;
    this.unvisitedNodes = [];
    this.vistedNodes = [];
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
    array[this.pos.x][this.pos.y] = '0';
    this.pos.set(x, y);
    array[this.pos.x][this.pos.y] = '+';
  }
}
