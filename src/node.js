function Node(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = null;

  this.show = function (color) {
    fill(color)
    noStroke();
    rect(this.x * nodeSize, this.y * nodeSize, nodeSize - 1, nodeSize - 1)
  }
  this.addNeighbors = function (grid) {
    let x = this.x;
    let y = this.y;
    if (x < cols - 1) this.neighbors.push(grid[x + 1][y]);
    if (x > 0) this.neighbors.push(grid[x - 1][y]);
    if (y < rows - 1) this.neighbors.push(grid[x][y + 1]);
    if (y > 0) this.neighbors.push(grid[x][y - 1]);
  }
}