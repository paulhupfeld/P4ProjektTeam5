import { levelBackground1, mouse, cheese } from "../p5setup.js";
import * as functions from "./functions/functions.js";

export default class DisplayLevel {
  constructor() {
    // this.boardHight = 3;
    // this.boardWeight = 4;
    this.currentLevel;
  }

  setUpLevelElements(currentLevel) {
    //import data for currentLevel from json
    this.currentLevel = currentLevel;
    mouse.setStartPosition(
      functions.translateFieldNumberIntoCoordinates(1, 2)[0],
      functions.translateFieldNumberIntoCoordinates(1, 2)[1],
      "north"
    );

    cheese.setStartPosition(
      functions.translateFieldNumberIntoCoordinates(3, 2)[0],
      functions.translateFieldNumberIntoCoordinates(3, 2)[1]
    );
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
