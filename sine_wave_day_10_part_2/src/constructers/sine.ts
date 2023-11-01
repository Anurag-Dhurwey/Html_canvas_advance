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

const strokeStyle = {
  h: 100,
  s: 50,
  l: 50,
};

const waveFolder = gui.addFolder("Wave");
const Stroke_Style_Folder = gui.addFolder("Stroke_Style");
export function addGuiControl() {
  waveFolder.add(wave, "x", -width, width);
  waveFolder.add(wave, "y", -height, height);
  waveFolder.add(wave, "frequncy", -1, 1);
  waveFolder.add(wave, "amplitude", -height, height);
  waveFolder.open();
  Stroke_Style_Folder.add(strokeStyle, "h", 0, 255);
  Stroke_Style_Folder.add(strokeStyle, "s", 0, 100);
  Stroke_Style_Folder.add(strokeStyle, "l", 0, 100);
  Stroke_Style_Folder.open();
}
let increment: number = wave.frequncy;
export function sine(this: prop, { ctx }: argType) {
  this.draw = function () {
    ctx.beginPath();
    ctx.moveTo(wave.x, wave.y);
    // ctx.strokeStyle = "white";

    for (let i = 0; i < width; i++) {
      ctx.lineTo(
        wave.x + i,
        wave.y +
          Math.sin(i * wave.frequncy + increment) *
            wave.amplitude *
            Math.sin(increment)
      );
    }
    ctx.strokeStyle = `hsl(${Math.abs(
      strokeStyle.h * Math.sin(increment)
    )}, ${Math.abs(strokeStyle.s * Math.sin(increment))}%, ${Math.abs(
      strokeStyle.l 
    )}%)`;
    ctx.stroke();
    ctx.closePath();
    increment += wave.frequncy;
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
