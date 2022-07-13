window.setup = setup;

new p5();

import Labels from "./javascript/Labels.js";
import DisplayLevel from "./javascript/DisplayLevel.js";
import Mouse from "./javascript/levelElements/Mouse.js";
import Cheese from "./javascript/levelElements/Cheese.js";

export let CascadiaMonoPL,
  mausylinth1,
  winScreenImg,
  looseScreenImg,
  mouseNormalImg,
  mouseDizzyImg,
  mouseWithCheeseImg,
  cheeseImg;
export let displayLevel, labels, mouse, cheese;

function preload() {
  CascadiaMonoPL = loadFont("assets/CascadiaMonoPL-ExtraLight.otf");
  mausylinth1 = loadImage("assets/mausylinth1.png");
  winScreenImg = loadImage("assets/winScreenImg.png");
  looseScreenImg = loadImage("assets/looseScreenImg.png");
  mouseNormalImg = loadImage("assets/mouseNormalImg.png");
  mouseDizzyImg = loadImage("assets/mouseDizzyImg.png");
  mouseWithCheeseImg = loadImage("assets/mouseWithCheeseImg.png");
  cheeseImg = loadImage("assets/cheeseImg.png");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);

  textFont(CascadiaMonoPL);

  labels = new Labels(winScreenImg, looseScreenImg);
  displayLevel = new DisplayLevel();
  mouse = new Mouse(mouseNormalImg, mouseDizzyImg, mouseWithCheeseImg);
  cheese = new Cheese(cheeseImg);
}

window.preload = preload;
