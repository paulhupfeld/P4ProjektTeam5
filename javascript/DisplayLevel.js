import { levelBackground1, mouse, cheese, field } from "../p5setup.js";

export default class DisplayLevel {
  constructor() {
    // this.boardHight = 3;
    // this.boardWeight = 4;
  }

  setUpLevelElements(currentLevel) {
    //import data for currentLevel from json

    mouse.setStartPosition(200, 200, "north");

    console.log(100);
  }

  displayLevelElements() {
    image(levelBackground1, 0, 0);
    // for (let i = 1; i <= this.boardHight; i++) {
    //   rect(100, 100 * i, 100, 100);
    // }
    mouse.display();
    //   cheese.display();
  }
}
