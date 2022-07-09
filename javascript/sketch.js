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
  // navigator.checkMouseClicks();
}

window.draw = draw;
window.mouseClicked = mouseClicked;
