const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });

wss.on("connection", (ws) => {
  console.log("A new client connected");
  ws.send("hello new client");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
});

// app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3000, () => console.log(`Listening on port: 3000`));

// const { Board, Led } = require("johnny-five");
// const board = new Board();

// board.on("ready", () => {
//   // Create an Led on pin 13
//   const led = new Led(13);
//   // Blink every half second
//   led.blink(500);
// });
