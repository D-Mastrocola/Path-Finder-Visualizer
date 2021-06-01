function Node(i, j) {
  this.x = i;
  this.y = j;

  //A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  //Dijiktras
  this.srcDist = 999_999

  this.neighbors = [];
  this.previous = null;
  this.wall = false;
  this.selected = false;

  if (random(1) < 0.3) {
    //this.wall = true;
  }

  this.show = function (color) {
    fill(color)
    if (this.wall) fill(0)
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
/*
    //Diagonals
    if (x > 0 && y > 0) this.neighbors.push(grid[x - 1][y - 1]);
    if (x < cols - 1 && y > 0) this.neighbors.push(grid[x + 1][y - 1]);
    if (x > 0 && y < rows - 1) this.neighbors.push(grid[x - 1][y + 1]);
    if (x < cols - 1 && y < rows - 1) this.neighbors.push(grid[x + 1][y + 1]);*/
  }
}