const canvas = document.getElementById("canvas");
let width = window.innerWidth;
let height = window.innerHeight;
const C = canvas.getContext("2d");
canvas.width = width ;
canvas.height = height ;
const gravity = 1;
window.addEventListener("resize", function () {
  canvas.width = width ;
  canvas.height = height ;
});

// let mouseX = width / 2;
// let mouseY = height / 10;

// window.addEventListener("mousemove", function (e) {
//   mouseX = e.x;
//   mouseY = e.y;
// });

function obj(X, Y, R, DY) {
  this.r = R;
  this.x = X;
  this.y = Y;
  this.dy = DY;
  this.friction = 0.99;

  this.draw = function () {
    C.beginPath();
    C.strokeStyle = "white";
    C.fillStyle = "green";
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    C.fill();
    C.closePath();
  };

  this.start = function () {
    if (
      Math.floor(this.y + this.r+this.dy) >= canvas.height
      || Math.floor(this.y) <= Math.floor(this.r)
    ) {
      this.dy = -this.dy * this.friction;
    } else {
      this.dy = this.dy + gravity;
    }
    this.y += this.dy;
    this.draw();
  };
}

let arrayObj = [];

function append() {
  for (let i = 0; i < 100; i++) {
    const R = Math.random() * 30 + 0.5;
    const DY = Math.random();
    const X =R+ Math.random() * (width - R*3) ;
    const Y =R+1+ Math.random() * (height - R*5);
    const object = new obj(X, Y, R, DY);
    arrayObj.push(object);
  }
}

function animate() {
  C.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arrayObj.length; i++) {
    arrayObj[i].start();
  }
  requestAnimationFrame(animate);
}
append();
animate();
console.log(width,height)
console.log(arrayObj);
