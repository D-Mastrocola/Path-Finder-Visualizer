class Menu {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.width = 200;
    this.height = 200;

    this.pos.x = width - this.width - 50;
    this.pos.y = height - this.height - 50;

    this.startButton = new Button(
      this.pos.x + this.width / 2 - 40,
      this.pos.y + this.height - 60,
      80,
      30,
      color(255, 0, 0),
      'Start'
    );

    this.selected = false;
  }

  draw() {
    fill("rgba(0, 0, 0, 0.6)");
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height);
    this.startButton.draw();
  }
}
