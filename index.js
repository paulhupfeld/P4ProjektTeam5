//Webserver:
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

let startMessage = JSON.stringify({
  message: "start",
  commands: [
    { command: "moveStraight", id: "1000" },
    { command: "turnLeft", id: "0100" },
    { command: "moveStraight", id: "0010" },
    { command: "turnLeft", id: "0001" },
  ],
});

wss.on("connection", (ws) => {
  console.log("A new client connected");

  setTimeout(function () {
    ws.send(startMessage);
  }, 1500);

  // ws.on("message", (message) => {
  //   console.log(message);
  //   console.log(message.data);

  //   let receivedMessage = JSON.parse(message.data);
  //   console.log(`Received message => ${receivedMessage}`);

  //   // let receivedMessage = JSON.parse(message);

  //   // let it = message[1];
});

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
