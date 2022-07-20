//Initialize serialport:
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(
  "COM7",
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

    dataAsArray = data.replace("\r", "").split(", "); //!!!\r am Ende weg

    if (dataAsArray[0] === "start") {
      let arrayCount = 0;

      //create startMessage-object
      dataAsArray.forEach(function (item) {
        if (arrayCount === 0) {
          startMessage.message = item;
        } else {
          startMessage.commands[arrayCount - 1] = {
            command: returnCommandFromId(item),
            id: item,
          };
        }

        arrayCount++;
      });

      communicateWithWeblient();
    }

    //if signal error: ws.send("errormessage");
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

    let transformedData = `<${data}>`;

    sendDataToArduino(transformedData);
  });
});

server.listen(3000, () => console.log(`Listening on port: 3000`));

// Send objekt with enlightenment info to Arduino (via serialport):
function sendDataToArduino(recievedData) {
  port.write(recievedData);
}

//sobald Verbindung zu Arduino abbricht: Sende STOP-Signal an JS

function returnCommandFromId(item) {
  //import translations from idTranslations.js

  let command;

  if (item === "1000") {
    command = "moveStraight";
  } else if (item === "0100") {
    command = "moveStraight";
  } else if (item === "0010") {
    command = "turnLeft";
  } else if (item === "0001") {
    command = "eatCheese";
  }

  return command;
}
