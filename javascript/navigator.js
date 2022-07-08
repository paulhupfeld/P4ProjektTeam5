import { displayLevel, mouse, cheese } from "../p5setup.js";
import * as functions from "./functions/functions.js";

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.currentLevel = 1;
    this.setUpLevel = true;
    // this.commands = ["vorwärts", "rechtsDrehen", "vorwärts", "aufsammeln"];
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
    //push functions into array
    let commands = ["moveStaight", "turnLeft", "moveStaight", "eatCheese"];

    var intervalCount = 0;
    var self = this;

    var intervalID = setInterval(function () {
      if (commands[intervalCount] === "moveStaight") {
        self.moveStaightCommand();
      } else if (commands[intervalCount] === "turnLeft") {
        mouse.turnLeft();
      } else if (commands[intervalCount] === "turnRight") {
        mouse.turnRight();
      } else if (commands[intervalCount] === "eatCheese") {
        mouse.eatCheese();
      }

      if (++intervalCount === commands.length) {
        window.clearInterval(intervalID);

        if (cheese.isEaten) {
          this.levelSuccess = true;
          console.log("win");
        } else {
          this.levelFail = true;
          console.log("loose");
        }
      }
    }, 1500);
  }

  moveStaightCommand() {
    if (functions.checkIfStepIsPossible(mouse, this.currentLevel)) {
      mouse.moveStraight();
    } else {
      this.levelFail = true;
      window.clearInterval(intervalID);
      console.log("clearinterval");
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
