const canvas = document.getElementById("canvas");
const colors = [
  "#E57373",
  "#F06292",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#4FC3F7",
  "#4DD0E1",
  "#4DB6AC",
  "#81C784",
  "#AED581",
  "#DCE775",
  "#FFF176",
  "#FFD54F",
  "#FFB74D",
  "#FF8A65",
  "#A1887F",
  "#90A4AE",
  "#78909C",
  "#607D8B",
  "#455A64",
  "#FF8A80",
  "#FF5252",
  "#FF1744",
  "#D500F9",
  "#651FFF",
  "#3D5AFE",
  "#2979FF",
  "#1E88E5",
  "#00B0FF",
];

// Access colors by index, e.g., colors[0] for the first color

const C = canvas.getContext("2d");
const ctx = C;
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = `${width}`;
canvas.height = `${height}`;

let mouseX = undefined;
let mouseY = undefined;

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
canvas.addEventListener("mouseleave", function (e) {
  mouseX = undefined;
  mouseY = undefined;
});
function oneObj(x, dx, y, dy, r) {
  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.r = r;
  this.stroke = "white";
  this.intractiveR = 30;
  this.fill = undefined;

  this.draw = function () {
    C.strokeStyle = this.stroke;

    ctx.beginPath();
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    C.stroke();
    ctx.closePath();
    C.fillStyle = this.fill;
    if (this.fill) {
      C.fill();
    }
  };

  this.update = function () {
    if (Math.floor(this.x + this.r)== width || Math.floor(this.x) == Math.floor(this.r)) {
      this.dx = -this.dx;
      this.stroke = colors[Math.floor(Math.random() * (colors.length - 1))];
    }
    if (this.x > width+ this.r ) {
      this.x = width / 2;
    }
    if (Math.floor(this.y + this.r) == height || Math.floor(this.y) == Math.floor(this.r)) {
      this.dy = -this.dy;
      this.stroke = colors[Math.floor(Math.random() * colors.length)];
    }

    if (this.y > height+ this.r ) {
      this.y = height / 2;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      this.x - mouseX < this.intractiveR &&
      this.x - mouseX > -this.intractiveR &&
      this.y - mouseY < this.intractiveR &&
      this.y - mouseY > -this.intractiveR
    ) {
      if (this.r < r * 2) {
        this.r += 1;
      }
      this.fill = this.stroke;
    } else {
      if (this.r > r) {
        this.r -= 1;
      }
      this.fill = undefined;
    }

    this.draw();
  };
}

let arrayOfObj = [];

for (let i = 0; i < 200; i++) {
  const maxRadius = 19;
  const radius = Math.random() * maxRadius + 1;
  const randomX = Math.random() * (width - maxRadius * 2) + maxRadius;
  const randomY = Math.random() * (height - maxRadius * 2) + maxRadius;
  const randomDX = Math.random() - 0.5;
  const randomDY = Math.random() - 0.5;
  const cir_1 = new oneObj(randomX, randomDX, randomY, randomDY, radius);
  arrayOfObj.push(cir_1);
}

function animate() {
  C.clearRect(0, 0, width, height);
  for (let i = 0; i < arrayOfObj.length; i++) {
    arrayOfObj[i].update();
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
