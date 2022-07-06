export function translateIDIntoCommand() {}

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

let boardHight = 3; //import data for currentLevel from json
let boardWeight = 4; //import data for currentLevel from json

export function checkIfStepIsPossible(x, y) {
  if (x <= boardWeight && x > 0 && y <= boardHight && y > 0) {
    console.log("true");
    // console.log("y: " + y + ", boardHight: " + boardHight);
    // console.log("x: " + x + ", boardWeight: " + boardWeight);

    return true;
  } else {
    console.log("false");
    // console.log("y: " + y + ", boardHight: " + boardHight);
    // console.log("x: " + x + ", boardWeight: " + boardWeight);

    return false;
  }
}
