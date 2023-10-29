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

document.addEventListener("mousemove", function (e) {});

canvas.addEventListener("mouseleave", function (e) {
  mouseX = undefined;
  mouseY = undefined;
});
let mouseRec;

function obj(X, Y, angle, i) {
  // this.index=i
  this.R = 5;
  this.angle = angle;
  this.velocity = 0.01;
  this.color = "black";
  this.draw = function () {
    let x = X + Math.cos(this.angle) * (this.R * (10 * (i + 0.1)));
    let y = Y + Math.sin(this.angle) * (this.R * (10 * (i + 0.1)));
    C.beginPath();
    C.fillStyle = this.color;
    C.arc(x, y, this.R, 0, Math.PI * 2);
    C.fill();
    C.closePath();
  };

  this.update = function () {
    this.angle += this.velocity;

    this.draw();
  };
}

let rec = [];
const objLength = 10;
for (let i = 0; i < objLength; i++) {
  const x = width / 2;
  const y = height / 2;
  const angle = (i * Math.PI * 2) / objLength;
  const cir = new obj(x, y, angle, i);
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
