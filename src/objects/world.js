class World {
  constructor(width, height, gridSize) {
    this.width = width / gridSize;
    this.height = height / gridSize;
    this.gridSize = gridSize;
    this.worldArray = [];
    this.startPos = {
      x: 10,
      y: 13,
    };
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
        if (i === this.startPos.x && j === this.startPos.y) {
          this.worldArray[i].push("+");
        } else if (i === this.endPos.x && j === this.endPos.y) {
          this.worldArray[i].push("=");
        } else {
          this.worldArray[i].push("0");
        }
      }
    }

    console.log(this.worldArray);
  }
  addBlock(x, y, block) {
    if (block === "0") {
        let pos = {
          x: Math.floor(x / this.gridSize),
          y: Math.floor(y / this.gridSize),
        };
        this.worldArray[pos.x][pos.y] = "0";
      }
    if (block === "+") this.setStart(x, y);
    if (block === "=") this.setEnd(x, y);
    if (block === "W") {
      let pos = {
        x: Math.floor(x / this.gridSize),
        y: Math.floor(y / this.gridSize),
      };
      this.worldArray[pos.x][pos.y] = "W";
    }
  }
  setEnd(x, y) {
    let pos = {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize),
    };
    this.worldArray[this.endPos.x][this.endPos.y] = "0";
    this.endPos = {
      x: pos.x,
      y: pos.y,
    };
    this.worldArray[pos.x][pos.y] = "=";
  }
  setStart(x, y) {
    let pos = {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize),
    };
    this.worldArray[this.startPos.x][this.startPos.y] = "0";
    this.startPos = {
      x: pos.x,
      y: pos.y,
    };
    this.worldArray[pos.x][pos.y] = "+";
  }
  show() {
    stroke(0);
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
          fill(0);
          rect(
            x * this.gridSize,
            y * this.gridSize,
            this.gridSize,
            this.gridSize
          );
        } else if (this.worldArray[x][y] === "+") {
          fill(100, 100, 255);
          rect(
            x * this.gridSize,
            y * this.gridSize,
            this.gridSize,
            this.gridSize
          );
        } else if (this.worldArray[x][y] === "=") {
          fill(255, 20, 20);
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
