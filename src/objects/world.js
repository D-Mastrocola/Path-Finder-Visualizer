class World {
  constructor(width, height, gridSize) {
    this.width = width / gridSize;
    this.height = height / gridSize;
    this.gridSize = gridSize;
    this.worldArray = [];

    this.endPos = {
      x: 30,
      y: 13,
    };
    this.init();
  }
  init() {
    for (let i = 0; i < this.width; i++) {
      this.worldArray.push([]);
      for (let j = 0; j < this.height; j++) {
        this.worldArray[i].push("0");
      }
    }

    console.log(this.worldArray);
  }
  addBlock(x, y, startNode, endNode) {
    let pos = {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize),
    };
    if(pos.x === startNode.pos.x && pos.y === startNode.pos.y) {
      startNode.selected = true;
    } else if(pos.x === endNode.pos.x && pos.y === endNode.pos.y) {
      endNode.selected = true;
    }else {
      this.worldArray[pos.x][pos.y] = "W";
    }
  }
  setEnd(x, y, endNode) {
    let pos = {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize),
    };
    this.worldArray[pos.x][pos.y] = "=";
    this.worldArray[endNode.x][endNode.y] = "0";
  }
  setStart(x, y, startNode) {
    let pos = {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize),
    };
    this.worldArray[pos.x][pos.y] = "+";
    this.worldArray[startNode.x][startNode.y] = "0";
  }
  show() {
    stroke(200);
    strokeWeight(1);
    for (let x = 0; x < this.worldArray.length; x++) {
      for (let y = 0; y < this.worldArray[x].length; y++) {
        if (this.worldArray[x][y] === "0") {
          fill(255);
          rect(
            x * this.gridSize,
            y * this.gridSize,
            this.gridSize,
            this.gridSize
          );
        } else if (this.worldArray[x][y] === "W") {
          fill(0, 130);
          rect(
            x * this.gridSize,
            y * this.gridSize,
            this.gridSize,
            this.gridSize
          );
        }
      }
    }
    /*//Draw Grid
    for (let x = 0; x <= this.worldArray.length; x++) {
      line(0, x * gridSize, width, x * gridSize);
    }
    for (let y = 0; y <= this.worldArray.length; y++) {
      line(y * gridSize, 0, y * gridSize, height);
    }*/
  }
}
