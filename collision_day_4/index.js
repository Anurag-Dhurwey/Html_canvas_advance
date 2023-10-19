const canvas = document.getElementById("canvas");
const C = canvas.getContext("2d");
const ctx = C;
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = `${width}`;
canvas.height = `${height}`;

let mouseX = 10;
let mouseY = 10;

window.addEventListener("resize", function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = window.innerWidth;
  height = window.innerHeight;
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
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function obj(X, Y, R) {
  this.x = X;
  this.y = Y;
  this.r = R;
  this.color="black"

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

function obj_2(X, Y, R) {
  this.x = X;
  this.y = Y;
  this.r = R;

  this.draw = function () {
    C.beginPath();
    C.fillStyle = "blue";
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    C.fill();
    C.closePath();
  };

  this.update = function () {
    this.x = mouseX;
    this.y = mouseY;

    this.draw();
  };
}
const R1 = 80;
let cir_1 = new obj(width / 2, height / 2, R1);
const R2 = 30;
let cir_2 = new obj_2(mouseX, mouseY, R2);

function animate() {
  C.clearRect(0, 0, width, height);
  cir_1.update();
  cir_2.update();
  if (getDistance(cir_1.x, cir_1.y, cir_2.x, cir_2.y) < cir_1.r + cir_2.r) {
    cir_1.color="blue"
  }else{
    cir_1.color="white"
  }
  requestAnimationFrame(animate);
}

if (C) {
  animate();
} else {
  const div = document.createElement("h1");
  div.innerText = "canvas not supported on your device</h1>";

  document.getElementById("error").appendChild(div);
}
