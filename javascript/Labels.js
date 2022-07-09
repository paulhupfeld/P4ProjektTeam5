export default class Labels {
  constructor() {}

  labelCurrentLevelNumber(currentLevel) {
    textSize(40);

    text("Level " + currentLevel, 655, 60);
  }

  labelLevelSelector(currentLevel) {
    textSize(17);

    text("Levelauswahl", 285, 60);
  }

  labelCurrentCommand(executing, levelSuccess, levelFail) {
    textSize(20);

    let textToLabel;

    if (executing.boolean && executing.command === "") {
      textToLabel = "Programm startet...";
    } else if (executing.boolean) {
      textToLabel = "Führt aus: " + executing.command;
    } else if (levelSuccess) {
      textToLabel = "GESCHAFFT!";
    } else if (levelFail) {
      textToLabel = "Error";
    } else {
      textToLabel = "Drücke den Start-Knopf, um das Programm auszuführen";
    }

    text(textToLabel, 655, 670);
  }

  labelExecutionFeedback(levelSuccess, levelFail) {
    textSize(100);

    if (levelSuccess) {
      text("GESCHAFFT!", 655, 300);
    } else if (levelFail) {
      text("Error", 655, 300);
    }
  }

  display(currentLevel, executing, levelSuccess, levelFail) {
    push();

    textAlign(CENTER, CENTER);
    textFont("Georgia");
    fill(0, 0, 0);

    this.labelCurrentLevelNumber(currentLevel);
    this.labelLevelSelector(currentLevel);
    this.labelCurrentCommand(executing, levelSuccess, levelFail);
    this.labelExecutionFeedback(levelSuccess, levelFail);

    pop();
  }
}
