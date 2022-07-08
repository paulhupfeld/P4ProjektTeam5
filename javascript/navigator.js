import { displayLevel, mouse, cheese } from "../p5setup.js";
import * as functions from "./functions/functions.js";

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.intervalID;
    this.currentLevel = 1;
    this.setUpLevel = true;
    this.commands = [];
    this.executing = false;
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
  }

  navigateCommands() {
    //in translateIDIntoCommands
    //push functions into array
    this.commands = ["moveStaight", "turnLeft", "moveStaight", "eatCheese"];

    let intervalCount = 0;
    let self = this;

    this.intervalID = setInterval(function () {
      if (self.commands[intervalCount] === "moveStaight") {
        self.moveStaightCommand();
      } else if (self.commands[intervalCount] === "turnLeft") {
        mouse.turnLeft();
      } else if (self.commands[intervalCount] === "turnRight") {
        mouse.turnRight();
      } else if (self.commands[intervalCount] === "eatCheese") {
        mouse.eatCheese();
      }

      if (++intervalCount === self.commands.length) {
        window.clearInterval(this.intervalID);

        setTimeout(function () {
          self.hasCheeseInItsHand = true;

          if (cheese.isEaten) {
            this.levelSuccess = true;
            console.log("win");
          } else {
            this.levelFail = true;
            console.log("loose");
          }
        }, 2000);
      }
    }, 1500);
  }

  moveStaightCommand() {
    if (functions.checkIfStepIsPossible(mouse, this.currentLevel)) {
      mouse.moveStraight();
    } else {
      this.levelFail = true;
      // mouse.moveStraightAgaintBarrier();
      window.clearInterval(this.intervalID);
      console.log("loose");
    }
  }

  display() {
    clear();

    if (this.setUpLevel) {
      displayLevel.setUpLevelElements(this.currentLevel);

      this.setUpLevel = false;

      // this.moveStaightCommand();

      this.navigateCommands();
    }

    displayLevel.displayLevelElements(this.currentLevel);
  }
}
