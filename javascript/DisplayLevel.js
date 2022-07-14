import { levelContent } from "../../assets/levelContent.js";
import { mausylinth1 } from "../p5setup.js";
import { mouse, cheese } from "../p5setup.js";

export default class DisplayLevel {
  constructor() {}

  setUpLevelElements(currentLevel) {
    let mouseStartPosition = levelContent[currentLevel].mouseStartPosition;
    let mouseStartDirection = levelContent[currentLevel].mouseStartDirection;
    let cheesePosition = levelContent[currentLevel].cheesePosition;

    mouse.setUp(
      mouseStartPosition.x,
      mouseStartPosition.y,
      mouseStartDirection
    );
    cheese.setUp(cheesePosition.x, cheesePosition.y);
  }

  display(currentLevel, levelSuccess, levelFail) {
    // let backgroundImg = new Image();
    // backgroundImg.src = "levelContent[currentLevel].background";
    // let backgroundImg = levelContent[currentLevel].background;
    // console.log(backgroundImg); //ncaught TypeError: CanvasRenderingContext2D.drawImage: Argument 1 could not be converted to any of

    push();
    translate(0, 15);
    image(mausylinth1, 0, 0, 1280, 690);
    pop();

    cheese.display();
    mouse.display();

    //zu rechenintensiv:
    // if (levelSuccess || levelFail) {
    //   filter(BLUR, 3);
    // }
  }
}
