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
let dataAsArray;
let startMessage = {
  message: "",
  commands: [],
};
let stringifiedStartMessage;
let communicateWithWeblient;

//Reveive object mit ids from Arduino (via serialport):
port.on("open", () => {
  console.log("serial port open");

  parser.on("data", (data) => {
    console.log("message from arduino:", data);

    dataAsArray = data.split(", "); //!!!\r am Ende weg

    if (dataAsArray[0] === "start") {
      let arrayCount = 0;

      //create startMessage-object
      dataAsArray.forEach(function (item) {
        if (arrayCount === 0) {
          startMessage.message = item;
        } else {
          startMessage.commands[arrayCount - 1] = {
            command: returnCommandFromId(item), //translate!!
            id: item,
          };
        }

        arrayCount++;
      });

      communicateWithWeblient();
    }
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
    // console.log("message received");
    console.log(`Received message from Client=> ${data}`);
    // console.log(data); //hier als <Buffer 65 6e 6c 69 67 68 74 2c 20 30 30 30 31 0d 2c 20 31>

    // console.log(JSON.parse(data));
    //letzte nachricht unvollständig: "", 1eived message from Client=> enlight, 0001", sollte aber eig: "Received message from Client=> enlight, 0001, 1"

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

  setTimeout(function () {
    port.write(dataToSend);
  }, 10000);
}

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS

function returnCommandFromId(item) {
  let command;

  if (item === "1000") {
    command = "moveStraight";
  } else if (item === "0100") {
    command = "moveStraight";
  } else if (item === "0010") {
    command = "turnLeft";
  } else if (item === "0001\r") {
    //ohne \r
    command = "eatCheese";
  }

  return command;
}
