window.setup = setup;

new p5();

import DisplayLevel from "./javascript/DisplayLevel.js";
import Mouse from "./javascript/levelElements/Mouse.js";
import Cheese from "./javascript/levelElements/Cheese.js";

export let mausylinth1, mouseImg;
export let displayLevel, mouse, cheese;

function preload() {
  mausylinth1 = loadImage("assets/mausylinth1.png");
  mouseImg = loadImage("assets/mouseImg.png");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);

  displayLevel = new DisplayLevel();
  mouse = new Mouse(mouseImg);
  cheese = new Cheese();
}

window.preload = preload;
