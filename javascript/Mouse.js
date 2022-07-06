export default class Mouse {
  constructor(img) {
    this.img = img;
    this.imgSize = [100, 100];
    this.position = [0, 0];
    this.direction = "north"; //diretions as on a map
  }

  setStartPosition(x, y, direction) {
    this.position = [x, y];
    this.direction = direction;
  }

  checkIfStepIsSuccessfull() {}

  moveMouse() {}

  checkIfLevelIsDone() {}

  display() {
    push();

    translate(this.position[0], this.position[1]);

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
