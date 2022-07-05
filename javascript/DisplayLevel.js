import { mouse, cheese, field } from "../p5setup.js";
// import LevelContent from "../assets/levelContent.json" assert { type: "json" };
// import("../assets/levelContent.json", { assert: { type: "json" } });
// const text = await Deno.readTextFile("../assets/levelContent.json");
// const jsonData = JSON.parse(text);

export default class DisplayLevel {
  constructor() {}

  displayLevelElements() {
    // console.log(LevelContent);
    // console.log(jsonData);

    mouse.display();
    cheese.display();
  }
}
