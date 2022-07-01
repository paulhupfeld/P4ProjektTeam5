import Navigator from "./navigator.js";

export let navigator;

function draw() {
  navigator = new Navigator();

  navigator.display();
}

window.draw = draw;
