let startNode;
let endNode;
let gridSize = 30;
let gridWidth = Math.floor(window.innerWidth / gridSize) * gridSize;
let gridHeight = Math.floor(window.innerHeight / gridSize) * gridSize;

let world = new World(gridWidth, gridHeight, gridSize);

function setup() {
  startNode = new Start(10, 13, gridSize);
  endNode = new End(40, 13, gridSize);
  createCanvas(gridWidth, gridHeight);
}
function mousePressed() {
  if (mouseY > 0) {
    world.addBlock(mouseX, mouseY,startNode, endNode);
  }
}
function mouseDragged() {
  if (mouseY > 0) {
    world.addBlock(mouseX, mouseY, startNode, endNode);
  }
}
function draw() {
  background(255);
  strokeWeight(2);

  world.show();
  startNode.show();
  endNode.show();
}
