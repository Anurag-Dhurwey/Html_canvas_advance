export function x_y_coordinates({CTX}:{CTX:CanvasRenderingContext2D;}) {
    let ctx=CTX
    ctx.beginPath();
    ctx.moveTo(0,window.innerHeight / 2);
    ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    ctx.moveTo(window.innerWidth / 2, 0);
    ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
}