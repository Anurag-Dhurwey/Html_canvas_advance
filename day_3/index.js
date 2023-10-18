const canvas = document.getElementById("canvas");
let width = window.innerWidth;
let height = window.innerHeight;
const C = canvas.getContext("2d");
canvas.width = width - 10;
canvas.height = height - 10;
const gravity=1
window.addEventListener("resize", function () {
  canvas.width = width - 10;
  canvas.height = height - 10;
});

let mouseX = width / 2;
let mouseY = height / 10;

// window.addEventListener("mousemove", function (e) {
//   mouseX = e.x;
//   mouseY = e.y;
// });

function obj(x, y) {
  this.r = 30;
  this.x = x;
  this.y = y;
  this.dy = 1;
  this.friction=0.95
  this.draw = function () {
    C.clearRect(0, 0, canvas.width, canvas.height);
    C.beginPath();
    C.strokeStyle = "white";
    C.fillStyle = "green";
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // C.fillText('hello',mouseX,mouseY)
    C.fill();
    C.closePath();
  };

  this.start = function () {
    if (
      Math.floor(this.y + this.r) >= canvas.height
      || Math.floor(this.y) <= Math.floor(this.y-this.r)
    ) {
      this.dy = -this.dy*this.friction;
    }else{
        this.dy=this.dy+gravity
    }
    this.y += this.dy;
    this.draw();
  };
}

const object = new obj(mouseX, mouseY);
function animate() {
  object.start();
  requestAnimationFrame(animate);
}

animate();
