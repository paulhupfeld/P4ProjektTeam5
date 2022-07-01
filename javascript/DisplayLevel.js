import { mouse, cheese, field } from "../p5setup.js";

export default class DisplayLevel {
  constructor() {}

  displayLevelElements() {
    fill(255, 255, 255);
    rect(200, 200, 100, 100);
    mouse.display();
    cheese.display();
  }
}
