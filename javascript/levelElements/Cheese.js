import * as functions from "../functions/functions.js";

export default class Cheese {
  constructor() {
    // this.img = img;
    // this.imgSize = [100, 100];
    this.position = { x: 0, y: 0 };
    // this.alredyEaten = false;
  }

  setUp(x, y) {
    this.position = { x: x, y: y };
  }

  display() {
    push();

    translate(
      functions.translateFieldNumberIntoCoordinates(
        this.position.x,
        this.position.y
      )[0],
      functions.translateFieldNumberIntoCoordinates(
        this.position.x,
        this.position.y
      )[1]
    );
    // imageMode(CENTER);
    // image(this.img, 0, 0, this.imgSize[0], this.imgSize[1]);

    rect(0, 0, 50, 50);
    pop();
  }
}
