import Navigator from "./Navigator.js";

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

export let navigator;
navigator = new Navigator(socket);

navigator.wsCommunicator();

function draw() {
  navigator.display();
}

//theoretisch nötig zur Levelauswahl
function mouseClicked() {
  //automatisch nach 10sek win/loose screen
  navigator.reset();

  //eigentlich beim drücken des startknopfs
  navigator.navigateCommands();
}

window.draw = draw;
window.mouseClicked = mouseClicked;
