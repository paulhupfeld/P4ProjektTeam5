window.setup = setup;

new p5();

import DisplayLevel from "./javascript/DisplayLevel.js";
import Mouse from "./javascript/Mouse.js";
import Cheese from "./javascript/levelElements/Cheese.js";
import Field from "./javascript/levelElements/Field.js";

export let levelBackground1, mouseImg;
export let displayLevel, mouse, cheese, field;

function preload() {
  levelBackground1 = loadImage("assets/levelBackground1.png");
  mouseImg = loadImage("assets/mouseImg.jpeg");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);

  displayLevel = new DisplayLevel();
  mouse = new Mouse(mouseImg);
  cheese = new Cheese();
  field = new Field();
}

window.preload = preload;
