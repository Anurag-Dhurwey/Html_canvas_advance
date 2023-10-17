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
let x = 10;
let dx = 1;
let y = 10;
let dy = 1;
function animating() {
  
  C.clearRect(0, 0, width, height);
  ctx.beginPath();
  C.arc(x, y, r, 0, Math.PI * 2);
  C.stroke();
  ctx.closePath();
  if (x + r == width || x < r) {
    dx = -dx;
    C.strokeStyle =colors[Math.floor(Math.random()*(colors.length-1))];
  }
  if (y + r == height || y < r) {
    dy = -dy;
    C.strokeStyle =colors[Math.floor(Math.random()*colors.length)];
  }
  x += dx;
  y += dy;
}

function animate() {
  animating();
  requestAnimationFrame(animate);
}

if (C) {
  animate();
} else {
  const div = document.createElement("h1");
  div.innerText = "canvas not supported on your device</h1>";

  document.getElementById("error").appendChild(div);
}
