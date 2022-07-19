import { labels, displayLevel, mouse, cheese } from "../p5setup.js";
import * as functions from "./functions/functions.js";

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.intervalID;
    this.currentLevel = 1;
    this.setUpLevel = true;
    this.commands = [
      { command: "moveStraight", id: "1000" },
      { command: "turnLeft", id: "0100" },
      { command: "moveStraight", id: "0010" },
      { command: "eatCheese", id: "0001" },
    ];
    this.executing = { boolean: false, command: "" };
    this.levelSuccess = false;
    this.levelFail = false;
  }

  wsListenForSignal() {
    let self = this;

    // Connection opened
    this.socket.addEventListener("open", function () {
      this.send("Hello From Client");
      console.log("Connected to WS Server");
    });

    // Listen for messages
    this.socket.addEventListener("message", function (event) {
      let receivedMessage = JSON.parse(event.data);

      if (receivedMessage.message === "start") {
        self.commands = receivedMessage.commands;
        self.navigateCommands();
      } else if (receivedMessage.message === "error") {
        self.reset();
      }

      console.log("Received message =>", receivedMessage);
    });
  }

  wsSendSignal(message, id, color) {
    // this.socket.send(message, id, color);
    // let messageToSend = JSON.stringify(1);
    // ws.send(messageToSend);
    // var str = [0, 33];
    // let str_pretty1 = JSON.stringify(str);
    // this.socket.send(str_pretty1);

    // create a TypedArray with a size in bytes
    // const typedArray1 = new Int8Array(8);
    // typedArray1[0] = 32;
    // const typedArray2 = new Int8Array(typedArray1);
    // typedArray2[1] = 42;
    // console.log(typedArray1);
    // expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]
    // console.log(typedArray2);
    // expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]

    // var data = ["a", "b", "c", "d"];
    // let startMessage = JSON.stringify(data);

    let data = { message: "enlight", id: "0100", color: "1" };
    let stringifyedData = JSON.stringify(data);

    // console.log(message, id, color);

    this.socket.send(data);
  }

  navigateCommands() {
    this.executing.boolean = true;
    let intervalCount = 0;
    let self = this;

    function myInterval() {
      let currentCommand = self.commands[intervalCount].command;
      self.executing.command = currentCommand;
      let currentID = self.commands[intervalCount].id;
      let colorToLight;

      //check in which color led should light
      if (
        currentCommand === "moveStraight" &&
        functions.checkIfStepIsPossible(mouse, self.currentLevel) === false
      ) {
        colorToLight = 0; //red = 0, green = 1
      } else {
        colorToLight = 1;
      }

      self.wsSendSignal("enlight", currentID, colorToLight);
      // console.log("enlight", currentID, colorToLight);

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
            //self.wsSendSignal("enlightFinalLed", currentID, 1);

            console.log("win");
          } else {
            self.levelFail = true;
            labels.animateExecutionFeedback = true;
            //self.wsSendSignal("enlightFinalLed", currentID, 1);

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
      setTimeout(function () {
        this.levelFail = true;
        mouse.moveStraightAgaintBarrier();
        window.clearInterval(this.intervalID);
        labels.animateExecutionFeedback = true;
      }, 2000);

      console.log("loose");
    }
  }

  reset(nextLevel) {
    console.log("reset");

    this.setUpLevel = true;
    this.executing.boolean = false;
    this.levelSuccess = false;
    this.levelFail = false;
    labels.imgPosition = { x: 650, y: 325, scale: 0.01 };
    clearInterval(this.intervalID);

    if (nextLevel) {
      this.currentLevel++;
    }
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
