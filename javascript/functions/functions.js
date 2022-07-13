import { levelContent } from "../../assets/levelContent.js";
import { commandTranslations } from "../../assets/commandTranslations.js";

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

export function translateDirectionIntoRotation(direction) {
  let rotation;

  if (direction === "north") {
    rotation = 0;
  } else if (direction === "east") {
    rotation = 90;
  } else if (direction === "south") {
    rotation = 180;
  } else if (direction === "west") {
    rotation = 270;
  }

  return rotation;
}

export function checkIfStepIsPossible(mouse, currentLevel) {
  let newCoordinate;
  let newPosition;

  //merge with simmilar function in Mouse.js
  if (mouse.direction.name === "north") {
    newCoordinate = mouse.position.y + 1;
    newPosition = { x: mouse.position.x, y: newCoordinate };
  } else if (mouse.direction.name === "east") {
    newCoordinate = mouse.position.x + 1;
    newPosition = { x: newCoordinate, y: mouse.position.y };
  } else if (mouse.direction.name === "south") {
    newCoordinate = mouse.position.y - 1;
    newPosition = { x: mouse.position.x, y: newCoordinate };
  } else if (mouse.direction.name === "west") {
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

export function returnTranslation(language) {
  // commandTranslations.map((language) => {
  //   if (language === language) {
  //     console.log(language);
  //   }
  // });
  // commandTranslations[currentLevel].fields.map((field) => {
  //   if (field.x === newPosition.x && field.y === newPosition.y) {
  //     nextStepIsPossible = true;
  //   }
  // });
  // console.log(commandTranslations.language.find((e) => e == "german"));
  // if (this.language != "english") {
  //   commandTranslations[this.language].fields.map((field) => {
  //     if (field.x === newPosition.x && field.y === newPosition.y) {
  //       nextStepIsPossible = true;
  //     }
  //   });
  // }
}
