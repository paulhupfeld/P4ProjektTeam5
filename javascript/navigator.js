import { displayLevel, mouse } from "../p5setup.js";

// & translateIDIntoCommand

export default class Navigator {
  constructor(socket) {
    this.socket = socket;
    this.currentLevel = 1;
    this.setUpLevel = true;
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

  navigateCommands() {}

  display() {
    clear();

    if (this.setUpLevel) {
      displayLevel.setUpLevelElements(this.currentLevel);

      this.setUpLevel = false;

      mouse.moveStraight();
    }

    displayLevel.displayLevelElements();
  }
}
