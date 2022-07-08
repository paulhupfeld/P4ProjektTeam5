import { cheese } from "../../p5setup.js";
import * as functions from "../functions/functions.js";

export default class Mouse {
  constructor(normalImg, dizzyImg) {
    this.normalImg = normalImg;
    this.dizzyImg = dizzyImg;
    this.position = { x: 0, y: 0 };
    this.direction = ""; //diretions as on a map
    this.isDizzy = false;
    this.hasCheeseInItsHand = false;
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

  moveStraightAgaintBarrier() {}

  turnLeft() {
    if (this.direction === "north") {
      this.direction = "west";
    } else if (this.direction === "east") {
      this.direction = "north";
    } else if (this.direction === "south") {
      this.direction = "east";
    } else if (this.direction === "west") {
      this.direction = "south";
    }
  }

  turnRight() {
    if (this.direction === "north") {
      this.direction = "east";
    } else if (this.direction === "east") {
      this.direction = "south";
    } else if (this.direction === "south") {
      this.direction = "west";
    } else if (this.direction === "west") {
      this.direction = "north";
    }
  }

  eatCheese() {
    if (
      this.position.x === cheese.position.x &&
      this.position.y === cheese.position.y
    ) {
      cheese.eat();
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

    if (this.isDizzy) {
      image(this.dizzyImg, 0, 0);
    } else {
      image(this.normalImg, 0, 0);
    }
    //else if     this.hasCheeseInItsHand

    pop();
  }
}
