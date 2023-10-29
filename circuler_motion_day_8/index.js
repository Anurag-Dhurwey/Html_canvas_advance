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

function roundUpToNearestTen(number) {
  if (number == 0) return 10;
  if (number % 10 === 0) {
    return number;
  } else {
    console.log(Math.ceil(number / 10) * 10);
    return Math.ceil(number / 10) * 10;
  }
}

function obj(X, Y, angle, i) {
  this.R = 15;
  this.dis = Math.random()*this.R*8;
  this.angle = angle;
  this.velocity = 0.01;
  this.color = "black";
  this.draw = function () {
    // console.log(this.dis)
    let x = X + Math.cos(this.angle) * ((this.R*8) + this.dis);
    let y = Y + Math.sin(this.angle) * ((this.R*8) + this.dis);
    C.beginPath();
    C.fillStyle = this.color;
    // C.arc(x, y, this.R, 0, Math.PI * 2);
    C.moveTo(x,y)
    C.lineTo(x+50,y+50)
    C.stroke();
    C.closePath();
  };

  this.update = function () {
    this.angle += this.velocity;

    this.draw();
  };
}

let rec = [];
const objLength = 50;
for (let i = 0; i < objLength; i++) {
  const x = width / 2;
  const y = height / 2;
  const angle = (i * Math.PI * 2) / objLength;
  const cir = new obj(x, y, angle, i);
  rec.push(cir);
}
mouseRec = rec[0];
function animate() {
  // C.fillStyle = "rgba(0,0,0,0.001)";
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
