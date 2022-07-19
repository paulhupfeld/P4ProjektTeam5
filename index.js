//Initialize serialport:
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

const port = new SerialPort(
  "/dev/tty.usbmodem11101",
  { baudRate: 9600 },
  function (err) {
    if (err) {
      return console.log("Error: ", err.message);
    }
  }
);

const parser = port.pipe(new Readline({ delimiter: "\n" }));

//Initialize webserver:
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

//Initialize variables:
let startMessage = {};
let stringifiedStartMessage;
let communicateWithWeblient;

//Reveive array mit ids from Arduino (via serialport):
port.on("open", () => {
  console.log("serial port open");

  parser.on("data", (data) => {
    console.log("message from arduino:", data);

    //if data. ... === "start"

    //tranlate data create startMessage-object...
    startMessage = {
      message: "start",
      commands: [
        { command: "moveStraight", id: "1000" },
        { command: "turnLeft", id: "0100" },
        { command: "moveStraight", id: "0010" },
        { command: "turnLeft", id: "0001" },
      ],
    };

    communicateWithWeblient();
  });
});

//Send Array with command-objects and receive object with enlightenment info to/from webClient (via websocket):
wss.on("connection", (ws) => {
  console.log("A new client connected");

  communicateWithWeblient = function communicator() {
    stringifiedStartMessage = JSON.stringify(startMessage);

    ws.send(stringifiedStartMessage);
  };

  ws.on("message", (message) => {
    console.log(`Received message from Client=> ${message}`);

    // let receivedMessage = JSON.parse(message);

    sendMessageToArduino();
  });
});

server.listen(3000, () => console.log(`Listening on port: 3000`));

// Send objekt with enlightenment info to Arduino (via serialport):
function sendMessageToArduino() {
  setTimeout(function () {
    port.write("<enlight, 1011, 1>");
  }, 10000);
}

//---

//bei Start-Signal von Start-Button: setzte let start = true
//sobald start === true: frage IDs ab + setze start = false
//bei Antwort(en) der Microcontroller: speichere IDs in richtiger Reihenfolge in Array ab
//sobald alle Antworten erhalten: sende Start-Signal + Array an JS

//bei Leuchte-Befehl von J5: Sende Befehl leuchte grün/rot an Microcontroller mit genannter ID

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS
