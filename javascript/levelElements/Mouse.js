import { cheese } from "../../p5setup.js";
import * as functions from "../functions/functions.js";

export default class Mouse {
  constructor(normalImg, dizzyImg, cheeseImg) {
    this.normalImg = normalImg;
    this.dizzyImg = dizzyImg;
    this.cheeseImg = cheeseImg;
    this.position = { x: 0, y: 0 };
    this.direction = { name: "", rotation: 0 }; //direction.name as on a map
    this.isDizzy = false;
  }

  setUp(x, y, direction) {
    this.position = { x: x, y: y };
    this.direction = {
      name: direction,
      rotation: functions.translateDirectionIntoRotation(direction),
    };
    this.isDizzy = false;
  }

  moveStraight() {
    let newCoordinates = { x: this.position.x, y: this.position.y };

    //merge with simmilar function in functions.js
    if (this.direction.name === "north") {
      newCoordinates.y = this.position.y + 1;
    } else if (this.direction.name === "east") {
      newCoordinates.x = this.position.x + 1;
    } else if (this.direction.name === "south") {
      newCoordinates.y = this.position.y - 1;
    } else if (this.direction.name === "west") {
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
    if (this.direction.name === "north") {
      newCoordinates.y = this.position.y + 0.2;
    } else if (this.direction.name === "east") {
      newCoordinates.x = this.position.x + 0.2;
    } else if (this.direction.name === "south") {
      newCoordinates.y = this.position.y - 0.2;
    } else if (this.direction.name === "west") {
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
    if (this.direction.name === "north") {
      this.direction.name = "west";
    } else if (this.direction.name === "east") {
      this.direction.name = "north";
    } else if (this.direction.name === "south") {
      this.direction.name = "east";
    } else if (this.direction.name === "west") {
      this.direction.name = "south";
    }

    //prevents bug
    if (this.direction.name === "west") {
      this.direction.rotation = 360;
    }

    let newRotation = functions.translateDirectionIntoRotation(
      this.direction.name
    );

    gsap.to(this.direction, {
      rotation: newRotation,
      duration: 1,
      ease: "Power2.easeInOut",
    });
  }

  turnRight() {
    if (this.direction.name === "north") {
      this.direction.name = "east";
    } else if (this.direction.name === "east") {
      this.direction.name = "south";
    } else if (this.direction.name === "south") {
      this.direction.name = "west";
    } else if (this.direction.name === "west") {
      this.direction.name = "north";
    }

    //prevents bug
    if (this.direction.name === "north") {
      this.direction.rotation = -90;
    }

    let newRotation = functions.translateDirectionIntoRotation(
      this.direction.name
    );

    gsap.to(this.direction, {
      rotation: newRotation,
      duration: 1,
      ease: "Power2.easeInOut",
    });
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

    rotate((PI / 180) * this.direction.rotation);

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
