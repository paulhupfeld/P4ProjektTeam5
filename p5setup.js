window.setup = setup;

new p5();

export let actorImage, boxesImage;

function preload() {
  // actorImage = loadImage("javascript/assets/actorImage.png");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(30);
}

window.preload = preload;
