import Navigator from "./Navigator.js";

export let navigator;

function draw() {
  navigator = new Navigator();

  navigator.display();
}

window.draw = draw;
