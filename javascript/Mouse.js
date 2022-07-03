export default class Mouse {
  constructor() {
    // img = MouseImage;
    this.startPosition;
    this.position = 0;
    this.direction = "north"; //diretions as on a map
  }

  setStartPosition() {}

  checkIfStepIsSuccessfull() {}

  moveMouse() {}

  checkIfLevelIsDone() {}

  display() {
    fill(0, 0, 0);
    circle(200, 300, 100, 100);
  }
}
