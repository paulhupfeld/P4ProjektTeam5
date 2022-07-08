import * as functions from "../functions/functions.js";

export default class Cheese {
  constructor(img) {
    this.img = img;
    // this.imgSize = [100, 100];
    this.position = { x: 0, y: 0 };
    this.alredyEaten = false;
  }

  setUp(x, y) {
    this.position = { x: x, y: y };
  }

  eat() {
    this.alredyEaten = true;
  }

  display() {
    if (this.alredyEaten === false) {
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

      imageMode(CENTER);
      scale(0.033);
      image(this.img, 0, 0);

      pop();
    }
  }
}
