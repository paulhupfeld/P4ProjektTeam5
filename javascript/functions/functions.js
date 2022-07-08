import { levelContent } from "../../assets/levelContent.js";

export function translateIDIntoCommands() {}

export function translateFieldNumberIntoCoordinates(fieldX, fieldY) {
  //import data for currentLevel from json
  let centerOfField11 = [448.5, 536];
  let distanceToNextField = [137, 132];

  let XToReturn = centerOfField11[0] + distanceToNextField[0] * (fieldX - 1);

  let YToReturn = centerOfField11[1] - distanceToNextField[1] * (fieldY - 1);

  // console.log(XToReturn + ", " + YToReturn);
  // let coordinatesToReturn = XToReturn + ", " + YToReturn;
  // return coordinatesToReturn;

  return [XToReturn, YToReturn];
}

export function checkIfStepIsPossible(mouse, currentLevel) {
  let newCoordinate;
  let newPosition;

  //merge with simmilar function in Mouse.js
  if (mouse.direction === "north") {
    newCoordinate = mouse.position.y + 1;
    newPosition = { x: mouse.position.x, y: newCoordinate };
  } else if (mouse.direction === "east") {
    newCoordinate = mouse.position.x + 1;
    newPosition = { x: newCoordinate, y: mouse.position.y };
  } else if (mouse.direction === "south") {
    newCoordinate = mouse.position.y - 1;
    newPosition = { x: mouse.position.x, y: newCoordinate };
  } else if (mouse.direction === "west") {
    newCoordinate = mouse.position.x - 1;
    newPosition = { x: newCoordinate, y: mouse.position.y };
  }

  let nextStepIsPossible = false;

  levelContent[currentLevel].fields.map((field) => {
    if (field.x === newPosition.x && field.y === newPosition.y) {
      nextStepIsPossible = true;
    }
  });

  if (nextStepIsPossible) {
    return true;
  }
}
