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

//Reveive object mit ids from Arduino (via serialport):
port.on("open", () => {
  console.log("serial port open");

  parser.on("data", (data) => {
    console.log("message from arduino:", data);

    //!!! need to receive object
    //if data. ... === "start"

    //tranlate data create startMessage-object...
    startMessage = {
      message: "start",
      commands: [
        { command: "moveStraight", id: "1000" },
        { command: "turnLeft", id: "0100" },
        { command: "moveStraight", id: "0010" },
        { command: "eatCheese", id: "0001" },
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

  ws.on("message", (data) => {
    console.log(`Received message from Client=> ${data}`);

    //!!! need to receive object
    // let receivedMessage = JSON.parse(message);
    let recievedData = { message: "enlight", id: 1000, light: 1 };

    sendDataToArduino(recievedData); //receivedMessage. ... übergeben
  });
});

server.listen(3000, () => console.log(`Listening on port: 3000`));

// Send objekt with enlightenment info to Arduino (via serialport):
function sendDataToArduino(recievedData) {
  let dataToSend =
    "<" +
    recievedData.message +
    ", " +
    recievedData.id +
    ", " +
    recievedData.light +
    ">";

  console.log(dataToSend);

  setTimeout(function () {
    port.write(dataToSend);
  }, 10000);
}

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS
