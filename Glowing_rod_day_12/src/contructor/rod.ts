import { center } from "../main";

export class rod {
  x: number;
  y: number;
  r: number;
  ctx:CanvasRenderingContext2D
  color:string
  i:number
  constructor(arg: argType) {
    this.x = arg.position.x;
    this.y = arg.position.y;
    this.r = arg.r;
    this.ctx=arg.ctx
    this.color=arg.color
    this.i=arg.i
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle=this.color
    this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
    this.ctx.fill()
    this.ctx.closePath()
  }
  update(angle:number){
    console.log(angle)
    this.x=center.x+Math.cos(angle)*this.i
    this.y=center.y+Math.sin(angle)*this.i
    this.draw()
  }
}

interface argType {
  ctx: CanvasRenderingContext2D;
  position: {
    x: number;
    y: number;
  };
  r: number;
  color:string
  i:number
}
