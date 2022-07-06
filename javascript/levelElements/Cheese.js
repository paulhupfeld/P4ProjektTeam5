export default class Cheese {
  constructor() {
    // this.img = img;
    // this.imgSize = [100, 100];
    this.position = [0, 0];
  }

  setStartPosition(x, y) {
    this.position = [x, y];
  }

  display() {
    push();

    translate(this.position[0], this.position[1]);

    // imageMode(CENTER);
    // image(this.img, 0, 0, this.imgSize[0], this.imgSize[1]);

    rect(0, 0, 50, 50);
    pop();
  }
}
