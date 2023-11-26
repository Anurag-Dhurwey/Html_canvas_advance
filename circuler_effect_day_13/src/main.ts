// import { circle } from "./constructer/circle";

// const canvas = document.getElementById("app") as HTMLCanvasElement;

// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// export const width = (canvas.width = window.innerWidth);
// export const height = (canvas.height = window.innerHeight);
// const qty = 50;
// const container: circle[] = [];
// const mouse = {
//   x: width / 2,
//   y: height / 2,
// };
// if (ctx) {
//   const velocity = 5;
//   // for (let i = 0; i < qty; i++) {

//   //   container.push(
//   //     new circle({
//   //       i,
//   //       position: { x: mouse.x, y: mouse.y },
//   //       r: 5,
//   //       color: "blue",
//   //       ctx,
//   //       velocity,
//   //     })
//   //   );
//   // }
//   function create_obj() {
//     setInterval(create_obj, 1000);
//     for (let i = 0; i < qty; i++) {

//       container.push(
//         new circle({
//           i,
//           position: { x: mouse.x, y: mouse.y },
//           r: 5,
//           color: "blue",
//           ctx,
//           velocity,
//         })
//       );
//     }
//   }

//   function paint() {
//     // setInterval(function () {
//     // create_obj();
//     // }, 500);
//     container?.forEach((obj, i) => {
//       if (obj.removel < 0) {
//         container.splice(i, 1);
//         console.log(obj.x, width);
//       } else {
//         obj.update();
//         // console.log(obj.removel);
//       }
//     });
//   }

//   function animate() {
//     ctx?.clearRect(0, 0, width, height);
//     requestAnimationFrame(animate);
//     paint();
//     // console.log(container)
//   }
//   // animate();
//   // create_obj()
//   addEventListener("mousemove", function (e) {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
//   });
// }

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  x: number;
  y: number;
  color: string;
  radius: number;
  velocity: { x: number; y: number };
  ttl: number;
  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocity: { x: number; y: number }
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = canvas.width>canvas.height?canvas.width/3:canvas.height/3;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl-=this.velocity.x>this.velocity.y?this.velocity.x:this.velocity.y;
  }
}

// Implementation
let particles: Particle[];
function init() {
  particles = [];
}

let hue = 0;
let hueRadians = 0;
function generateRing() {
  setTimeout(generateRing, 200);
  hue = Math.sin(hueRadians);

  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    // full circle = pi * 2 radians
    const radian = (Math.PI * 2) / particleCount;
    const x = mouse.x;
    const y = mouse.y;
    particles.push(
      new Particle(x, y, 5, `hsl(${Math.abs(hue * 360)}, 50%, 50%)`, {
        x: Math.cos(radian * i) * 3,
        y: Math.sin(radian * i) * 3,
      })
    );
  }

  hueRadians += 0.01;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.ttl < 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
  console.log(particles.length);
}

init();
animate();
generateRing()
