export default class Mouse {
  constructor(img) {
    this.img = img;
    this.imgSize = [100, 100];
    this.position = { x: 0, y: 0 };
    this.direction = "north"; //diretions as on a map
  }

  setStartPosition(x, y, direction) {
    this.position = { x: x, y: y };
    this.direction = direction;
  }

  checkIfStepIsSuccessfull() {}

  moveStraight() {
    if (this.direction === "north") {
      this.position.x++;
    } else if (this.direction === "east") {
      this.position.y--;
    } else if (this.direction === "south") {
      this.position.x--;
    } else if (this.direction === "west") {
      this.position.y++;
    }

    console.log(this.position);

    // gsap.to(this.position[0], {
    //   x: x,
    //   ease: "power4.out",
    // });
  }

  checkIfLevelIsDone() {}

  display() {
    push();

    translate(this.position.x, this.position.y);

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
    image(this.img, 0, 0, this.imgSize[0], this.imgSize[1]);

    pop();
  }
}
