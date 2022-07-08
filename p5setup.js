window.setup = setup;

new p5();

import DisplayLevel from "./javascript/DisplayLevel.js";
import Mouse from "./javascript/levelElements/Mouse.js";
import Cheese from "./javascript/levelElements/Cheese.js";

export let mausylinth1, mouseNormalImg, mouseDizzyImg, cheeseImg;
export let displayLevel, mouse, cheese;

function preload() {
  mausylinth1 = loadImage("assets/mausylinth1.png");
  mouseNormalImg = loadImage("assets/mouseNormalImg.png");
  mouseDizzyImg = loadImage("assets/mouseDizzyImg.png");
  cheeseImg = loadImage("assets/cheeseImg.png");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);

  displayLevel = new DisplayLevel();
  mouse = new Mouse(mouseNormalImg, mouseDizzyImg);
  cheese = new Cheese(cheeseImg);
}

window.preload = preload;
