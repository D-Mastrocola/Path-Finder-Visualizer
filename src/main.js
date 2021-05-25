
let gridSize = 30;
let block = '+';
let gridWidth = Math.floor(window.innerWidth/gridSize) * gridSize;
let gridHeight = Math.floor((window.innerHeight - document.getElementById('selection-header').offsetHeight)/gridSize) * gridSize;

let world = new World(gridWidth, gridHeight, gridSize);

function setup() {
  createCanvas(gridWidth, gridHeight);
}
function mousePressed() {
  if(mouseY > 0) {
    world.addBlock(mouseX, mouseY, block)
  }
}
function mouseDragged() {
  if(mouseY > 0) {
    world.addBlock(mouseX, mouseY, block)
  }
}

document.getElementById("start-select").addEventListener("click", () => {
  block = '+'
});
document.getElementById("end-select").addEventListener("click", () => {
  block = '='
});
document.getElementById("wall-select").addEventListener("click", () => {
  block = 'W'
});
document.getElementById("eraser-select").addEventListener("click", () => {
  block = '0'
});

function draw() {
  strokeWeight(2)
  background(255);
  world.show();
}
