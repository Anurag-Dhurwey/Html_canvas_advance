import { height, width } from "../main";

export class circle {
  i: number;
  x: number;
  y: number;
  r: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  removel: number;
  velocity:number
  constructor(arg: argType) {
    this.ctx = arg.ctx;
    this.x = arg.position.x;
    this.y = arg.position.y;
    this.r = arg.r;
    this.color = arg.color;
    this.i = arg.i;
    this.removel = width > height ? width / 2 : height / 2;
    this.velocity=arg.velocity
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    this.x += Math.cos(this.i) * this.velocity;
    this.y += Math.sin(this.i) * this.velocity;
    this.draw();
    this.removel -= this.velocity;
  }
}

interface argType {
  ctx: CanvasRenderingContext2D;
  position: {
    x: number;
    y: number;
  };
  r: number;
  color: string;
  i: number;
  velocity:number
}
