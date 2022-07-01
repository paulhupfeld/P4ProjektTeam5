import { displayLevel } from "../p5setup.js";

export default class Navigator {
  constructor() {
    this.setUpLevel = true;
    this.currentLevel = 1;
    this.commands = ["vorwärts", "rechtsDrehen", "vorwärts", "aufsammeln"];
    this.executing = false;
    this.levelIsDone = false;
  }

  setUpLevel() {
    if (this.setUpLevel === true) {
      //display level
    }
  }

  wsCommunicator() {}

  translateIDIntoCommand() {}

  navigateCommands() {}

  display() {
    displayLevel.displayLevelElements();
  }
}
