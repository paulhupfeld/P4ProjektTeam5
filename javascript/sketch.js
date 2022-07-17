import Navigator from "./Navigator.js";

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

export let navigator;
navigator = new Navigator(socket);

navigator.wsListenForSignal();

function draw() {
  navigator.display();
}

function mouseClicked() {
  //eigentlich beim drücken des startknopfs

  if (
    navigator.levelSuccess === false &&
    navigator.levelFail === false &&
    navigator.executing.boolean === false
  ) {
    navigator.navigateCommands();
  } else if (
    navigator.executing.boolean ||
    (navigator.levelSuccess &&
      mouseX >= 572 &&
      mouseX <= 622 &&
      mouseY >= 491 &&
      mouseY <= 541) ||
    (navigator.levelFail &&
      mouseX >= 615 &&
      mouseX <= 665 &&
      mouseY >= 485 &&
      mouseY <= 535)
  ) {
    navigator.reset();
  }
}

window.draw = draw;
window.mouseClicked = mouseClicked;
