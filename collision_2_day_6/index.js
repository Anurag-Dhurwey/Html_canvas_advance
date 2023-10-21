const canvas = document.getElementById("canvas");
const C = canvas.getContext("2d");
const ctx = C;
let width = window.innerWidth - 4;
let height = window.innerHeight - 4;
canvas.width = `${width}`;
canvas.height = `${height}`;

let mouseX = 10;
let mouseY = 10;

window.addEventListener("resize", function (e) {
  width = window.innerWidth - 4;
  height = window.innerHeight - 4;
  canvas.width = `${width}`;
  canvas.height = `${height}`;
});

document.addEventListener("mousemove", function (e) {
  mouseX = e.x;
  mouseY = e.y;
});
// canvas.addEventListener("mouseleave", function (e) {
//   mouseX = undefined;
//   mouseY = undefined;
// });

function getDistance(x1, y1, x2, y2) {
  console.log("dis");
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function obj(X, Y, R) {
  this.x = X;
  this.y = Y;
  this.r = R;
  this.color = "black";

  this.draw = function () {
    C.beginPath();
    C.fillStyle = this.color;
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    C.fill();
    C.closePath();
  };

  this.update = function () {
    this.draw();
  };
}

let circles = [];

function getX_Y(R1) {
  let x = R1 + Math.random() * (canvas.width - R1);
  let y = R1 + Math.random() * (canvas.height - R1);
  for (let i = 0; i < circles.length; i++) {
    if (
      getDistance(circles[i].x, circles[i].y, x, y) - (circles[i].r + R1) <
      0
    ) {
      console.log(x, y);
      i = -1;
      x = R1 + Math.random() * (canvas.width - R1);
      y = R1 + Math.random() * (canvas.height - R1);
    }
  }
  return { x, y };
}

for (let i = 0; i < 25; i++) {
  const R1 = 0.2 + Math.random() * 40;
  const { x, y } = getX_Y(R1);
  const cir = new obj(x, y, R1);
  circles.push(cir);
}

function animate() {
  C.clearRect(0, 0, width, height);
  circles.forEach((cir) => cir.update());
  requestAnimationFrame(animate);
}

if (C) {
  animate();
} else {
  const div = document.createElement("h1");
  div.innerText = "canvas not supported on your device</h1>";

  document.getElementById("error").appendChild(div);
}
