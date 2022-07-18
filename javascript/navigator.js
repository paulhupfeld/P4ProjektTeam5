import { labels, displayLevel, mouse, cheese } from "../p5setup.js";
import * as functions from "./functions/functions.js";

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.intervalID;
    this.currentLevel = 1;
    this.setUpLevel = true;
    this.commands = [];
    this.executing = { boolean: false, command: "" };
    this.levelSuccess = false;
    this.levelFail = false;
  }

  wsListenForSignal() {
    let self = this;

    // Connection opened
    this.socket.addEventListener("open", function (event) {
      this.send("Hello From Client");
      console.log("Connected to WS Server");
    });

    // Listen for messages
    this.socket.addEventListener("message", function (event) {
      let receivedMessage = JSON.parse(event.data);

      self.commands = receivedMessage;

      self.navigateCommands();

      console.log("Received message =>", receivedMessage);
    });

    //bei Empfangen von START-SIGNAL + Array mit IDs:
    //IDS mit translateIDIntoCommands übersetzen
    //commands in array pushen
    //this.navigateCommands(); function wird gerade in sketch.js -> mouseClick ausgeführt

    //bei Empfangen von STOP-SIGNAL:
    //zeige Error-Nachricht +
    // this.reset(); setze Level zurück

    // this.commands = ["moveStraight", "turnLeft", "moveStraight", "eatCheese"];
  }

  wsSendSignal(id, color) {
    // // Send a message
    // const sendMessage = () => {
    //   this.send("Hello From Client1!");
    // };
  }

  navigateCommands() {
    console.log("navigateCommands");
    this.executing.boolean = true;
    let intervalCount = 0;
    let self = this;

    function myInterval() {
      let currentCommand = self.commands[intervalCount];
      self.executing.command = currentCommand;

      // Sende Signal mit ID & Rot/Grün über wsSendSignal() an Microcontroller - schwierig, da erst in this.moveStraightCommand() und mit delay gecheckt wird ob schritt möglich
      // commands-array mit objekten füllen: name: ..., id: ... & und überall commands[x].name abfragen //push as functions not as strings

      setTimeout(function () {
        self.executeCurrentCommand(currentCommand);
      }, 1500); //Time until mouse moves

      //After all commands were executed:
      if (++intervalCount === self.commands.length) {
        window.clearInterval(self.intervalID);

        setTimeout(function () {
          self.executing = { boolean: false, command: "" };

          if (cheese.isEaten) {
            self.levelSuccess = true;
            labels.animateExecutionFeedback = true;

            console.log("win");
          } else {
            self.levelFail = true;
            labels.animateExecutionFeedback = true;

            console.log("loose");
          }
        }, 2000);
      }
    }

    this.intervalID = setInterval(myInterval, 4000); //Time per Command
    myInterval();
  }

  executeCurrentCommand(currentCommand) {
    if (currentCommand === "moveStraight") {
      this.moveStraightCommand();
    } else if (currentCommand === "turnLeft") {
      mouse.turnLeft();
    } else if (currentCommand === "turnRight") {
      mouse.turnRight();
    } else if (currentCommand === "eatCheese") {
      mouse.eatCheese();
    }
  }

  moveStraightCommand() {
    if (functions.checkIfStepIsPossible(mouse, this.currentLevel)) {
      mouse.moveStraight();
    } else {
      this.levelFail = true;
      mouse.moveStraightAgaintBarrier();
      window.clearInterval(this.intervalID);
      labels.animateExecutionFeedback = true;

      console.log("loose");
    }
  }

  reset(nextLevel) {
    console.log("reset");

    // if (this.executing.boolean === false) {
    this.setUpLevel = true;
    this.executing.boolean = false;
    this.levelSuccess = false;
    this.levelFail = false;
    labels.imgPosition = { x: 650, y: 325, scale: 0.01 };
    clearInterval(this.intervalID);

    if (nextLevel) {
      this.currentLevel++;
    }

    //wird normalerweise durch durch wsNavigator gesetzt
    this.commands = ["moveStraight", "turnLeft", "moveStraight", "eatCheese"]; //hier weg
    // }
  }

  display() {
    clear();

    if (this.setUpLevel) {
      displayLevel.setUpLevelElements(this.currentLevel);

      this.setUpLevel = false;
    }

    displayLevel.display(this.currentLevel, this.levelSuccess, this.levelFail);
    labels.display(
      this.currentLevel,
      this.executing,
      this.levelSuccess,
      this.levelFail
    );
  }
}
