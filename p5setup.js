window.setup = setup;

new p5();

import DisplayLevel from "./javascript/DisplayLevel.js";
import Mouse from "./javascript/levelElements/Mouse.js";
import Cheese from "./javascript/levelElements/Cheese.js";

export let theaterBackgroundImage, levelBackground1, mouseImg;
export let displayLevel, mouse, cheese;

function preload() {
  theaterBackgroundImage = loadImage("assets/Theater-Background.png");
  levelBackground1 = loadImage("assets/levelBackground1.png");
  mouseImg = loadImage("assets/mouseImg.jpeg");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);

  displayLevel = new DisplayLevel();
  mouse = new Mouse(mouseImg);
  cheese = new Cheese();
}

window.preload = preload;
