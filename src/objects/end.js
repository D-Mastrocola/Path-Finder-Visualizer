class End {
  constructor(x, y, gridSize) {
    this.pos = createVector(x, y);
    this.gridSize = gridSize;
    this.selected = false;
  }
  show() {
    fill(255, 20, 20);
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
