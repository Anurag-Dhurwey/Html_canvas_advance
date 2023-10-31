import "./style.css";
import { sine_wave, prop as sine_waveProp } from "./classes/sine_wave";
import { x_y_coordinates } from "./classes/x_y_coordinates";
const canvas = document.getElementById("canvas");

if (canvas !== null) {
  const canvasElement = canvas as HTMLCanvasElement;
  const width = (canvasElement.width = window.innerWidth);
  const height = (canvasElement.height = window.innerHeight);
  const ctx = canvasElement.getContext("2d");
  let objArray: sine_waveProp[] = [];
  if (ctx) {
    x_y_coordinates({ CTX: ctx });

    const wave: sine_waveProp = new (sine_wave as any)({
      CTX: ctx,
      x: 10,
      y: height / 2,
      radius: 5,
      amplitude: 200,
      frequency: 0.5,
    });

    ctx.scale(1, -1);
    function animate() {
      for (let i = 0; i <= 3000; i++) {
        wave.update();
      }
    }
    animate();
  } else {
    console.error("Canvas element not supported in your browser");
  }
} else {
  console.error("Canvas element not found!");
}
