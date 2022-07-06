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
    // this.rectPosition = { x: 100, y: 100 };
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

      mouse.moveMouseStraight(500, 500);

      this.setUpLevel = false;

      // gsap.to(this.rectPosition, {
      //   x: 350,
      //   ease: "power4.out",
      // });
    }

    displayLevel.displayLevelElements();
  }
}
