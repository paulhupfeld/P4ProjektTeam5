import {
  theaterBackgroundImage,
  levelBackground1,
  mouse,
  cheese,
} from "../p5setup.js";

export default class DisplayLevel {
  constructor() {
    // this.boardHight = 3;
    // this.boardWeight = 4;
    this.coordinates = [1, 1];
    this.currentLevel;
  }

  setUpLevelElements(currentLevel) {
    //import data for currentLevel from json
    this.currentLevel = currentLevel;
    mouse.setStartPosition(
      this.returnCoordinates([2, 3])[0],
      this.returnCoordinates([2, 3])[1],
      "north"
    );
    cheese.setStartPosition(
      this.returnCoordinates([3, 2])[0],
      this.returnCoordinates([3, 2])[1]
    );
  }

  //move to Navigator
  returnCoordinates(coordinates) {
    //import data for currentLevel from json
    let centerOfField11 = [448.5, 272];
    let distanceToNextField = [137, 132];

    let XToReturn =
      centerOfField11[0] + distanceToNextField[0] * (coordinates[0] - 1);

    let YToReturn =
      centerOfField11[1] + distanceToNextField[1] * (coordinates[1] - 1);

    // console.log(XToReturn + ", " + YToReturn);
    // let coordinatesToReturn = XToReturn + ", " + YToReturn;
    // return coordinatesToReturn;

    return [XToReturn, YToReturn];
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
