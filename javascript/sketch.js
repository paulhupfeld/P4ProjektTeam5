import Navigator from "./Navigator.js";

export let navigator;

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

navigator = new Navigator(socket);

function draw() {
  navigator.wsCommunicator();
  navigator.display();
}

window.draw = draw;
