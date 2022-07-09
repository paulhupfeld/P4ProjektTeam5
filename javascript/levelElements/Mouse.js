import { cheese } from "../../p5setup.js";
import * as functions from "../functions/functions.js";

export default class Mouse {
  constructor(normalImg, dizzyImg, cheeseImg) {
    this.normalImg = normalImg;
    this.dizzyImg = dizzyImg;
    this.cheeseImg = cheeseImg;
    this.position = { x: 0, y: 0 };
    this.direction = ""; //diretions as on a map
    this.isDizzy = false;
  }

  setUp(x, y, direction) {
    this.position = { x: x, y: y };
    this.direction = direction;
  }

  moveStraight() {
    let newCoordinates = { x: this.position.x, y: this.position.y };

    //merge with simmilar function in functions.js
    if (this.direction === "north") {
      newCoordinates.y = this.position.y + 1;
    } else if (this.direction === "east") {
      newCoordinates.x = this.position.x + 1;
    } else if (this.direction === "south") {
      newCoordinates.y = this.position.y - 1;
    } else if (this.direction === "west") {
      newCoordinates.x = this.position.x - 1;
    }

    gsap.to(this.position, {
      x: newCoordinates.x,
      y: newCoordinates.y,
      duration: 1.5,
      ease: "power2.out",
    });

    if (
      newCoordinates.x === cheese.position.x &&
      newCoordinates.y === cheese.position.y
    ) {
      setTimeout(function () {
        cheese.isInHand = true;
      }, 700);
      //ruckelt!!
    } else {
      cheese.isInHand = false;
    }
  }

  moveStraightAgaintBarrier() {
    let newCoordinates = { x: this.position.x, y: this.position.y };
    let oldCoordinates = { x: this.position.x, y: this.position.y };

    //merge with simmilar function in functions.js
    if (this.direction === "north") {
      newCoordinates.y = this.position.y + 0.2;
    } else if (this.direction === "east") {
      newCoordinates.x = this.position.x + 0.2;
    } else if (this.direction === "south") {
      newCoordinates.y = this.position.y - 0.2;
    } else if (this.direction === "west") {
      newCoordinates.x = this.position.x - 0.2;
    }

    //animation forward
    gsap.to(this.position, {
      x: newCoordinates.x,
      y: newCoordinates.y,
      duration: 0.7,
      ease: "Power4.easeInOut",
    });

    let self = this;

    //animation backward
    setTimeout(function () {
      self.isDizzy = true;

      gsap.to(self.position, {
        x: oldCoordinates.x,
        y: oldCoordinates.y,
        duration: 1.2,
        ease: "power2.out",
      });
    }, 650);
  }

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
    if (cheese.isInHand) {
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

    // let rotation = {};

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
    } else if (cheese.isInHand) {
      image(this.cheeseImg, 0, 0);
    } else {
      image(this.normalImg, 0, 0);
    }

    pop();
  }
}
