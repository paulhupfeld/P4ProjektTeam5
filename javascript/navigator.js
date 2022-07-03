import { displayLevel } from "../p5setup.js";

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.setUpLevel = true;
    this.currentLevel = 1;
    this.commands = ["vorwärts", "rechtsDrehen", "vorwärts", "aufsammeln"];
    this.executing = false;
    this.levelIsDone = false;
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

  setUpLevel() {
    if (this.setUpLevel === true) {
      //...
    }
  }

  translateIDIntoCommand() {}

  navigateCommands() {}

  display() {
    displayLevel.displayLevelElements();
  }
}
