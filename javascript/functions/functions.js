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

export function translateIDIntoCommand() {}
