import { commandTranslations } from "../../assets/commandTranslations.js";
import { winScreenImg, looseScreenImg } from "../p5setup.js";

export default class Labels {
  constructor(winScreen, looseScreen) {
    this.winScreenImg = winScreenImg;
    this.looseScreenImg = looseScreenImg;
    this.language = "german";
    this.animateExecutionFeedback = false;
    this.img;
    this.imgPosition = { x: 650, y: 325, scale: 0.01 };
    this.newImgPosition;
  }

  labelCurrentLevelNumber(currentLevel) {
    textSize(40);

    text("Level " + currentLevel, 640, 57);
  }

  labelLevelSelector(currentLevel) {
    textSize(17);

    //import translation from translations.js
    text("Levelauswahl", 285, 62);
  }

  labelCurrentCommand(executing, levelSuccess, levelFail) {
    textSize(18);

    let textToLabel;

    //import translations from translations.js
    if (executing.boolean && executing.command === "") {
      textToLabel = "Programm startet...";
    } else if (executing.boolean) {
      textToLabel = "Führt aus: " + executing.command; //!!!
    } else if (levelSuccess) {
      textToLabel = "GESCHAFFT!";
    } else if (levelFail) {
      textToLabel = "Error";
    } else {
      textToLabel =
        "Füge das Endstück hinzu und drücke den Start-Knopf, um das Programm auszuführen";
    }

    text(textToLabel, 640, 665);
  }

  labelExecutionFeedback(levelSuccess, levelFail) {
    if (this.animateExecutionFeedback) {
      if (levelSuccess) {
        this.img = this.winScreenImg;
        this.newImgPosition = { x: 655, y: 325, scale: 0.2 };
      } else if (levelFail) {
        this.img = this.looseScreenImg;
        this.newImgPosition = { x: 640, y: 330, scale: 0.23 };
      }

      gsap.to(this.imgPosition, {
        x: this.newImgPosition.x,
        y: this.newImgPosition.y,
        scale: this.newImgPosition.scale,
        duration: 0.5,
        ease: "easeOut.config( 1, 0.3)",
      });
    }

    push();
    imageMode(CENTER, CENTER);

    translate(this.imgPosition.x, this.imgPosition.y);
    scale(this.imgPosition.scale);
    image(this.img, 0, 0);

    pop();

    this.animateExecutionFeedback = false;
  }

  display(currentLevel, executing, levelSuccess, levelFail) {
    push();

    textAlign(CENTER, CENTER);
    fill(0, 0, 0);

    this.labelCurrentLevelNumber(currentLevel);
    this.labelLevelSelector(currentLevel);
    this.labelCurrentCommand(executing, levelSuccess, levelFail);

    if (levelSuccess || levelFail) {
      this.labelExecutionFeedback(levelSuccess, levelFail);
    }

    pop();
  }
}
