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
const width = canvas.width;
const height = canvas.height;
const r = 10;

function oneObj(x, dx, y, dy, r) {
  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.r = r;
  this.stroke = "white";
  this.draw = function () {
    C.strokeStyle = this.stroke;

    ctx.beginPath();
    C.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    C.stroke();
    ctx.closePath();
  };

  this.update = function () {
    if (this.x + this.r > width || this.x < this.r) {
      this.dx = -this.dx;
      this.stroke = colors[Math.floor(Math.random() * (colors.length - 1))];
    }
    if (this.y + this.r > height || this.y < this.r) {
      this.dy = -this.dy;
      this.stroke = colors[Math.floor(Math.random() * colors.length)];
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

let arrayOfObj = [];

for (let i = 0; i < 100; i++) {
  const randomX = Math.ceil(Math.random() * (width - 30))+10;
  const randomY = Math.ceil(Math.random() * (height - 30))+10;
  const randomDX = Math.random() - 0.5 ;
  const randomDY = Math.random() - 0.5 ;
  const cir_1 = new oneObj(randomX, randomDX, randomY, randomDY, 10);
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
