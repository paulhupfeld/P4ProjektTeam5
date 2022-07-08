import { mausylinth1 } from "../p5setup.js";
import { mouse, cheese } from "../p5setup.js";
import { levelContent } from "../assets/levelContent.js";

export default class DisplayLevel {
  constructor() {}

  setUpLevelElements(currentLevel) {
    //import data for currentLevel from json

    mouse.setStartPosition(1, 1, "north");
    cheese.setStartPosition(3, 2);
  }

  displayLevelElements() {
    push();
    translate(0, 15);
    image(mausylinth1, 0, 0, 1280, 690); //from current data
    pop();

    mouse.display();
    cheese.display();
  }
}
