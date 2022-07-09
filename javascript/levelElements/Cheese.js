import * as functions from "../functions/functions.js";

export default class Cheese {
  constructor(img) {
    this.img = img;
    this.position = { x: 0, y: 0 };
    this.isEaten = false;
    this.isInHand = false;
  }

  setUp(x, y) {
    this.position = { x: x, y: y };
    this.isEaten = false;
    this.isInHand = false;
  }

  eat() {
    this.isEaten = true;
    this.isInHand = false;
  }

  display() {
    if (this.isEaten === false && this.isInHand === false) {
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
