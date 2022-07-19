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

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);

    // let receivedMessage = JSON.parse(message);

    // console.log(`Parsed message => ${receivedMessage}`);
  });
});

server.listen(3000, () => console.log(`Listening on port: 3000`));

//---

//Serialport:
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

port.on("open", () => {
  console.log("serial port open");

  parser.on("data", (data) => {
    console.log("message from arduino:", data);
  });

  // port.write("SYST:ADDR?\n", function (err) {
  //   if (err) {
  //     return console.log("Error on write: ", err.message);
  //   }
  // });
});

setTimeout(function () {
  port.write("<enlight, 1011, 1>");
  console.log("hi");
}, 10000);

//---

//bei Start-Signal von Start-Button: setzte let start = true
//sobald start === true: frage IDs ab + setze start = false
//bei Antwort(en) der Microcontroller: speichere IDs in richtiger Reihenfolge in Array ab
//sobald alle Antworten erhalten: sende Start-Signal + Array an JS

//bei Leuchte-Befehl von J5: Sende Befehl leuchte grün/rot an Microcontroller mit genannter ID

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS
