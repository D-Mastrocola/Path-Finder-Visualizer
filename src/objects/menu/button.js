function Button(x, y, width, height, color, displayText) {
  this.pos = createVector(x, y);
  this.width = width;
  this.height = height;
  this.text = displayText;
  this.color = color;

  this.draw = function () {
    fill(this.color);
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.text, this.pos.x + this.width / 2, this.pos.y + this.height / 2);
  };
}
