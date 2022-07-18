//Webserver:
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

let commands = JSON.stringify([
  "moveStraight",
  "turnLeft",
  "moveStraight",
  "eatCheese",
]);

wss.on("connection", (ws) => {
  console.log("A new client connected");

  // ws.send("hellow new client");

  setTimeout(function () {
    ws.send(commands);
  }, 1500);

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
});

// app.get("/", (req, res) => res.send("Hello World!"));
server.listen(3000, () => console.log(`Listening on port: 3000`));

//Johnny-Five:
var five = require("johnny-five");
const board = new five.Board(); // five.Board({ port: "/dev/tty.usbmodem11101" });
const { Led } = require("johnny-five");

board.on("ready", () => {
  console.log("Ready!");

  const led = new Led(13);
  led.blink(1000);
});

//bei Start-Signal von Start-Button: setzte let start = true
//sobald start === true: frage IDs ab + setze start = false
//bei Antwort(en) der Microcontroller: speichere IDs in richtiger Reihenfolge in Array ab
//sobald alle Antworten erhalten: sende Start-Signal + Array an JS

//bei Leuchte-Befehl von J5: Sende Befehl leuchte grün/rot an Microcontroller mit genannter ID

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS
