//Cost function
//f(n) = g(n) + h(n)
//g is the know cost
//h is the estimated cost
var cols;
var rows;
var nodeSize = 20;
let grid;
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function setup() {
  cols = floor(innerWidth/nodeSize);
  rows = floor(innerHeight/nodeSize);
  createCanvas(cols * nodeSize, rows*nodeSize);

  grid = new Array(cols)
  
  //Creating a 2D array for the nodes
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  console.log(grid);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}
function heuristic(a, b) {
  var d = dist(a.x, a.y, b.x, b.y);
  return d;
}
function draw() {

  if (openSet.length > 0) {
    //Open set is not empty so continue to search

    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    var current = openSet[lowestIndex];
    if (current == end) {
      noLoop();
      console.log('done');
    }

    closedSet.push(current);
    openSet.splice(lowestIndex, 1);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let n = neighbors[i];
      if (!closedSet.includes(n) && !n.wall) {
        var tempG = current.g + 1;
        var newPath = false;
        if (openSet.includes(n)) {
          if (tempG < n.g) {
            n.g = tempG;
            newPath = true;
          }
        } else {
          n.g = tempG;
          openSet.push(n);
          newPath = true;
        }
        if (newPath) {
          n.h = heuristic(n, end);
          n.f = n.g + n.h;
          n.previous = current;
        }
      }
    }
  } else {
    //No possible route found
    noLoop();
    console.log('no route')
    return;
  }
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  path = [];
  let temp = current;
  path.push(temp)
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0,0,255));
  }
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x * nodeSize + nodeSize/2, path[i].y * nodeSize + nodeSize/2);
  }
  endShape();
  

}