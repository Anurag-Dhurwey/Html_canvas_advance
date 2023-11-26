import { colors } from "./colors";
import { rod } from "./contructor/rod";

const canvas = document.getElementById("app") as HTMLCanvasElement;

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");
const container: rod[] = [];
const qty = 100;
export const center = {
  x: width / 2,
  y: height / 2,
};
if (ctx) {
  let angle: number =Math.PI*2
  for (let i = 0; i < qty; i++) {
    const color = colors[Math.floor(Math.random() * colors.length - 1)];
    const obj = new rod({
      position: { x: center.x + i, y: center.y + i },
      r: 10,
      color,
      ctx,
      i,
    });

    container.push(obj);
  }

  function animate() {
    container.forEach((obj, i) => {
      obj.update(angle);
    });
  }

  function init() {
    ctx?.clearRect(0, 0, width, height);
    animate();
    requestAnimationFrame(init);
  }
  init();

  addEventListener("mousemove", function (e) {
    angle = Math.atan2(e.clientY-center.y, e.clientX-center.x);
  });
} else {
  console.error("canvas not supported");
}
