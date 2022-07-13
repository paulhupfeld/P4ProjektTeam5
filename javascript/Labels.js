import { commandTranslations } from "../../assets/commandTranslations.js";
import { winScreenImg, looseScreenImg } from "../p5setup.js";

export default class Labels {
  constructor(winScreen, looseScreen) {
    this.winScreenImg = winScreenImg;
    this.looseScreenImg = looseScreenImg;
    this.language = "german";
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
    textSize(100);

    push();
    imageMode(CENTER, CENTER);

    if (levelSuccess) {
      translate(655, 325);
      scale(0.2);
      image(this.winScreenImg, 0, 0);
    } else if (levelFail) {
      translate(640, 330);
      scale(0.23);
      image(this.looseScreenImg, 0, 0);
    }

    pop();
  }

  display(currentLevel, executing, levelSuccess, levelFail) {
    push();

    textAlign(CENTER, CENTER);
    fill(0, 0, 0);

    this.labelCurrentLevelNumber(currentLevel);
    this.labelLevelSelector(currentLevel);
    this.labelCurrentCommand(executing, levelSuccess, levelFail);
    this.labelExecutionFeedback(levelSuccess, levelFail);

    pop();
  }
}
