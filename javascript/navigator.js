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

  wsCommunicator() {
    // Connection opened
    this.socket.addEventListener("open", function (event) {
      this.send("Hello From Client1!");
      console.log("Connected to WS Server");
    });

    // Listen for messages
    this.socket.addEventListener("message", function (event) {
      console.log("Received message =>", event.data);
    });

    // // Send a message
    // const sendMessage = () => {
    //   this.send("Hello From Client1!");
    // };

    //wenn startsignal erhalten:

    //in translateIDIntoCommands
    //push functions into array
    // this.commands = ["moveStraight", "turnLeft", "moveStraight", "eatCheese"];

    this.commands = ["moveStraight", "turnLeft", "moveStraight", "eatCheese"];

    // this.navigateCommands();
  }

  navigateCommands() {
    this.executing.boolean = true;
    let intervalCount = 0;
    let self = this;

    //Interval muss am Anfang einmal ausgeführt werden, deswegen werden die ersten 4 sek programm startet angezeigt

    this.intervalID = setInterval(function () {
      let currentCommand = self.commands[intervalCount];
      self.executing.command = currentCommand;

      setTimeout(function () {
        self.executeCurrentCommand(currentCommand);
      }, 1600); //Time until mouse moves

      //Am Ende:
      if (++intervalCount === self.commands.length) {
        window.clearInterval(self.intervalID);

        setTimeout(function () {
          self.executing = { boolean: false, command: "" };

          if (cheese.isEaten) {
            self.levelSuccess = true;
            console.log("win");
          } else {
            self.levelFail = true;
            console.log("loose");
          }
        }, 2000);
      }
    }, 4000); //Time per Command
  }

  executeCurrentCommand(currentCommand) {
    console.log(currentCommand);

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
      console.log("loose");
    }
  }

  reset() {
    if (this.executing.boolean === false) {
      this.setUpLevel = true;
      this.commands = ["moveStraight", "turnLeft", "moveStraight", "eatCheese"];
      this.executing.boolean = false;
      this.levelSuccess = false;
      this.levelFail = false;
    }
  }

  display() {
    clear();

    if (this.setUpLevel) {
      displayLevel.setUpLevelElements(this.currentLevel);

      this.setUpLevel = false;
    }

    displayLevel.display(this.currentLevel);
    labels.display(
      this.currentLevel,
      this.executing,
      this.levelSuccess,
      this.levelFail
    );
  }
}
