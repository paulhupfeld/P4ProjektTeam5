import { levelBackground1, mouse, cheese } from "../p5setup.js";

export default class DisplayLevel {
  constructor() {
    this.currentLevel;
  }

  setUpLevelElements(currentLevel) {
    this.currentLevel = currentLevel; //import data for currentLevel from json

    mouse.setStartPosition(1, 1, "east");
    cheese.setStartPosition(3, 2);
  }

  displayLevelElements() {
    push();
    translate(0, 15);
    image(levelBackground1, 0, 0, 1280, 690);
    pop();

    mouse.display();
    cheese.display();
  }
}
