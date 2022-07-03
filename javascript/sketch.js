import Navigator from "./Navigator.js";

export let navigator;

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Received message =>", event.data);
  socket.send("Hello From Client1!");
});

// // Send a message
// const sendMessage = () => {
//   socket.send("Hello From Client1!");
// };

function draw() {
  navigator = new Navigator();

  navigator.display();
}

window.draw = draw;
