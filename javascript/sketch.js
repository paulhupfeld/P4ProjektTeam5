import Navigator from "./Navigator.js";

export let navigator;

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

navigator = new Navigator(socket);

navigator.wsCommunicator();

function draw() {
  navigator.display();
}

function mouseClicked() {
  //automatisch nach 10sek win/loose screen
  navigator.reset();

  //eigentlich beim drücken des startknopfs
  navigator.navigateCommands();

  //theoretisch nötig zur Levelauswahl
}

window.draw = draw;
window.mouseClicked = mouseClicked;
