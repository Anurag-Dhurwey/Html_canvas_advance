import "./style.css";
import { sine, prop as sine_prop, addGuiControl } from "./constructers/sine";


const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
if (ctx) {
  addGuiControl();
  const newSine = new (sine as any)({ ctx, x: width, y: height });

  ctx.fillStyle='rgba(255, 255, 255, 0.01)'
  function animate() {
    ctx?.fillRect(0,0,width,height)
    newSine.draw();
    requestAnimationFrame(animate);
  }
  animate();
} else {
  alert("canvas not supported in ypur browser");
}
