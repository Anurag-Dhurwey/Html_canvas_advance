import { colors } from "./constructer/colors";
import { fire_work } from "./constructer/fire_work";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

export const C = canvas.getContext("2d");

const ctx = C;
const container: fire_work[] = [];
const qty = 500;
const displacement = 12;
const maxRadius = 5;
if (ctx) {
  addEventListener("click", (e) => {
    // container.splice(0, 100);
    const angle = (Math.PI * 2) / qty;
    for (let i = 0; i < qty; i++) {
      const obj = new fire_work({
        ctx,
        position: { x: e.clientX, y: e.clientY },
        velocity: {
          x: Math.cos(angle * i) * (Math.random() * displacement),
          y: Math.sin(angle * i) * (Math.random() * displacement),
        },
        radius: Math.random() * maxRadius,
        color: colors[Math.floor(Math.random() * colors.length - 1)],
      });
      container.push(obj);
    }
    console.log(container);
  });

  function init() {
    ctx?.clearRect(0, 0, width, height);
    container.forEach((ele, i) => {
      if (ele._oppacity > 0) {
        ele.update();
      } else {
        container.splice(i, 1);
      }
    });
    requestAnimationFrame(init);
  }

  init();
} else {
  alert("canvas not supported in ypur browser");
}

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
