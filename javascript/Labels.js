import { commandTranslations } from "../../assets/commandTranslations.js";

export default class Labels {
  constructor() {
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

    //import translations from translation.js
    if (levelSuccess) {
      text("GESCHAFFT!", 655, 300);
    } else if (levelFail) {
      text("Error", 655, 300);
    }
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
