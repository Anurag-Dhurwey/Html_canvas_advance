const canvas = document.getElementById("canvas");
const C = canvas.getContext("2d");
const ctx = C;
let width = window.innerWidth - 4;
let height = window.innerHeight - 4;
canvas.width = `${width}`;
canvas.height = `${height}`;

let mouseX = undefined;
let mouseY = undefined;

window.addEventListener("resize", function (e) {
  width = window.innerWidth - 4;
  height = window.innerHeight - 4;
  canvas.width = `${width}`;
  canvas.height = `${height}`;
});


canvas.addEventListener("mouseleave", function (e) {
  mouseX = undefined;
  mouseY = undefined;
});
let mouseRec;

function obj(X, dx, Y, dy, H, W) {
  this.x = X;
  this.y = Y;
  this.h = H;
  this.w = W;
  this.color = "black";
  this.dx = dx;
  this.dy = dy;
  this.draw = function () {
    C.beginPath();
    C.fillStyle = this.color;
    C.rect(this.x, this.y, this.w, this.h);
    C.fill();
    C.closePath();
  };

  this.update = function () {
    this.draw();
    if (
      mouseRec != this &&
      Math.floor(mouseRec.x + mouseRec.w) >= this.x &&
      mouseRec.x <= Math.floor(this.x + this.w) &&
      Math.floor(mouseRec.y + mouseRec.h) >= this.y &&
      mouseRec.y <= Math.floor(this.y + this.h)
    ) {
      this.color="green"
    }else{
      this.color="black"
    }
  };
}

let rec = [];

document.addEventListener("mousemove", function (e) {
  mouseX = e.x;
  mouseY = e.y;
  mouseRec.x = mouseX;
  mouseRec.y = mouseY;
  mouseRec.color = "blue";
});

for (let i = 0; i < 2; i++) {
  const H = 10 + Math.random() * 40;
  const W = 10 + Math.random() * 40;
  const dx = Math.random() - 0.5;
  const dy = Math.random() - 0.5;
  const x = W + Math.random() * (canvas.width - W);
  const y = H + Math.random() * (canvas.height - H);
  const cir = new obj(x, dx, y, dy, H, W);
  rec.push(cir);
}
mouseRec = rec[0];
function animate() {
  C.clearRect(0, 0, width, height);
  rec.forEach((rec) => rec.update());
  requestAnimationFrame(animate);
}

if (C) {
  animate();
} else {
  const div = document.createElement("h1");
  div.innerText = "canvas not supported on your device</h1>";

  document.getElementById("error").appendChild(div);
}
