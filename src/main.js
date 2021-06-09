//Cost function
//f(n) = g(n) + h(n)
//g is the know cost
//h is the estimated cost
var cols;
var rows;
var nodeSize = 40;
let grid;
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var current;
var algorithm = "dijktras";
let eraser = false;

var isRunning = false;

function startRunning() {
  isRunning = true;
  openSet.push(start);
}
function setup() {
  cols = floor(innerWidth / nodeSize);
  rows = floor(innerHeight / nodeSize);
  createCanvas(cols * nodeSize, rows * nodeSize);

  grid = new Array(cols);

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
  start = grid[round(cols / 8)][round(rows / 2)];
  end = grid[round(cols / 8) * 7][round(rows / 2)];
  start.wall = false;
  end.wall = false;

  //Make a default wall
  for (let i = round((rows / 20) * 8); i <= round((rows / 20) * 13); i++) {
    grid[round(cols / 2)][i].wall = true;
  }
}
function mousePressed() {
  if (
    !isRunning &&
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ) {
    let x = floor(mouseX / nodeSize);
    let y = floor(mouseY / nodeSize);

    if (start.selected) {
      start = grid[x][y];
      start.selected = true;
    } else if (end.selected) {
      end = grid[x][y];
      end.selected = true;
    } else if (eraser) {
      grid[x][y].wall = false;
    } else {
      grid[x][y].wall = true;
      console.log(start.selected);
    }
  }

  if (grid[x][y].wall) {
      grid[x][y].wall = false;
      eraser = true;
    } 
  }
function mouseDragged() {
  if (
    !isRunning &&
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ) {
    let x = floor(mouseX / nodeSize);
    let y = floor(mouseY / nodeSize);

    if (start.selected) {
      start = grid[x][y];
      start.selected = true;
    } else if (end.selected) {
      end = grid[x][y];
      end.selected = true;
    } else if(start == grid[x][y] || end == grid[x][y]) {
      //Do nothing
    }else if (eraser) {
      grid[x][y].wall = false;
    } else {
      grid[x][y].wall = true;
      console.log(start.selected);
    }
  }
  console.log(start);
}
function mouseReleased() {
  start.selected = false;
  end.selected = false;
  eraser = false;
}

function heuristic(a, b) {
  var d = dist(a.x, a.y, b.x, b.y);
  return d;
}
function dijkstras() {
  if (openSet.length > 0) {
    //Open set is not empty so continue to search

    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    current = openSet[lowestIndex];
    if (current == end) {
      noLoop();
      console.log("done");
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
    console.log("no route");
    return;
  }
}
function aStar() {
  if (openSet.length > 0) {
    //Open set is not empty so continue to search

    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    current = openSet[lowestIndex];
    if (current == end) {
      noLoop();
      console.log("done");
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
    console.log("no route");
    return;
  }
}
function draw() {
  background(0);
  if (isRunning) {
    if (algorithm === "a*") {
      aStar();
    } else if(algorithm === 'dijktras') {
      dijkstras();
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].show(color(255));
      }
    }
    for (let i = 0; i < openSet.length; i++) {
      openSet[i].show(color(100, 100, 255));
    }
    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(200, 100, 255));
    }

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    for (let i = 0; i < path.length; i++) {
      path[i].show(color(255, 150, 0));
    }
  } else {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].show(color(255));
      }
    }
  }

  start.show(color(255, 0, 0));
  end.show(color(0, 255, 100));
  noFill();
  stroke(255);
  strokeWeight(6);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(
      path[i].x * nodeSize + nodeSize / 2,
      path[i].y * nodeSize + nodeSize / 2
    );
  }
  endShape();
}
