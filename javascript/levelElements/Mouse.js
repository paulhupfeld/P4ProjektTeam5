import * as functions from "../functions/functions.js";

export default class Mouse {
  constructor(img) {
    this.img = img;
    this.position = { x: 0, y: 0 };
    this.direction = ""; //diretions as on a map
  }

  setUp(x, y, direction) {
    this.position = { x: x, y: y };
    this.direction = direction;
  }

  moveStraight() {
    let newCoordinate;

    //merge with simmilar function in functions.js
    //anmimation as function??
    if (this.direction === "north") {
      newCoordinate = this.position.y + 1;

      gsap.to(this.position, {
        y: newCoordinate,
        duration: 1.5,
        ease: "power2.out",
      });
    } else if (this.direction === "east") {
      newCoordinate = this.position.x + 1;

      gsap.to(this.position, {
        x: newCoordinate,
        duration: 1.5,
        ease: "power2.out",
      });
    } else if (this.direction === "south") {
      newCoordinate = this.position.y - 1;

      gsap.to(this.position, {
        y: newCoordinate,
        duration: 1.5,
        ease: "power2.out",
      });
    } else if (this.direction === "west") {
      newCoordinate = this.position.x - 1;

      gsap.to(this.position, {
        x: newCoordinate,
        duration: 1.5,
        ease: "power2.out",
      });
    }
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

    if (this.direction === "north") {
      rotate((PI / 180) * 0);
    } else if (this.direction === "east") {
      rotate((PI / 180) * 90);
    } else if (this.direction === "south") {
      rotate((PI / 180) * 180);
    } else if (this.direction === "west") {
      rotate((PI / 180) * 270);
    }

    imageMode(CENTER);
    scale(0.033);
    image(this.img, 0, 0);

    pop();
  }
}