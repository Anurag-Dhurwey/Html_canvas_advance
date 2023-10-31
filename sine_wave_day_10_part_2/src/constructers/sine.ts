import * as dat from "dat.gui";

const gui = new dat.GUI();
const width = window.innerWidth;
const height = window.innerHeight;
const wave = {
  x: 0,
  y: height / 2,
  frequncy: 0.01,
  amplitude: 100,
};

export function addGuiControl() {
  gui.add(wave, "x", -width, width);
  gui.add(wave, "y", -height, height);
  gui.add(wave, "frequncy", -1, 1);
  gui.add(wave, "amplitude", -height, height);
}
export function sine(this: prop, { ctx }: argType) {
  this.draw = function () {
    ctx.beginPath();
    ctx.moveTo(wave.x, wave.y);
    ctx.strokeStyle = "white";

    for (let i = 0; i < width; i++) {
      ctx.lineTo(wave.x+i, wave.y + Math.sin(i * wave.frequncy) * wave.amplitude);
    }

    ctx.stroke();
    ctx.closePath();
  };
}

export interface prop {
  x: number;
  y: number;
  frequncy: number;
  amplitude: number;
  draw: () => void;
}

interface argType {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}
