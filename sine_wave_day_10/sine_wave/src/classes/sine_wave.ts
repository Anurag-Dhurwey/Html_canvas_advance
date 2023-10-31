export function sine_wave(this: prop, { CTX, x, y, radius, amplitude,frequency}: inputArg) {
  this.x = x;
  this.y = y;
  this.r = radius;
  this.angle = 0;
  this.dy = 0.01;
  this.amplitude=amplitude
  this.frequency=frequency
  this.draw = function () {
    CTX.beginPath();
    CTX.fillStyle = "blue";
    CTX.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    CTX.fill();
    CTX.closePath();
  };
  this.update = function () {
    this.angle += this.dy;
    this.y =(Math.sin(this.angle) * this.amplitude)-y;
    this.x += this.frequency;
    this.draw();
  };
}

export interface prop {
  x: number;
  y: number;
  dy: number;
  r: number;
  angle: number;
  amplitude:number
  frequency:number
  draw: Function;
  update: Function;
}

interface inputArg {
  CTX: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  amplitude:number;
  frequency:number;
}
