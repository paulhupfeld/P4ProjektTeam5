const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const { Board, Led } = require("johnny-five");
const board = new Board();
// var five = require("johnny-five");
// var board = new five.Board({ port: "/dev/tty.usbmodem11101" });

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
