import { width, height } from "../main";

type x_y = {
  x: number;
  y: number;
};
interface argType {
  ctx: CanvasRenderingContext2D;
  position: x_y;
  velocity: x_y;
  color: string;
  radius: number;
}

export class fire_work {
  y: number;
  x: number;
  ctx: CanvasRenderingContext2D;
  velocity: x_y;
  gravity: number;
  resistance: number;
  color: string;
  _oppacity: number;
  radius: number;
  constructor(arg: argType) {
    this.ctx = arg.ctx;
    this.x = arg.position.x;
    this.y = arg.position.y;
    this.radius = arg.radius;
    this.velocity = {
      x: arg.velocity.x,
      y: arg.velocity.y,
    };
    this.gravity = 0.05;
    this.resistance = 0.98;
    this.color = arg.color;
    this._oppacity = 1;
  }
  draw() {
    // this.ctx.save()
    this.ctx.globalAlpha = this._oppacity;
    this.ctx.beginPath();
    this.ctx.fillStyle = `${this.color}`;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    // this.ctx.restore()
  }
  update() {
    this.velocity.x *= this.resistance;
    this.velocity.y *= this.resistance;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
    this._oppacity -= 0.003;
  }
}
